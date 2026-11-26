#!/usr/bin/env python3
import json
import os
from pathlib import Path
import runpy
import tempfile
import time
import unittest

module = runpy.run_path(str(Path(__file__).with_name("maintain-deployment-storage.py")))
maintain = module["maintain_verified"]
GRACE = module["GRACE"]


class StorageTest(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name) / "public_html"
        self.assets = self.root / "assets"
        self.assets.mkdir(parents=True)
        self.backups = self.root.parent / "deployment-backups"
        self.backups.mkdir()
        self.now = time.time()
        self.current = "entry-AAAAAAAA.js"
        self.write_asset(self.current)
        self.active = self.make_run("105-1", [self.current])
        (self.root / "index.html").write_text("/assets/" + self.current)

    def write_asset(self, name, body="", old=True):
        p = self.assets / name
        p.write_text(body)
        if old:
            os.utime(p, (self.now - GRACE - 60, self.now - GRACE - 60))
        return p

    def make_run(self, name, names, success=False):
        p = self.backups / name
        p.mkdir()
        (p / ".asset-manifest").write_text("\n".join(names) + "\n")
        if success:
            marker = p / ".successful"
            marker.touch()
            ts = self.now - (105 - int(name.split("-")[0])) * 60
            os.utime(marker, (ts, ts))
        return p

    def test_retention_and_safe_assets(self):
        old = self.write_asset("entry-BBBBBBBB.js")
        previous = self.write_asset("entry-CCCCCCCC.js")
        recent = self.write_asset("entry-DDDDDDDD.js", old=False)
        live = self.write_asset("entry-EEEEEEEE.js", 'import "./entry-FFFFFFFF.js"')
        dependency = self.write_asset("entry-FFFFFFFF.js")
        rollback = self.write_asset("entry-GGGGGGGG.js")
        manual = self.write_asset("manual.js")
        image = self.write_asset("photo-HHHHHHHH.webp")
        unknown = self.write_asset("unrecognized-IIIIIIII.js")
        (self.root / "old.html").write_text("/assets/" + live.name)
        (self.active / "old.html").write_text("/assets/" + rollback.name)
        kept = self.make_run("104-1", [previous.name], success=True)
        kept2 = self.make_run("103-1", [self.current], success=True)
        removed = self.make_run("102-1", [self.current], success=True)
        failed = self.make_run("101-1", [self.current])
        unrelated = self.backups / "manual-backup"
        unrelated.mkdir()
        legacy = self.root.parent / "cms-static-backups"
        legacy.mkdir()
        (self.root / ".htaccess").write_text("protected")
        (self.root / "api").mkdir()
        (self.root / "api" / "index.php").write_text("protected")
        maintain(self.root, "105-1", self.now)
        for p in (previous, recent, live, dependency, rollback, manual, image, unknown,
                  kept, kept2, unrelated, legacy, self.active, self.root / ".htaccess",
                  self.root / "api" / "index.php"):
            self.assertTrue(p.exists(), str(p))
        for p in (old, removed, failed):
            self.assertFalse(p.exists(), str(p))

    def test_tracked_assets_use_last_seen_not_file_mtime(self):
        old = self.write_asset("photo-LLLLLLLL.webp")
        young = self.write_asset("photo-MMMMMMMM.webp")
        (self.backups / ".asset-catalog.json").write_text(json.dumps({
            old.name: self.now - GRACE - 1,
            young.name: self.now - GRACE + 1,
        }))
        maintain(self.root, "105-1", self.now)
        self.assertFalse(old.exists())
        self.assertTrue(young.exists())

    def test_missing_current_asset_aborts_before_deletion(self):
        old = self.write_asset("entry-BBBBBBBB.js")
        previous = self.make_run("101-1", [self.current], success=True)
        (self.assets / self.current).unlink()
        with self.assertRaises(ValueError):
            maintain(self.root, "105-1", self.now)
        self.assertTrue(old.exists())
        self.assertTrue(previous.exists())
        self.assertFalse((self.active / ".successful").exists())

    def test_symlink_not_deleted(self):
        target = self.root.parent / "target.js"
        target.write_text("preserve")
        link = self.assets / "entry-BBBBBBBB.js"
        link.symlink_to(target)
        maintain(self.root, "105-1", self.now)
        self.assertTrue(link.is_symlink())
        self.assertEqual(target.read_text(), "preserve")


if __name__ == "__main__":
    unittest.main()
