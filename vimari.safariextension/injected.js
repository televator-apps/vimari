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
 */

var topWindow = (window.top === window),
	settings = {},
	currentZoomLevel = 100,
	linkHintCss = {},
	extensionActive = true,
	shiftKeyToggle = false;

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

	'scrollDown' : function() { window.scrollBy(0, 60); },

	'scrollUp'   : function() { window.scrollBy(0, -60); }
};

// Set up key codes to event handlers
function bindKeyCodesToActions() {
	// Only add if topWindow... not iframe
	if (topWindow) {
		Mousetrap.reset();
		for (var actionName in actionMap) {
			if (actionMap.hasOwnProperty(actionName)) {
				var keyCodes = getKeyCodes(actionName);
				Mousetrap.bind(keyCodes, executeAction(actionName), 'keydown');
			}
		}
	}
}

function executeAction(actionName) {
	return function() {
		// don't do anything if we're not supposed to
		if (linkHintsModeActivated || !extensionActive)
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
function getKeyCodes(actionName) {
	var modifier = '';
		keyCodes = settings[actionName].split(','),
		acc = [],
		i = 0;

	if(settings.modifier) {
		modifier += settings.modifier + '+';
	}

	for (i=0;i<keyCodes.length;i++) {
		acc[i] = modifier + keyCodes[i].trim();
	}

	return acc;
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
 * Enable or disable the extension on this tab
 */
function setActive(msg) {

	extensionActive = msg;
	if(msg) {
		// Add event listener...
		console.log('Enabling Vimari for this tab');
		bindKeyCodesToActions();
	} else {
		console.log('Disabling Vimari for this tab');
		unbindKeyCodes();
	}
}

// Add event listener
safari.self.addEventListener("message", handleMessage, false);
// Retrieve settings
safari.self.tab.dispatchMessage('getSettings', '');

