module.exports = {
    testEnvironment: './custom-environment.js',
    testMatch: ["**/steps/*.js"],
    testTimeout: 300000,
    globalSetup: './global-setup.js',
    globalTeardown: './global-teardown.js',
    setupFilesAfterEnv: ["expect-puppeteer"]
}