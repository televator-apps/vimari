var SafariExtensionCommunicator = (function () {
    'use strict'
    var publicAPI = {}

    var sendMessage = function(msgName) {
        safari.extension.dispatchMessage(msgName)
    }

    publicAPI.requestSettingsUpdate = function() {
        sendMessage("updateSettings")
    }
    publicAPI.requestNewTab = function() {
        sendMessage("openNewTab")
    }
    publicAPI.requestTabForward = function() {
        sendMessage("tabForward")
    }
    publicAPI.requestTabBackward = function() {
        sendMessage("tabBackward")
    }
    publicAPI.requestCloseTab = function () {
        sendMessage("closeTab")
    }

    // Return only the public methods.
    return publicAPI;
})();
