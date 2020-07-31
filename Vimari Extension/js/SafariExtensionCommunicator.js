var SafariExtensionCommunicator = (function (msgHandler) {
    'use strict'
    var publicAPI = {}

    // Connect the provided message handler to the received messages.
    safari.self.addEventListener("message", msgHandler)

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
});
