// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Конфигурация Playwright для E2E тестирования сайта msk.splitis.ru
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  
  // Максимальное время выполнения одного теста
  timeout: 30 * 1000,
  
  // Количество повторных попыток для упавших тестов
  retries: process.env.CI ? 2 : 0,
  
  // Количество параллельных воркеров
  workers: process.env.CI ? 1 : undefined,
  
  // Базовая URL для тестов
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // Настройка проектов (браузеры и устройства)
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
        video: 'off', // Отключаем видео для WebKit из-за проблем с записью
      },
    },
    {
      name: 'Mobile Chrome',
      use: { 
        ...devices['Pixel 5'],
        viewport: { width: 393, height: 851 },
      },
    },
    {
      name: 'Mobile Safari',
      use: { 
        ...devices['iPhone 12'],
        viewport: { width: 390, height: 844 },
        video: 'off', // Отключаем видео для Mobile Safari из-за проблем с записью
      },
    },
  ],

  // Настройка веб-сервера для автоматического запуска сервера при тестах
  webServer: {
    command: 'npm run serve',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
