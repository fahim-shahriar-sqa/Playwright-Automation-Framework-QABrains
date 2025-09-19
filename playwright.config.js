// playwright.config.js
const { defineConfig } = require('@playwright/test');
const path = require('path');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 200 * 1000, // 60 sec per test
  retries: 0, // Retry once if test fails
  workers: 1,
  reporter: [
    ['html', { outputFolder: path.resolve(__dirname, 'reports'), open: 'never' }],
    ['json', { outputFile: path.resolve(__dirname, 'test-results/test-results.json') }],
    ['list'],
  ],
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    baseURL: "https://practice.qabrains.com/",
    navigationTimeout: 200 * 1000,
    actionTimeout: 50000,
    
    video: {
      mode: 'retain-on-failure', // record only failed tests
    },
  },
});