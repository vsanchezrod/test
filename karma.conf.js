module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      jasmine: {
        // Puedes desactivar el modo aleatorio
        random: false,
      },
      clearContext: false, // Deja visible el resultado del test en el navegador
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' }, // Genera un informe visual en HTML
        { type: 'text-summary' }, // Muestra un resumen en la consola
      ],
    },
    reporters: ['progress', 'coverage'], // Progreso y cobertura
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'], // Usa Chrome en modo headless
    singleRun: false,
    restartOnFileChange: true,
  });
};
