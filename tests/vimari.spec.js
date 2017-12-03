const expect = require('expect.js');

describe('isExcludedUrl', () => {
    const isExcludedUrl = window.isExcludedUrl;

    it('returns true on same exact domain', () => {
        const excludedUrl = 'specific-domain.com';
        const currentUrl = excludedUrl;
        expect(isExcludedUrl(excludedUrl, currentUrl)).to.be.ok();
    });

    it('returns true on duplicate domains', () => {
        const excludedUrls = 'specific-domain.com,specific-domain.com';
        const currentUrl = 'specific-domain.com';
        expect(isExcludedUrl(excludedUrls, currentUrl)).to.be.ok();
    });

    it('returns true if domain match', () => {
        const excludedUrls = 'specific-domain.com,different-domain.com';
        const currentUrl = 'specific-domain.com';
        expect(isExcludedUrl(excludedUrls, currentUrl)).to.be.ok();
    });

    it('returns true on comma separated domains', () => {
        const excludedUrls = 'specific-domain.com,different-domain.com';
        const currentUrl = 'specific-domain.com';
        expect(isExcludedUrl(excludedUrls, currentUrl)).to.be.ok();
    });

    it('returns false on different domain', () => {
        const excludedUrls = 'www.different-domain.com';
        const currentUrl = 'specific-domain.com';
        expect(isExcludedUrl(excludedUrls, currentUrl)).to.not.be.ok();
    });

    it('returns false on space separated domains', () => {
        const excludedUrls = 'specific-domain.com different-domain.com';
        const currentUrl = 'specific-domain.com';
        expect(isExcludedUrl(excludedUrls, currentUrl)).to.not.be.ok();
    });
});
