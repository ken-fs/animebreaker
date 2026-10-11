/**
 * Write the deploy marker the fleet's daily hygiene check reads.
 *
 * Cloudflare's asset uploader silently skips anything under a dot-directory, so
 * the marker ships as the real file /deploy-marker.txt and public/_redirects
 * rewrites the fleet-standard /.well-known/anvilwiki-deploy.txt onto it.
 *
 * Commit source, in order:
 *   1. WORKERS_CI_COMMIT_SHA — set by Cloudflare Workers Builds.
 *   2. `git rev-parse HEAD` — local builds.
 *   3. "unknown" — never fail a build over a marker.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public", "deploy-marker.txt");

// 只认真正的 SHA：CF 手动触发的构建会把 WORKERS_CI_COMMIT_SHA 设成分支名。
const SHA_RE = /^[0-9a-f]{40}$/i;

function sha() {
  const fromCi = (process.env.WORKERS_CI_COMMIT_SHA || "").trim();
  if (SHA_RE.test(fromCi)) return fromCi.toLowerCase();
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
  } catch {
    return "unknown";
  }
}

const commit = sha();
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, commit + "\n", "utf8");
console.log(`[deploy-marker] ${commit}`);
