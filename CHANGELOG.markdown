Release Notes
-------------

### 1.0 (21/11/2010)
* Changed the way vimari modifier keys work.  ESC key depricated.  Now use CTRL-modifierkey.

### 0.4 (17/11/2010)
* First BETA release !
* Press ESC to enter a permanent state of 'non' insert mode.  Clicking on any input then exits insert mode.  This fixes several issues with google and facebook.

### 0.3 (16/11/2010)
* Moved the extension startup code to be loaded before the browser page.  Events can now be intercepted before they are passed to the browser page.
* Created a manifest file, this allows automatic updates to take place.
* Added insert mode.  If the selected node can accept an input, the extension is disabled.  This functionality still needs some work.
* Ported the HUD from vimium.  The hud displays information along the bottom of the screen.  The hud has been ported but is not used for very much at the moment.

### 0.2 (14/11/2010)
* Pressing ESC now removes focus from any input fields and activates modifiers

### 0.1 (14/11/1020)
* First alpa release of vimari.  Added basic features but still very buggy.
