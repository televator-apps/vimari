/*
 * Code in this file is taken directly from vimium
 */


/*
 * A heads-up-display (HUD) for showing Vimium page operations.
 * Note: you cannot interact with the HUD until document.body is available.
 */
HUD = {
  _tweenId: -1,
  _displayElement: null,
  _upgradeNotificationElement: null,

  // This HUD is styled to precisely mimick the chrome HUD on Mac. Use the "has_popup_and_link_hud.html"
  // test harness to tweak these styles to match Chrome's. One limitation of our HUD display is that
  // it doesn't sit on top of horizontal scrollbars like Chrome's HUD does.
  _hudCss:
    ".vimiumHUD, .vimiumHUD * {" +
      "line-height: 100%;" +
      "font-size: 11px;" +
      "font-weight: normal;" +
    "}" +
    ".vimiumHUD {" +
      "position: fixed;" +
      "bottom: 0px;" +
      "color: black;" +
      "height: 13px;" +
      "max-width: 400px;" +
      "min-width: 150px;" +
      "text-align: left;" +
      "background-color: #ebebeb;" +
      "padding: 3px 3px 2px 3px;" +
      "border: 1px solid #b3b3b3;" +
      "border-radius: 4px 4px 0 0;" +
      "font-family: Lucida Grande, Arial, Sans;" +
      // One less than vimium's hint markers, so link hints can be shown e.g. for the panel's close button.
      "z-index: 99999998;" +
      "text-shadow: 0px 1px 2px #FFF;" +
      "line-height: 1.0;" +
      "opacity: 0;" +
    "}" +
    ".vimiumHUD a, .vimiumHUD a:hover {" +
      "background: transparent;" +
      "color: blue;" +
      "text-decoration: underline;" +
    "}" +
    ".vimiumHUD a.close-button {" +
      "float:right;" +
      "font-family:courier new;" +
      "font-weight:bold;" +
      "color:#9C9A9A;" +
      "text-decoration:none;" +
      "padding-left:10px;" +
      "margin-top:-1px;" +
      "font-size:14px;" +
    "}" +
    ".vimiumHUD a.close-button:hover {" +
      "color:#333333;" +
      "cursor:default;" +
      "-webkit-user-select:none;" +
    "}",

  _cssHasBeenAdded: false,

  showForDuration: function(text, duration) {
    HUD.show(text);
    HUD._showForDurationTimerId = setTimeout(function() { HUD.hide(); }, duration);
  },

  show: function(text) {
    clearTimeout(HUD._showForDurationTimerId);
    HUD.displayElement().innerHTML = text;
    clearInterval(HUD._tweenId);
    HUD._tweenId = Tween.fade(HUD.displayElement(), 1.0, 150);
    HUD.displayElement().style.display = "";
  },

  showUpgradeNotification: function(version) {
    HUD.upgradeNotificationElement().innerHTML = "Vimium has been updated to " +
      "<a href='https://chrome.google.com/extensions/detail/dbepggeogbaibhgnhhndojpepiihcmeb'>" +
      version + "</a>.<a class='close-button' href='#'>x</a>";
    var links = HUD.upgradeNotificationElement().getElementsByTagName("a");
    links[0].addEventListener("click", HUD.onUpdateLinkClicked, false);
    links[1].addEventListener("click", function(event) {
      event.preventDefault();
      HUD.onUpdateLinkClicked();
    });
    Tween.fade(HUD.upgradeNotificationElement(), 1.0, 150);
  },

  onUpdateLinkClicked: function(event) {
    HUD.hideUpgradeNotification();
    chrome.extension.sendRequest({ handler: "upgradeNotificationClosed" });
  },

  hideUpgradeNotification: function(clickEvent) {
    Tween.fade(HUD.upgradeNotificationElement(), 0, 150,
      function() { HUD.upgradeNotificationElement().style.display = "none"; });
  },

  updatePageZoomLevel: function(pageZoomLevel) {
    // Since the chrome HUD does not scale with the page's zoom level, neither will this HUD.
    var inverseZoomLevel = (100.0 / pageZoomLevel) * 100;
    if (HUD._displayElement)
      HUD.displayElement().style.zoom = inverseZoomLevel + "%";
    if (HUD._upgradeNotificationElement)
      HUD.upgradeNotificationElement().style.zoom = inverseZoomLevel + "%";
  },

  /*
   * Retrieves the HUD HTML element.
   */
  displayElement: function() {
    if (!HUD._displayElement) {
      HUD._displayElement = HUD.createHudElement();
      // Keep this far enough to the right so that it doesn't collide with the "popups blocked" chrome HUD.
      HUD._displayElement.style.right = "150px";
      HUD.updatePageZoomLevel(currentZoomLevel);
    }
    return HUD._displayElement;
  },

  upgradeNotificationElement: function() {
    if (!HUD._upgradeNotificationElement) {
      HUD._upgradeNotificationElement = HUD.createHudElement();
      // Position this just to the left of our normal HUD.
      HUD._upgradeNotificationElement.style.right = "315px";
      HUD.updatePageZoomLevel(currentZoomLevel);
    }
    return HUD._upgradeNotificationElement;
  },

  createHudElement: function() {
    if (!HUD._cssHasBeenAdded) {
      addCssToPage(HUD._hudCss);
      HUD._cssHasBeenAdded = true;
    }
    var element = document.createElement("div");
    element.className = "vimiumHUD";
    document.body.appendChild(element);
    return element;
  },

  hide: function() {
    clearInterval(HUD._tweenId);
    HUD._tweenId = Tween.fade(HUD.displayElement(), 0, 150,
      function() { HUD.displayElement().style.display = "none"; });
  },

  isReady: function() { return document.body != null; }
};




Tween = {
  /*
   * Fades an element's alpha. Returns a timer ID which can be used to stop the tween via clearInterval.
   */
  fade: function(element, toAlpha, duration, onComplete) {
    var state = {};
    state.duration = duration;
    state.startTime = (new Date()).getTime();
    state.from = parseInt(element.style.opacity) || 0;
    state.to = toAlpha;
    state.onUpdate = function(value) {
      element.style.opacity = value;
      if (value == state.to && onComplete)
        onComplete();
    };
    state.timerId = setInterval(function() { Tween.performTweenStep(state); }, 50);
    return state.timerId;
  },

  performTweenStep: function(state) {
    var elapsed = (new Date()).getTime() - state.startTime;
    if (elapsed >= state.duration) {
      clearInterval(state.timerId);
      state.onUpdate(state.to)
    } else {
      var value = (elapsed / state.duration)  * (state.to - state.from) + state.from;
      state.onUpdate(value);
    }
  }
};





/*
 * Adds the given CSS to the page.
 */
function addCssToPage(css) {
  var head = document.getElementsByTagName("head")[0];
  if (!head) {
    console.log("Warning: unable to add CSS to the page.");
    return;
  }
  var style = document.createElement("style");
  style.type = "text/css";
  style.appendChild(document.createTextNode(css));
  head.appendChild(style);
}
