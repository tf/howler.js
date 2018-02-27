module.exports = function(config) {
  config.set({
    browsers: ['ChromeHeadlessNoSandbox'],

    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        // Required for chrome to work in container based Travis
        // environment (see https://docs.travis-ci.com/user/chrome)
        flags: ['--no-sandbox']
      }
    },

    frameworks: ['mocha', 'chai'],

    files: [
      'src/howler.core.js',
      'tests/unit/*.js',
      {pattern: 'tests/audio/*', watched: false, included: false, served: true}
    ],

    port: 9876,
  });
};