exports.config = {
    framework: 'jasmine2',
    suites: {
        home: 'e2e/home/**/*.spec.js',
        header: 'e2e/header/**/*.spec.js'
    },
    jasmineNodeOpts: {
        isVerbose: false,
        showColors: true,
        includeStackTrace: true
    }
};
