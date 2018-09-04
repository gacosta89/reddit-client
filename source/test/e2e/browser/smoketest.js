/* eslint-disable */

var WAIT = 5000

module.exports = {
    smoke: function(browser) {
        browser
            .url(`${browser.launchUrl}/`)
            .waitForElementVisible('body', WAIT)
            .assert.elementPresent('.left-bar')
            .waitForElementVisible('.left-bar > div:first-child', WAIT)
            .expect.element('.left-bar > div:nth-child(25)').to.be.present
    },
}
