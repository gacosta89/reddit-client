/* eslint-disable */

var WAIT = 5000

module.exports = {
    detail: function(browser) {
        browser
            .url(`${browser.launchUrl}/`)
            .waitForElementVisible('body', WAIT)
            .assert.elementPresent('.left-bar')
            .waitForElementVisible('.left-bar > div:first-child', WAIT)
            .waitForElementVisible(
                '.left-bar div:first-child div:nth-child(4) .description',
                WAIT
            )
            .click('.left-bar div:first-child div:nth-child(4) ')
            .getText(
                '.left-bar div:first-child div:nth-child(4) .description',
                function(card) {
                    browser
                        .waitForElementVisible(
                            '.detail-page .description',
                            WAIT
                        )
                        .getText('.detail-page .description', function(detail) {
                            this.assert.equal(card.value, detail.value)
                        })
                }
            )
    },

    dismiss: function(browser) {
        browser
            .url(`${browser.launchUrl}/`)
            .waitForElementVisible('body', WAIT)
            .assert.elementPresent('.left-bar')
            .waitForElementVisible('.left-bar > div:first-child', WAIT)
            .waitForElementVisible(
                '.left-bar div:first-child div:nth-child(4) .description',
                WAIT
            )
            .click('.left-bar div:first-child div:nth-child(4) ')
            .waitForElementVisible('.detail-page .description', WAIT)
            .click('.detail-page .dismiss')
            .waitForElementNotPresent('.detail-page', WAIT)
            .assert.elementNotPresent('.detail-page')
    },
}
