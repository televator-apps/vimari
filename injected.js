
// Vimarmi injected secript


// Declare all global vars
var topWindow = (window.top === window),
	settings = {},
	linkHintCss = {},
	currentZoomLevel = 100,
	insertMode = true;


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

	// If escape, force focus out of an input
	if (isEscape(event) && insertMode) {
		exitInsertMode(event);
		return;
	}

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
		case s.inserMode    :
					enterInsertMode();
					break;


	}


}



/*
 * Steal focus away from input boxes
 */
function exitInsertMode(event) {
	// Note that we can't programmatically blur out of Flash embeds from Javascript.
	if (!isEmbed(event.srcElement)) {
	  // Remove focus so the user can't just get himself back into insert mode by typing in the same input box.
	  if (isEditable(event.srcElement)) { event.srcElement.blur(); }
	  insertMode = false;

	  // Added to prevent Google Instant from reclaiming the keystroke and putting us back into the search box.
	  // TOOD(ilya): Revisit this. Not sure it's the absolute best approach.
	  event.stopPropagation();
	}
}



/*
 * Exit insert mode
 */
function enterInsertMode() {
  insertMode = true;
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

