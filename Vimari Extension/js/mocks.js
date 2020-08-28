var safari = {
  self: {
    tab: {
      dispatchMessage: function () {},
    },
    addEventListener: function () {},
  },
};
window.safari = safari;

global.SafariExtensionCommunicator = function () {
    return {
        requestSettingsUpdate: function() {}
    }
}
