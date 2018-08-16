Changelog
-------------

### 2.0.0 (14/7/2018)
* vimari now exists as a Safari App Extension, making it compatible with Safari
  version 12

### 1.3.0 (16/8/2018)
* New fresh icon
* Removed shift as default modifier key
* 't' now opens new tab
* HUD now looks nicer
* Open link in new tab now works (bugfix)
* Excluded URL doesn't need to be exact anymore (bugfix)

### 1.2 - 1.12 skipped

### 1.1 (31/07/2011)
* Updated to work with the new version of Safari on lion
* Removed history forward / back
* Changed directory structure to make it more developer friendly

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
