Changelog
-------------

### Unreleased
* Add user customisation (based on the work of @nieldm [#163](https://github.com/televator-apps/vimari/pull/163)).
* Update Vimari interface to allow users access to their configuration.
* Remove `closeTabReverse` action.

* Normal mode now isolates keybindings from the underlying website, this means that to interact with the underlying website you need to enter insert mode.
* You can enter insert mode by pressing <kbd>i</kbd> and exit the mode by pressing <kbd>esc</kbd>.
* In insert mode Vimari keybindings are disabled (except for <kbd>esc</kbd> which brings you back to normal mode) allowing you to interact with the underlying website.

### 2.0.3 (2019-09-26)

* Fix newTabHintToggle to use shift+f instead of F
* Implement forward tab and backward tab commands.
* Close tab with x is now implemented. Note that this relies on Safari's default behaviour to choose whether to switch to the left or right tab after closing the current tab.

### 2.0.2 (2019-09-23)

* Release a signed, notarized App and Safari App Extension 
* Reverse link hints, so nearby links have different hints [#77](https://github.com/televator-apps/vimari/issues/77)
* Hide non-matching link hints [#79](https://github.com/televator-apps/vimari/issues/79)
* Show state of extension in main application

### 2.0.0 (14/7/2018)
* vimari now exists as a Safari App Extension, making it compatible with Safari
  version 12

### 1.13.0 (16/8/2018)
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
