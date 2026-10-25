import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const read = (file: string) => readFileSync(file, "utf8");

describe("Hostinger deployment build safeguards", () => {
  it("fails the static export on prerendering errors", () => {
    expect(read("vite.config.ts")).toMatch(/failOnError:\s*true/);
    expect(read("scripts/build-validated-static.sh")).toContain("Error in renderToReadableStream:");
    expect(read("scripts/build-validated-static.sh")).toContain('set -euo pipefail');
  });

  it("validates the same static build before CI succeeds or a deployment can upload", () => {
    for (const path of [
      ".github/workflows/full-project-validation.yml",
      ".github/workflows/deploy-hostinger-premium.yml",
      ".github/workflows/hostinger-static-export-check.yml",
    ]) {
      expect(read(path), path).toContain("bash scripts/build-validated-static.sh");
    }
    expect(read(".github/workflows/full-project-validation.yml")).toContain("node scripts/verify-hostinger-static-export.mjs");
  });

  it("still protects PHP endpoints, server configuration, and remote files", () => {
    const deploy = read(".github/workflows/deploy-hostinger-premium.yml");
    for (const rule of ["--exclude='/api/***'", "--exclude='/.htaccess'", "--exclude='*.php'", "--exclude='/.well-known/***'", "StrictHostKeyChecking=yes"]) {
      expect(deploy).toContain(rule);
    }
    expect(deploy).not.toMatch(/\brsync\b[^\n]*--delete/);
  });
});
