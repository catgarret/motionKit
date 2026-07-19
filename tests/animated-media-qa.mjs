import { resolve } from 'node:path';
import { chromium } from 'playwright-core';
import { killBrowserServer } from './browser-cleanup.mjs';
import { runAnimatedMediaQa } from './animated-media-helper.mjs';

const root = resolve(import.meta.dirname, '..');
let browserServer;
let browser;
let passed = false;
try {
  browserServer = await chromium.launchServer({
    executablePath: process.env.MK_CHROMIUM || '/usr/bin/chromium',
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--autoplay-policy=no-user-gesture-required']
  });
  browser = await chromium.connect(browserServer.wsEndpoint());
  await runAnimatedMediaQa(browser, root);
  console.log('Animated media QA OK: GIF, animated WebP, APNG and video ambient remain live.');
  passed = true;
} finally {
  killBrowserServer(browserServer);
  await new Promise((resolveCleanup) => setTimeout(resolveCleanup, 250));
  if (passed) process.reallyExit(0);
}
