var path = require('path');

module.exports = {
		loaders: [
				{
						loader: 'raw',
						test: /.(html|scss)$/
				},
				{
						exclude: /node_modules/,
						loader: 'ts',
						test: /.ts$/
				}
		],
		noParse: [
				path.join('node_modules', 'angular2', 'bundles')
		]
};