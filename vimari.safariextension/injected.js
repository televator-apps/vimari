/*
 * Vimari injected script.
 *
 * This script is called before the requested page is loaded.  This allows us
 * to intercept events before they are passed to the requested pages code and
 * therefore we can stop certain pages (google) stealing the focus.
 */


/*
 * Global vars
 *
 * topWindow        - true if top window, false if iframe
 * settings         - stores user settings
 * currentZoomLevel - required for vimium scripts to run correctly
 * linkHintCss      - required from vimium scripts
 * extensionActive  - is the extension currently enabled (should only be true when tab is active)
 * shiftKeyToggle   - is shift key currently toggled
 * activeUrl 				- current url string
 */

var topWindow = (window.top === window),
	settings = {},
	currentZoomLevel = 100,
	linkHintCss = {},
	extensionActive = true,
	insertMode = false,
	shiftKeyToggle = false
	activeUrl = '';

var actionMap = {
	'hintToggle' : function() {
		HUD.show('Link hints mode');
		activateLinkHintsMode(false, false); },

	'newTabHintToggle' : function() {
		HUD.show('Link hints mode');
		activateLinkHintsMode(true, false); },

	'tabForward' : function() {
		safari.self.tab.dispatchMessage('changeTab', 1); },

	'tabBack'    : function() {
		safari.self.tab.dispatchMessage('changeTab', 0); },

	'scrollDown' :
		function() { window.scrollBy(0, 60); },

	'scrollUp' :
		function() { window.scrollBy(0, -60); },

	'scrollLeft' :
		function() { window.scrollBy(-60, 0); },

	'scrollRight' :
		function() { window.scrollBy(60, 0); },

	'goBack' :
		function() { window.history.back(); },

	'goForward' :
		function() { window.history.forward(); },

	'reload' :
		function() { window.location.reload(); },

	'closeTab'   :
		function() { safari.self.tab.dispatchMessage('closeTab', 0); },

	'closeTabReverse'   :
		function() { safari.self.tab.dispatchMessage('closeTab', 1); },

	'scrollDownHalfPage' :
		function() { window.scrollBy(0, window.innerHeight / 2); },

	'scrollUpHalfPage'   :
		function() { window.scrollBy(0, window.innerHeight / -2); },

	'goToPageBottom'     :
		function() { window.scrollBy(0, document.body.scrollHeight); },

	'goToPageTop'        :
		function() { window.scrollBy(0, -document.body.scrollHeight); }
};

// Meant to be overridden, but still has to be copy/pasted from the original...
Mousetrap.stopCallback = function(e, element, combo) {
	// Escape key is special, no need to stop. Vimari-specific.
	if (combo === 'esc') { return false; }

  // Preserve the behavior of allowing ex. ctrl-j in an input
  if (settings.modifier) { return false; }

	// if the element has the class "mousetrap" then no need to stop
	if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
		return false;
	}

	// stop for input, select, and textarea
	return element.tagName == 'INPUT' || element.tagName == 'SELECT' || element.tagName == 'TEXTAREA' || (element.contentEditable && element.contentEditable == 'true');
}

// Set up key codes to event handlers
function bindKeyCodesToActions() {
	// Only add if topWindow... not iframe
	console.log('binding');
	if (topWindow && isEnabledForUrl() ) {
		console.log('binding more');
		Mousetrap.reset();
		Mousetrap.bind('esc', enterNormalMode);
		Mousetrap.bind('i', enterInsertMode);
		for (var actionName in actionMap) {
			if (actionMap.hasOwnProperty(actionName)) {
				var keyCode = getKeyCode(actionName);
				Mousetrap.bind(keyCode, executeAction(actionName), 'keydown');
			}
		}
	}
}

function enterNormalMode() {
	// Clear input focus
	document.activeElement.blur();

	// Clear link hints (if any)
	deactivateLinkHintsMode();

	// Re-enable if in insert mode
	insertMode = false;
	Mousetrap.bind('i', enterInsertMode);
}

// Calling it 'insert mode', but it's really just a user-triggered
// off switch for the actions.
function enterInsertMode() {
	insertMode = true;
	Mousetrap.unbind('i');
}

function executeAction(actionName) {
	return function() {
		// don't do anything if we're not supposed to
		if (linkHintsModeActivated || !extensionActive || insertMode)
			return;

		//Call the action function
		actionMap[actionName]();

		// Tell mousetrap to stop propagation
		return false;
	}
}

function unbindKeyCodes() {
	Mousetrap.reset();
}

// Adds an optional modifier to the configured key code for the action
function getKeyCode(actionName) {
	var keyCode = '';
	if(settings.modifier) {
		keyCode += settings.modifier + '+';
	}
	return keyCode + settings[actionName];
}



/*
 * Adds the given CSS to the page.
 * This function is required by vimium but depracated for vimari as the
 * css is pre loaded into the page.
 */
function addCssToPage(css) {
	return;
}



/*
 * Input or text elements are considered focusable and able to receieve their own keyboard events,
 * and will enter enter mode if focused. Also note that the "contentEditable" attribute can be set on
 * any element which makes it a rich text editor, like the notes on jjot.com.
 * Note: we used to discriminate for text-only inputs, but this is not accurate since all input fields
 * can be controlled via the keyboard, particuarlly SELECT combo boxes.
 */
function isEditable(target) {
	if (target.getAttribute("contentEditable") == "true")
		return true;
	var focusableInputs = ["input", "textarea", "select", "button"];
	return focusableInputs.indexOf(target.tagName.toLowerCase()) >= 0;
}



/*
 * Embedded elements like Flash and quicktime players can obtain focus but cannot be programmatically
 * unfocused.
 */
function isEmbed(element) { return ["EMBED", "OBJECT"].indexOf(element.tagName) > 0; }




// ==========================
// Message handling functions
// ==========================

/*
 * All messages are handled by this function
 */
function handleMessage(msg) {
	// Attempt to call a function with the same name as the message name
	switch(msg.name) {
		case 'setSettings':
			setSettings(msg.message);
			break;
		case 'setActiveUrl':
			setActiveUrl(msg.message);
			break;
		case 'setActive':
			setActive(msg.message);
			break;
	}
}

/*
 * Callback to pass settings to injected script
 */
function setSettings(msg) {
	settings = msg;
	bindKeyCodesToActions();
}

/*
 * Callback to pass active url to injected script
 */
function setActiveUrl(msg) {
	activeUrl = msg;
}

/*
 * Enable or disable the extension on this tab
 */
function setActive(msg) {

	extensionActive = msg;
	if(msg) {
		bindKeyCodesToActions();
	} else {
		unbindKeyCodes();
	}
}

/*
 * Check to see if the current url is in the blacklist
 */
function isEnabledForUrl() {
  var excludedUrls, isEnabled, regexp, url, _i, _len;
  excludedUrls = settings.excludedUrls.split(",");
  for (_i = 0, _len = excludedUrls.length; _i < _len; _i++) {
    url = excludedUrls[_i];
    regexp = new RegExp("^" + url.replace(/\*/g, ".*") + "$");
    if (activeUrl.match(regexp)) {
      return false;
    }
  }
  return true;
};


// Add event listener
safari.self.addEventListener("message", handleMessage, false);
// Retrieve active url
safari.self.tab.dispatchMessage('getActiveTabUrl', '');
// Retrieve settings
safari.self.tab.dispatchMessage('getSettings', '');

