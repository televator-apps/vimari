const expect = require('expect.js');

describe('isExcludedUrl with excludedUrls', () => {
    const isExcludedUrl = window.isExcludedUrl;

    it('returns true on same exact domain', () => {
        const excludedUrl = 'specific-domain.com';
        const currentUrl = excludedUrl;
        expect(isExcludedUrl(excludedUrl, '', currentUrl)).to.be.ok();
    });

    it('returns true on duplicate domains', () => {
        const excludedUrls = 'specific-domain.com,specific-domain.com';
        const currentUrl = 'specific-domain.com';
        expect(isExcludedUrl(excludedUrls, '', currentUrl)).to.be.ok();
    });

    it('returns true if any domain match', () => {
        const excludedUrls = 'different-domain.com,specific-domain.com';
        const currentUrl = 'specific-domain.com';
        expect(isExcludedUrl(excludedUrls, '', currentUrl)).to.be.ok();
    });

    it('returns true on comma separated domains', () => {
        const excludedUrls = 'specific-domain.com,different-domain.com';
        const currentUrl = 'specific-domain.com';
        expect(isExcludedUrl(excludedUrls, '', currentUrl)).to.be.ok();
    });

    it('returns false on different domain', () => {
        const excludedUrl = 'www.different-domain.com';
        const currentUrl = 'specific-domain.com';
        expect(isExcludedUrl(excludedUrl, '', currentUrl)).to.not.be.ok();
    });

    it('returns false if no domains match', () => {
        const excludedUrls = 'www.different-domain.com,www.different-domain-2.com';
        const currentUrl = 'specific-domain.com';
        expect(isExcludedUrl(excludedUrls, '', currentUrl)).to.not.be.ok();
    });

    it('returns false on space separated domains', () => {
        const excludedUrls = 'specific-domain.com different-domain.com';
        const currentUrl = 'specific-domain.com';
        expect(isExcludedUrl(excludedUrls, '', currentUrl)).to.not.be.ok();
    });

    it('returns true on string added in front of current URL', () => {
        const excludedUrl = 'specific-domain.com';
        const currentUrl = 'http://specific-domain.com';
        expect(isExcludedUrl(excludedUrl, '', currentUrl)).to.be.ok();
    });

    it('returns true on string appended to current URL', () => {
        const excludedUrl = 'specific-domain.com';
        const currentUrl = 'specific-domain.com/arbitrary-string';
        expect(isExcludedUrl(excludedUrl, '', currentUrl)).to.be.ok();
    });

    it('returns true on string added on both sides of current URL', () => {
        const excludedUrl = 'specific-domain.com';
        const currentUrl = 'http://specific-domain.com/arbitrary-string';
        expect(isExcludedUrl(excludedUrl, '', currentUrl)).to.be.ok();
    });

    it('returns true if current URL is less specific than excluded domain', () => {
        let excludedUrl = 'http://specific-domain.com';
        let currentUrl = 'specific-domain.com';
        expect(isExcludedUrl(excludedUrl, '', currentUrl)).to.be.ok();

        excludedUrl = 'http://www.specific-domain.com';
        currentUrl = 'specific-domain.com';
        expect(isExcludedUrl(excludedUrl, '', currentUrl)).to.be.ok();
    });

    it('returns true if current URL with appended string is less specific than excluded domain', () => {
        const excludedUrl = 'http://specific-domain.com';
        const currentUrl = 'specific-domain.com/arbitrary-string';
        expect(isExcludedUrl(excludedUrl, '', currentUrl)).to.be.ok();
    });

    it('returns true even though cases doesn\'t match', () => {
        let excludedUrl = 'SPECIFIC-DOMAIN.com';
        let currentUrl = 'specific-domain.com';
        expect(isExcludedUrl(excludedUrl, '', currentUrl)).to.be.ok();

        excludedUrl = 'specific-domain.com';
        currentUrl = 'SPECIFIC-DOMAIN.com';
        expect(isExcludedUrl(excludedUrl, '', currentUrl)).to.be.ok();
    });
});

