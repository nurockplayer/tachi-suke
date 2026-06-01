import { existsSync, readdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const configuredSiteUrl = (process.env.SITE_URL ?? "").trim().replace(/\/$/, "");
const forbiddenFallbackDomain = "https://tachi-suke.example.com";
const deployExtensions = new Set([".html", ".xml", ".txt", ".json", ".webmanifest"]);

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function listDeployFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = join(dir, entry.name);
    if (entry.isDirectory()) return listDeployFiles(absolutePath);
    return deployExtensions.has(extname(entry.name)) || entry.name === "site.webmanifest" ? [absolutePath] : [];
  });
}

if (!configuredSiteUrl) {
  fail("SITE_URL must be set when running pnpm check:deploy.");
} else if (!configuredSiteUrl.startsWith("https://")) {
  fail("SITE_URL must be an https:// URL for deploy output checks.");
} else if (configuredSiteUrl === forbiddenFallbackDomain) {
  fail("SITE_URL must not use the example fallback domain for deploy output checks.");
}

if (!existsSync(dist)) {
  fail("dist/ does not exist. Run SITE_URL=<production-url> pnpm build before pnpm check:deploy.");
}

if (!process.exitCode) {
  const files = listDeployFiles(dist);
  const fallbackMatches = files.filter((file) => readFileSync(file, "utf8").includes(forbiddenFallbackDomain));

  if (fallbackMatches.length > 0) {
    fail(`Deploy output still references ${forbiddenFallbackDomain}:\n${fallbackMatches.map((file) => `- ${file}`).join("\n")}`);
  }

  for (const relativePath of ["sitemap.xml", "robots.txt", "opensearch.xml", "feed.xml", "en/about/index.html"]) {
    const filePath = join(dist, relativePath);
    if (!existsSync(filePath)) {
      fail(`dist/${relativePath} should exist before deployment.`);
      continue;
    }

    const text = readFileSync(filePath, "utf8");
    if (!text.includes(configuredSiteUrl)) {
      fail(`dist/${relativePath} should reference ${configuredSiteUrl}.`);
    }
  }
}

if (!process.exitCode) {
  console.log(`Deploy output uses ${configuredSiteUrl} and does not reference ${forbiddenFallbackDomain}.`);
}
