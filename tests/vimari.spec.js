const expect = require('expect.js');
const utils = require('../vimari.safariextension/utils');

describe('utilites', () => {
    describe('isEnabledForUrl', () => {
        it('returns true on same exact domain', () => {
            const excludedUrl = 'http://specific-domain.com';
            const currentUrl = excludedUrl;
            expect(utils.isEnabledForUrl(excludedUrl, currentUrl)).to.not.be.ok();
        });

        it('returns false on slightly different domains', () => {
            const excludedUrls = 'http://www.specific-domain.com,www.specific-domain.com,specific-domain.com';
            const currentUrl = 'http://specific-domain.com';
            expect(utils.isEnabledForUrl(excludedUrls, currentUrl)).to.be.ok();
        });
    });
});
