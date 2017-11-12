/*
 * Check to see if the current url is in the blacklist
 */
function isEnabledForUrl(storedExcludedUrls, currentUrl) {
    var excludedUrls, regexp, url, _i, _len;
    excludedUrls = storedExcludedUrls.split(",");
    for (_i = 0, _len = excludedUrls.length; _i < _len; _i++) {
        url = excludedUrls[_i];
        regexp = new RegExp("^" + url.replace(/\*/g, ".*") + "$");
        if (currentUrl.match(regexp)) {
            return false;
        }
    }
    return true;
}

module.exports = {
    isEnabledForUrl: isEnabledForUrl
};
