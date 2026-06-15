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
  ["01-home", "/", false],
  ["02-projects", "/projects", false],
  ["03-achilles", "/projects/achilles", false],
  ["04-pneumonia-detection", "/projects/lung-care", false],
  ["05-vscode-ai-copilot", "/projects/vscode-ai-copilot", false],
  ["06-codemate-ai", "/projects/codemate-ai", false],
  ["07-ai-meeting-scheduler", "/projects/ai-meeting-scheduler", false],
  ["08-home-fullpage", "/", true],
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
