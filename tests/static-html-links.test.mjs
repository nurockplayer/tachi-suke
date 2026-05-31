import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";

const root = process.cwd();
const distDir = join(root, "dist");

function listHtmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = join(dir, entry.name);

    if (entry.isDirectory()) {
      return listHtmlFiles(absolutePath);
    }

    return entry.name.endsWith(".html") ? [absolutePath] : [];
  });
}

function normalizeHref(rawHref) {
  const href = rawHref.trim();

  if (
    !href.startsWith("/") ||
    href.startsWith("//") ||
    href.startsWith("/#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("http://") ||
    href.startsWith("https://")
  ) {
    return undefined;
  }

  return href.split("#")[0].split("?")[0] || "/";
}

function hasDistTarget(pathname) {
  if (pathname === "/") {
    return existsSync(join(distDir, "index.html"));
  }

  const relativePath = pathname.replace(/^\/+/, "");
  const directFile = join(distDir, relativePath);

  if (extname(relativePath)) {
    return existsSync(directFile);
  }

  return existsSync(join(directFile, "index.html")) || existsSync(`${directFile}.html`);
}

describe("static HTML internal links", () => {
  it("points root-relative href values at files generated in dist", () => {
    assert.equal(existsSync(distDir), true, "dist/ should exist; run pnpm build before pnpm check:links");

    const brokenLinks = [];
    for (const file of listHtmlFiles(distDir)) {
      const html = readFileSync(file, "utf8");
      const hrefs = [...html.matchAll(/\shref=(["'])(.*?)\1/g)].map((match) => match[2]);

      for (const href of hrefs) {
        const pathname = normalizeHref(href);
        if (!pathname) continue;

        if (!hasDistTarget(pathname)) {
          brokenLinks.push(`${file.replace(`${distDir}/`, "dist/")} -> ${href}`);
        }
      }
    }

    assert.deepEqual(brokenLinks, []);
  });
});
