# Vimari - Keyboard Shortcuts extension for Safari

[![Actions Status](https://github.com/danielcompton/vimari/workflows/Node%20CI/badge.svg)](https://github.com/danielcompton/vimari/actions)

Vimari is a Safari extension that provides keyboard based navigation.
The code is heavily based on [vimium](https://github.com/philc/vimium), a
Chrome extension that provides much more extensive features.

Vimari attempts to provide a lightweight port of vimium to Safari, taking the
best components of vimium and adapting them to Safari.

![Screenshot](assets/screenshot.png)

## Releases

### Safari 12
 - [v2.0.0](docs/safari_12.md)

### Safari 11 and below (DEPRECATED)
 - [v1.13](https://github.com/guyht/vimari/releases/tag/v1.13)
 - [v1.12](https://github.com/guyht/vimari/releases/tag/v1.12)
 - [v1.11](https://github.com/guyht/vimari/releases/tag/v1.11)
 - [v1.10](https://github.com/guyht/vimari/releases/tag/v1.10)
 - [v1.9](https://github.com/guyht/vimari/releases/tag/v1.9)

## Installation

### Safari 12 and 13

Read [this guide](docs/safari_12.md).

### Safari 11

[Download the latest
version](https://github.com/guyht/vimari/releases/tag/v1.13) and double-click
the file.

## Usage

### Settings
**Command Prefix** - Modifier key to hold down with your action key. If
you leave it blank you don't need to hold down anything (default
setting).

**Excluded URLs** - Comma separated list of website URLs you don't want
to use vimari with. To exclude GitHub for example, provide the value
`github.com` or `http://github.com`. It's smart and should handle all
possible domain cases.

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

## License

Copyright (C) 2011 Guy Halford-Thompson. See [LICENSE](LICENSE) for details.
