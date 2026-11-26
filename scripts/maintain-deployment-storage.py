#!/usr/bin/env python3
"""Post-deploy storage maintenance. Run on the verified static webroot only.

No general rsync --delete: protect server files, unknown assets, retained
generations and dependencies referenced by live (including obsolete) pages.
"""
import json
import os
from pathlib import Path
import re
import shutil
import sys
import time

KEEP = 3
GRACE = 14 * 86400
RUN = re.compile(r"[0-9]+-[0-9]+")
# Vite's default 8-character hash. Unknown legacy images are never removed.
HASHED = re.compile(r"(.+)-[A-Za-z0-9_-]{8}\.(js|css|mjs|woff2?|ttf|png|jpe?g|webp|avif|svg|gif|ico)")
TEXT = {".html", ".htm", ".js", ".mjs", ".css", ".json", ".webmanifest", ".xml", ".svg", ".php", ".txt", ".map"}
TOKEN = re.compile(rb"[A-Za-z0-9_.-]+\.(?:js|css|mjs|woff2?|ttf|png|jpe?g|webp|avif|svg|gif|ico)")
SAFE_NAME = re.compile(r"[A-Za-z0-9_.-]+")


def regular(path):
    return not path.is_symlink() and path.is_file()


def manifest(path):
    if not regular(path):
        raise ValueError("missing or unsafe asset manifest")
    names = set(path.read_text().splitlines())
    if not names or any(not SAFE_NAME.fullmatch(n) or n in {".", ".."} for n in names):
        raise ValueError("invalid or empty asset manifest")
    return names


def atomic_json(path, obj):
    temp = path.with_name(path.name + ".tmp")
    if path.is_symlink() or temp.exists() or temp.is_symlink():
        raise ValueError("unsafe catalog path")
    with temp.open("x") as out:
        json.dump(obj, out, sort_keys=True)
    temp.replace(path)


def maintain(webroot, run, now=None):
    now = time.time() if now is None else now
    root = Path(webroot)
    if (not re.fullmatch(r"/home/[A-Za-z0-9_-]+/domains/[A-Za-z0-9.-]+/public_html", str(root))
            or root.resolve() != root
            or not regular(root / ".ith-static-deploy-ok")
            or not regular(root / "index.html")
            or any((root / n).exists() for n in ("wp-config.php", "wp-load.php", "wp-admin", "wp-includes"))
            or not all(regular(root / "api" / n / "index.php") for n in ("quote-request", "exchange-rates"))
            or not RUN.fullmatch(run)):
        raise ValueError("not the verified static webroot")
    return maintain_verified(root, run, now)


def maintain_verified(root, run, now):
    backups = root.parent / "deployment-backups"
    assets = root / "assets"
    active = backups / run
    for path in (backups, active, assets):
        if path.is_symlink() or not path.is_dir():
            raise ValueError("missing or unsafe maintenance directory")

    current = manifest(active / ".asset-manifest")
    if any(not regular(assets / n) for n in current):
        raise ValueError("build assets missing from live server; no cleanup")

    # Only directories created by our workflow; unrelated directories untouched.
    runs = [p for p in backups.iterdir()
            if RUN.fullmatch(p.name) and p.is_dir() and not p.is_symlink()]
    previous = [p for p in runs if p != active and regular(p / ".successful")]
    previous.sort(key=lambda p: (p.joinpath(".successful").stat().st_mtime,
                                 tuple(map(int, p.name.split("-")))), reverse=True)
    retained = [active] + previous[:KEEP - 1]
    protected = set(current)
    for p in retained[1:]:
        protected.update(manifest(p / ".asset-manifest"))

    catalog_path = backups / ".asset-catalog.json"
    if catalog_path.exists() or catalog_path.is_symlink():
        if not regular(catalog_path):
            raise ValueError("unsafe asset catalog")
        catalog = json.loads(catalog_path.read_text())
        if not isinstance(catalog, dict) or any(
                not SAFE_NAME.fullmatch(n) or not isinstance(t, (int, float))
                or not 0 <= t <= now for n, t in catalog.items()):
            raise ValueError("invalid asset catalog")
    else:
        catalog = {}

    # Track the last time a file was part of a successful build, not only mtime.
    for n in current:
        catalog[n] = now
    families = {(m.group(1), m.group(2)) for n in current if (m := HASHED.fullmatch(n))}
    candidates = set()
    for p in assets.iterdir():
        n = p.name
        m = HASHED.fullmatch(n)
        if not m or not regular(p) or n in protected:
            continue
        if n in catalog:
            eligible = now - catalog[n] >= GRACE
        else:
            # Bootstrap existing generated JS/CSS only if a current sibling
            # confirms its filename family. Never infer ownership of images.
            eligible = (m.group(2) in {"js", "mjs", "css"}
                        and (m.group(1), m.group(2)) in families
                        and now - p.stat().st_mtime >= GRACE)
        if eligible:
            candidates.add(n)

    # Mark dependencies reachable from all live text files other than proposed
    # obsolete assets; follow candidate-to-candidate imports transitively.
    # A read error aborts maintenance before any deletions.
    def references(path):
        return {t.decode("ascii") for t in TOKEN.findall(path.read_bytes())} & candidates

    reachable = set()
    if candidates:
        # Also protect dependencies of rollback HTML and scripts in the
        # three retained backups, including the version preceding the oldest.
        for source in [root] + retained:
            for directory, dirs, files in os.walk(source, followlinks=False):
                base = Path(directory)
                if any((base / d).is_symlink() for d in dirs):
                    raise ValueError("symlink directory; asset cleanup aborted")
                for name in files:
                    path = base / name
                    if path.suffix.lower() not in TEXT:
                        continue
                    if base == assets and name in candidates:
                        continue
                    if not regular(path):
                        raise ValueError("unsafe reference source")
                    reachable.update(references(path))
        todo = list(reachable)
        while todo:
            n = todo.pop()
            new = references(assets / n) - reachable
            reachable.update(new)
            todo.extend(new)

    # Persist inventory before deletion. Record success only after the caller's
    # smoke test, so a failed transfer never triggers retention cleanup.
    catalog = {n: t for n, t in catalog.items() if regular(assets / n)}
    atomic_json(catalog_path, catalog)
    marker = active / ".successful"
    if marker.exists() or marker.is_symlink():
        raise ValueError("deployment attempt already marked")
    marker.touch(exist_ok=False)

    removed_assets = candidates - reachable
    for n in sorted(removed_assets):
        path = assets / n
        if regular(path):
            path.unlink()
    # Only direct, workflow-named children; shutil does not follow symlinks.
    old = [p for p in runs if p not in retained]
    for p in old:
        if p.is_symlink() or p.parent != backups:
            raise ValueError("unsafe backup path")
        shutil.rmtree(p)
    print(f"Storage maintenance: kept {len(retained)} successful backups; "
          f"removed {len(old)} old attempts and {len(removed_assets)} obsolete assets; "
          f"protected {len(reachable)} referenced candidates.")
    if (root.parent / "cms-static-backups").exists():
        print("Legacy cms-static-backups directory left untouched; review separately.")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit("usage: maintain-deployment-storage.py WEBROOT RUN-ID-ATTEMPT")
    maintain(sys.argv[1], sys.argv[2])
