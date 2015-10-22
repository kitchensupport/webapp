exports.config = {
    seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.47.0.jar',
    chromeDriver: '../node_modules/protractor/selenium/chromeDriver',
    framework: 'jasmine2',
    specs: ['main.js'],
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY
};