describe('isExcludedUrl with excludedUrlsRegex', () => {
    const isExcludedUrl = window.isExcludedUrl;

    it('returns true on same exact domain', () => {
        const excludedUrl = '^https://specific-domain\\.com/';
        const currentUrl = 'https://specific-domain.com/';
        expect(isExcludedUrl('', excludedUrl, currentUrl)).to.be.ok();
    });

    it('returns true on string appended to current URL', () => {
        const excludedUrl = '^https://specific-domain\\.com/';
        const currentUrl = 'https://specific-domain.com/foo';
        expect(isExcludedUrl('', excludedUrl, currentUrl)).to.be.ok();
    });

    it('returns true on duplicate domains', () => {
        const excludedUrls = '^https://(specific-domain\\.com|specific-domain\\.com)/';
        const currentUrl = 'https://specific-domain.com/foo';
        expect(isExcludedUrl('', excludedUrls, currentUrl)).to.be.ok();
    });

    it('returns true if any domain match', () => {
        const excludedUrls = '^https://(specific-domain|other-domain)\\.com/';
        const currentUrl = 'https://specific-domain.com/foo';
        expect(isExcludedUrl('', excludedUrls, currentUrl)).to.be.ok();
    });

    it('returns false on different domain', () => {
        const excludedUrl = '^https://www\\.different-domain\\.com';
        const currentUrl = 'https://specific-domain.com/';
        expect(isExcludedUrl('', excludedUrl, currentUrl)).to.not.be.ok();
    });

    it('returns false if does not match right pattern', () => {
        const excludedUrls = '^https://blah\\.com/';
        const currentUrl = 'https://foo.com/https://blah.com';
        expect(isExcludedUrl('', excludedUrls, currentUrl)).to.not.be.ok();
    });

    it('returns true on string added on both sides of current URL', () => {
        const excludedUrl = 'specific-domain.com';
        const currentUrl = 'http://specific-domain.com/arbitrary-string';
        expect(isExcludedUrl('', excludedUrl, currentUrl)).to.be.ok();
    });

    it('returns true if current URL is less specific than excluded domain', () => {
        let excludedUrl = '^http://(www\\.)?specific-domain\\.com/';
        let currentUrl = 'http://specific-domain.com/';
        expect(isExcludedUrl('', excludedUrl, currentUrl)).to.be.ok();
        currentUrl = 'http://www.specific-domain.com/';
        expect(isExcludedUrl('', excludedUrl, currentUrl)).to.be.ok();
    });

    it('returns true even though cases doesn\'t match', () => {
        let excludedUrl = '^https://SPECIFIC-DOMAIN\\.com/';
        let currentUrl = 'https://specific-domain.com/';
        expect(isExcludedUrl('', excludedUrl, currentUrl)).to.be.ok();

        excludedUrl = '^https://specific-domain\\.com/';
        currentUrl = 'https://SPECIFIC-DOMAIN.com/';
        expect(isExcludedUrl('', excludedUrl, currentUrl)).to.be.ok();
    });
});

describe('stripProtocolAndWww', () => {
    const stripProtocolAndWww = window.stripProtocolAndWww;

    it('strips http', () => {
        const url = 'http://specific-domain.com';
        expect(stripProtocolAndWww(url)).to.equal('specific-domain.com');
    });

    it('strips https', () => {
        const url = 'https://specific-domain.com';
        expect(stripProtocolAndWww(url)).to.equal('specific-domain.com');
    });

    it('strips www', () => {
        const url = 'www.specific-domain.com';
        expect(stripProtocolAndWww(url)).to.equal('specific-domain.com');
    });

    it('strips http and www', () => {
        const url = 'http://www.specific-domain.com';
        expect(stripProtocolAndWww(url)).to.equal('specific-domain.com');
    });

    it('strips https and www', () => {
        const url = 'https://www.specific-domain.com';
        expect(stripProtocolAndWww(url)).to.equal('specific-domain.com');
    });
});
