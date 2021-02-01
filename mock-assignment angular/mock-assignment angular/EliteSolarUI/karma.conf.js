// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-structured-json-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      captureConsole: false
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    angularCli: { //Added by me
      environment: 'dev'
    },
    customLaunchers: { //Added by me
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '-headless',
          '--disable-gpu',
          '--disable-extensions',
          '--disable-translate',
          // Without a remote debugging port, Google Chrome exits immediately.
          '--remote-debugging-port=9222',
        ],
      }
    },
    reporters: ['json-result', 'progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    browserDisconnectTolerance: 4,
    browserNoActivityTimeout: 50000,
    jsonResultReporter: {
      outputFile: "result.json",
      isSynchronous: true
    },
  });
};