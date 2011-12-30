**NOTE: If you have a pre 1.2 version of Vimari, you need to manually update to the latest version as there is a bug in the auto-update code.  Versions post 1.2 will automatically update to the lastest version.**

Vimari - Keyboard Shortcuts extension for Safari
================================================

### New in version 1.5

* Fixed tab movement.  This now works again.  Issue was caused because
events were propagated across all tabs.

* Fixed extension not being loaded in new tabs.  This was caused because
messages from the global page can only be sent to the 'active' tab (not
the case when a new tab is opened).  The extension is now
enabled/disabled on tab activation.

* **Added new feature.  CTRL-SHIFT-F now opens links in a new tab!!**

Vimari is a Safari extension that provides keyboard based navigation.  The code is heavily based on 'vimium', a chrome extension that provides much more extensive features.

Vimari attempts to provide a lightweight port of vimium to Safari, taking the best components of vimium and adapting them to Safari.

__Installation Instructions:__

Click the download link below:
	https://github.com/downloads/guyht/vimari/vimari-1.2.safariextz


Screenshots
-----------

![Screenshot](https://github.com/guyht/vimari/raw/gh-pages/shot.png)


Sounds awesome.  Howto?
-----------------------

Simply browse to a page and hold CTRL, then press 'f' to enter link hint mode to easily navigate, q or w to move between tabs ;).  All these shortcuts are also configurable through Safari preferences.  Enjoy.

Link Hints
----------

The principle feature of Vimari and the principle component taken from vimium is the link hints feature.  Press ESC to enter 'vimari shortcut mode' and then pressing 'f' enters link hint mode which displays a HUD over the page wih a code for each link.  Simply type of code for the link to follow that link.  Link codes are generated according to the home key buttons and so are always easiliy accessible.

Keyboard Bindings
-----------------

All bindings are configurable in the Preferences->Extensions options in Safari

Currently:
	CTRL-f	Link Hints (open in same tab)
	CTRL-SHIFT-f Link Hints (open in new tab)
	CTRL-q 	Previous Tab
	CTRL-w	Next Tab



License
-------
Copyright (c) 2011 Guy Halford-Thompson. See MIT-LICENSE.txt for details.
