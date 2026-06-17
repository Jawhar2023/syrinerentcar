/**
 * Generates public/sitemap.xml from static routes + fleet car IDs + location pages.
 * Run: node scripts/generate-sitemap.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const SITE_URL = "https://www.syrinerentcar.com";
const today = new Date().toISOString().slice(0, 10);

const locations = JSON.parse(readFileSync(join(root, "src", "seo", "locations.json"), "utf8"));

const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/location-voiture-msaken", priority: "0.95", changefreq: "monthly" },
  { path: "/location-voiture-tunisie", priority: "0.95", changefreq: "weekly" },
  { path: "/notre-flotte", priority: "0.95", changefreq: "weekly" },
  { path: "/reservation", priority: "0.9", changefreq: "monthly" },
  { path: "/contact", priority: "0.85", changefreq: "monthly" },
];

const carIds = [
  "renault-clio",
  "kia-picanto",
  "skoda-fabia",
  "hyundai-i20",
  "dacia-sandero-stepway",
  "fiat-panda-4x4",
  "mahindra-xuv300",
];

const locationRoutes = locations.map((loc) => ({
  path: `/location-voiture-${loc.slug}`,
  priority: ["sousse", "monastir", "tunis", "hammamet", "djerba", "sfax"].includes(loc.slug) ? "0.9" : "0.85",
  changefreq: "monthly",
}));

const urls = [
  ...staticRoutes.map((r) => ({ loc: `${SITE_URL}${r.path}`, ...r })),
  ...locationRoutes.map((r) => ({ loc: `${SITE_URL}${r.path}`, ...r })),
  ...carIds.map((id) => ({
    loc: `${SITE_URL}/notre-flotte/voiture/${id}`,
    priority: "0.8",
    changefreq: "weekly",
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const outPath = join(root, "public", "sitemap.xml");
writeFileSync(outPath, xml, "utf8");
console.log(`Sitemap written: ${outPath} (${urls.length} URLs)`);
