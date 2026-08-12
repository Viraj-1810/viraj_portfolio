/**
 * Capture clean screenshots of the live site for the Fiverr portfolio.
 * Uses reducedMotion so the 404 intro is skipped and real content shows.
 * Output: screenshots/*.png   (retina @2x)
 *
 * Run: node scripts/shots.mjs
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "screenshots");
mkdirSync(OUT, { recursive: true });

const base = process.env.SITE_URL || "https://virajportfolio1.vercel.app";

const pages = [
  ["09-achilles-trading-bot", "/projects/achilles-trading-bot", false],
  ["10-achilles-pro-dashboard", "/projects/achilles-pro-dashboard", false],
  ["11-strategy-backtesting", "/projects/strategy-backtesting-engine", false],
  ["01-home", "/", false],
  ["02-projects", "/projects", false],
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  reducedMotion: "reduce",
});
const page = await ctx.newPage();

for (const [name, path, full] of pages) {
  try {
    await page.goto(base + path, { waitUntil: "load", timeout: 45000 });
    await page.waitForTimeout(2200); // let fonts/images settle
    await page.screenshot({
      path: join(OUT, `${name}.png`),
      fullPage: full,
    });
    console.log("shot", name);
  } catch (e) {
    console.log("FAILED", name, e.message);
  }
}

await browser.close();
console.log("Done →", OUT);
