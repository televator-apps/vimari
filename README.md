:rotating_light: **Attention!** We are currently blocked from releasing new
version of this extension, and we have a proposal solving this problem
:rotating_light:

**Funding Progress**

![Funding progress](http://progressed.io/bar/30)

**For full context, read [the full proposal](/docs/crowdfunding.md).**

## Proposal

I propose we use [Ko-fi](https://ko-fi.com) as a crowdfunding platform in order
to collect $99 for a ADP membership to be registered in my name (Simon
Egersand).

## If we reach our goal

If we reach the goal and successfully raise all the money we need, what
happens? First of all, I will register my account for a ADP membership and then
make all the changes required to publish the extension to the Safari Extension
Gallery (some changes are required, see
[#100](https://github.com/guyht/vimari/issues/100)). But what happens after
that?

I commit to being active in maintaining this extension for the next year. That
means I will work on fixing bugs, developing new features, increasing test
coverage and generally improving the code. And I welcome everyone to join me!

## How to donate

Use this button to donate one or multiple coffees, every coffee is worth $3!

[![ko-fi](https://www.ko-fi.com/img/donate_sm.png)](https://ko-fi.com/T6T0FK7H)

---

**NOTE: If you have a pre 1.2 version of Vimari, you need to manually
update to the latest version as there is a bug in the auto-update code.
Versions post 1.2 will automatically update to the lastest version.**

Vimari - Keyboard Shortcuts extension for Safari
================================================

Vimari is a Safari extension that provides keyboard based navigation.
The code is heavily based on [vimium](https://github.com/philc/vimium),
a Chrome extension that provides much more extensive features.

Vimari attempts to provide a lightweight port of vimium to Safari,
taking the best components of vimium and adapting them to Safari.

### Releases
  - [Version 1.12](https://github.com/guyht/vimari/releases/tag/v1.12)
  - [Version 1.11](https://github.com/guyht/vimari/releases/tag/v1.11)
  - [Version 1.10](https://github.com/guyht/vimari/releases/tag/v1.10)
  - [Version 1.9](https://github.com/guyht/vimari/releases/tag/v1.9)

__Installation Instructions__

Click the download link below and double-click the file to get the
latest version of vimari:

https://github.com/guyht/vimari/releases/latest


Screenshot
-----------

![Screenshot](https://github.com/guyht/vimari/raw/gh-pages/shot.png)

Usage
-----

### Settings
**Command Prefix** - Modifier key to hold down with your action key. If
you leave it blank you don't need to hold down anything (default
setting).

**Excluded URLs** - Comma separated list of website URLs you don't want
to use vimari with. To exclude GitHub for example, provide the value
`github.com` or `http://github.com`. It's smart and should handle all
possible domain cases though.

**Link Hint Characters** - Allowed characters to be used when generating
link shortcuts.

**Extra detection by cursor style** - Detect clickable links by looking
for HTML elements having cursor style set to "pointer".

**Scroll Size** - How much each scroll will move on the page.

### Keyboard Bindings
These are the default keyboard bindings, they can all be changed in the
settings of the extension. You can find them in
`Preferences->Extensions`.

#### In-page navigation
    f       Toggle links
    F       Toggle links (open link in new tab)
    k       Scroll up
    j       Scroll down
    h       Scroll left
    l       Scroll right
    u       Scroll up half page
    d       Scroll down half page
    g g     Go to top of page
    G       Go to bottom of page

#### Page/Tab navigation
    H       History back
    L       History forward
    r       Reload
    w       Next tab
    q       Previous tab
    x       Close current tab and go to left tab
    X       Close current tab and go to right tab
    t       Open new tab

License
-------
Copyright (c) 2011 Guy Halford-Thompson. See MIT-LICENSE.txt for
details.
