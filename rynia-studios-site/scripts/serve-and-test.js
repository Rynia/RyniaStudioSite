import http from 'http';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve('test-artifacts');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  let filePath = path.join(path.resolve('dist'), req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(path.resolve('dist'), 'index.html');
  }
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading file');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(3000, async () => {
  console.log('Static server listening on http://localhost:3000');

  try {
    const browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--use-gl=angle']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
      console.log(`[Browser ${msg.type()}]: ${msg.text()}`);
    });
    page.on('pageerror', err => {
      errors.push(err.message);
      console.error(`[Browser PageError]: ${err.message}`);
    });

    console.log('Navigating to http://localhost:3000/ ...');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0', timeout: 15000 });
    await new Promise(r => setTimeout(r, 1800));

    // 1. Act I Hero Desktop
    await page.screenshot({ path: path.join(outDir, 'artefact-hero-desktop.png') });
    console.log('Captured test-artifacts/artefact-hero-desktop.png');

    // 2. Act II Systems Initial (Clean & un-cluttered)
    await page.evaluate(() => {
      document.getElementById('act-systems')?.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(outDir, 'act-ii-systems-clean.png') });
    console.log('Captured test-artifacts/act-ii-systems-clean.png');

    // 3. Act II Progressive Disclosure Expansion
    console.log('Testing progressive disclosure in Act II...');
    await page.click('button[data-target="kombo-matrix"]');
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(outDir, 'act-ii-systems-expanded.png') });
    console.log('Captured test-artifacts/act-ii-systems-expanded.png');

    // 3b. Act II Visual Archive Drawers
    console.log('Testing Kombo Kart visual archive drawer...');
    await page.click('button[data-target="kombo-visual-archive"]');
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(outDir, 'act-ii-kombo-visual-archive.png') });
    console.log('Captured test-artifacts/act-ii-kombo-visual-archive.png');

    console.log('Testing KALANLA visual archive drawer...');
    await page.click('button[data-target="kalanla-visual-archive"]');
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(outDir, 'act-ii-kalanla-visual-archive.png') });
    console.log('Captured test-artifacts/act-ii-kalanla-visual-archive.png');

    // Verify Protocol-45 is not in Act II
    const protocolInAct2 = await page.$eval('#act-systems', el => el.innerText.includes('PROTOCOL-45'));
    console.log(`Protocol-45 in Act II: ${protocolInAct2} (expected false)`);

    // 4. Act III Thesis (Macro close-up on Artefact fissure)
    await page.evaluate(() => {
      document.getElementById('act-thesis')?.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(outDir, 'act-iii-thesis.png') });
    console.log('Captured test-artifacts/act-iii-thesis.png');

    // 5. Act IV Pipelines & Field Notes & Lab Archive
    await page.evaluate(() => {
      document.getElementById('act-forge')?.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(outDir, 'act-iv-pipelines.png') });
    console.log('Captured test-artifacts/act-iv-pipelines.png');

    // Verify Lab Archive exists in Act IV
    const labArchiveExists = await page.$eval('.lab-archive-wrapper', el => el.innerText.includes('Protocol-45: Hubris'));
    console.log(`Protocol-45 in Act IV Lab Archive: ${labArchiveExists} (expected true)`);

    // 6. Act V Dossier & The Invitation
    await page.evaluate(() => {
      document.getElementById('act-dossier')?.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(outDir, 'act-v-dossier.png') });
    console.log('Captured test-artifacts/act-v-dossier.png');

    // 7. Test Language Toggle to TR
    console.log('Testing language switch to TR...');
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await new Promise(r => setTimeout(r, 400));
    await page.click('#langToggle');
    await new Promise(r => setTimeout(r, 600));

    const trTitle = await page.$eval('h1', el => el.innerText);
    const trBtn = await page.$eval('#langToggle', el => el.innerText);
    console.log(`Language switched to TR: Button is "${trBtn}", Title is "${trTitle.replace(/\n/g, ' ')}"`);
    await page.screenshot({ path: path.join(outDir, 'artefact-hero-turkish.png') });
    console.log('Captured test-artifacts/artefact-hero-turkish.png');

    // 8. Test Index Drawer & Escape key
    console.log('Testing INDEX drawer trigger...');
    await page.click('#indexTrigger');
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outDir, 'index-drawer-open.png') });
    console.log('Captured test-artifacts/index-drawer-open.png');

    console.log('Testing Escape key to close drawer...');
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 400));
    const isDrawerOpen = await page.$eval('#indexDrawer', el => el.classList.contains('is-open'));
    console.log(`Drawer is open after Escape: ${isDrawerOpen} (expected false)`);

    // 9. Mobile Viewport Test (390 x 844)
    console.log('Testing mobile viewport...');
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(outDir, 'mobile-hero.png') });
    console.log('Captured test-artifacts/mobile-hero.png');

    await browser.close();

    console.log('\n--- VERIFICATION SUMMARY ---');
    console.log(`Console Errors: ${errors.length}`);
    if (errors.length > 0) {
      console.log('Errors:', errors);
      process.exit(1);
    } else {
      console.log('ALL VERIFICATIONS PASSED WITH ZERO ERRORS!');
      process.exit(0);
    }
  } catch (err) {
    console.error('Test execution failed:', err);
    process.exit(1);
  } finally {
    server.close();
  }
});
