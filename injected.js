
// Vimarmi injected secript

var topWindow = (window.top === window),
	linkmode = false,
	shortCodes = ['aa','as','ad','af'],
	linkCodes = [];


/*
 * To be called when the page in the background has been loaded
 */
function _init() {
	// Only add if topWindow... not iframe
	if (topWindow) {
		document.addEventListener('keydown', keyEvent, false);
	}
}

/*
 * Handle key events
 */
function keyEvent(event) {
	var a = document.getElementsByTagName('a'),
		i;
	
	// Check length
	if (a.length) {
		for (i=0;i<a.length;i++) {
			if (shortCodes.length > i) {
				// Add hover and register links
				linkCodes[i] = { 'link' : a.href, 'code' : shorCodes[i] };
			}
		}
	}

}

_init();

