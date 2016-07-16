var browser = require('@angular/platform-browser/testing');
var testing = require('@angular/core/testing');
var context = require.context('/', true, /\.spec\.ts$/);

Error.stackTraceLimit = Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;

testing.setBaseTestProviders(
		browser.TEST_BROWSER_PLATFORM_PROVIDERS,
		browser.TEST_BROWSER_APPLICATION_PROVIDERS
);
context.keys()
		.forEach(context);

