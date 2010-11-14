
// Vimarmi injected secript


// Declare all global vars
var topWindow = (window.top === window),
	settings = {},
	linkHintCss = {},
	currentZoomLevel = 100;


/*
 * To be called when the page in the background has been loaded
 */
function _init() {
	// Only add if topWindow... not iframe
	if (topWindow) {
		// Retrieve settings
		safari.self.tab.dispatchMessage('getSettings', '');
		document.addEventListener('keydown', keyEvent, false);
	}
}

/*
 * Handle key events
 */
function keyEvent(event) {
	var s = settings;

	// Do nothing if selected element is editable
 	if (document.activeElement && isEditable(document.activeElement))
		return;

	if (linkHintsModeActivated)
		return;

	switch (getKeyChar(event)) {
		case s.hintToggle    : 
					activateLinkHintsMode(false, false);
				  	break;
		case s.tabForward    :
					safari.self.tab.dispatchMessage('changeTab', 0);
					break;
		case s.tabBack       :
					safari.self.tab.dispatchMessage('changeTab', 1);
					break;
		case s.histForward   :
					window.history.forward();	
					break;
		case s.histBack      :
					window.history.back();
					break;


	}


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
	}
}



/*
 * Callback to pass settings to injected script
 */
function setSettings(msg) {
	settings = msg;
}


// Add event listener and init
safari.self.addEventListener("message", handleMessage, false);
_init();

