'use strict';

module.exports = function (config) {
		config.set({
				autoWatch: true,
				browsers: ['Chrome'],
				frameworks: ['jasmine'],
				logLevel: config.LOG_INFO,
				files: [
						'node_modules/reflect-metadata/Reflect.js',
						'node_modules/es6-shim/es6-shim.min.js',
						'node_modules/zone.js/dist/zone.js',
						'karma.entry.js'
				],
				preprocessors: {
						'karma.entry.js': ['webpack', 'sourcemap']
				},
				plugins: [
						'karma-jasmine',
						'karma-webpack',
						'karma-sourcemap-loader',
						'karma-chrome-launcher'
				],
				singleRun: false,
				webpack: require('./webpack.config'),
				webpackServer: {
						noInfo: true
				}
		});
};