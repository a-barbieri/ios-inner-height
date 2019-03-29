'use strict';
// https://docs.cucumber.io/guides/10-minute-tutorial/
// https://docs.cucumber.io/guides/browser-automation/#selenium-webdriver
// https://www.npmjs.com/package/selenium-webdriver
// https://www.npmjs.com/package/geckodriver
// https://seleniumhq.github.io/selenium/docs/api/java/org/openqa/selenium/remote/RemoteWebDriver.html#findElement-org.openqa.selenium.By-
// https://github.com/SeleniumHQ/selenium/issues/6673#issuecomment-477954478
const webdriver = require('selenium-webdriver');
const assert = require('assert');
const {Given, When, Then} = require('cucumber');

// Input capabilities
var capabilities = {
	'browserName' : 'iPhone',
	'device' : 'iPhone 8 Plus',
	'realMobile' : 'true',
	'os_version' : '11',
	'browserstack.user' : 'xxx', //sorry, not in public repo
	'browserstack.key' : 'xxx' // sorry, not in public repo
}

var driver = new webdriver.Builder().
usingServer('http://hub-cloud.browserstack.com/wd/hub').
withCapabilities(capabilities).
build();

// standard firefox local test
// const driver = new webdriver.Builder().forBrowser('firefox').build();

When('I type query as {string}', function (string, next) {
	driver
		.get('https://www.google.com');
	driver
		.findElement(webdriver.By.name('q'))
		.sendKeys(string + '\n')
		.then(next);
});

Then('I submit', function (next) {
	driver
		.wait(()=>{
			return driver
				.findElement(webdriver.By.name('btnK'))
				.click();
		}, 3000)
		.then(next);
});

Then('I should see title {string}', function (title) {
	driver
		.wait(()=>{
			return driver
				.getTitle()
				.then(function(string) {
					return assert.equal(string, title, 'Expected title to be ' + title);
				});
		},2000)
		.then(()=>(driver.quit()));
});


// driver.get('http://www.google.com');
// driver.findElement(webdriver.By.name('q')).sendKeys('BrowserStack');
// driver.findElement(webdriver.By.name('btnG')).click();
//
// driver.getTitle().then(function(title) {
// 	console.log(title);
// });
//
// driver.quit();
