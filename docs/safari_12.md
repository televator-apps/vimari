# Installation notes for Safari version 12 and 13

A new version of macOS is being released, macOS Mojave, and it's expected to
have a stable release out September or October of 2018. With that new version
comes Safari 12, and a [completely new way of dealing with browser
extensions](https://developer.apple.com/documentation/safariservices/safari_app_extensions).
[We have had some issues](./crowdfunding.md) related to releasing new version
of this extension, but they are now fixed and it's possible to install a version
of vimari for Safari 12.

## How to install

**Note: We are currently working on improving this installation flow, as well
as the extension itself. Because vimari now has to be released as a _Safari
App Extension_ instead of a _Safari Extension_ it requires some fundamental
changes to the code. We can't guarantee that all the features work in
this version. It's a learning process for us so bare with us.**

1. Clone this repo
   ```sh
   $ git clone git@github.com:guyht/vimari.git
   ```
2. Open the Swift project located at `/Vimari.xcodeproj` in Xcode
3. Configure the Signing settings for both the `vimari` and `extension` targets
   to use your information rather than the Vimari team's (see [this SO answer](https://stackoverflow.com/questions/39754341/none-of-your-accounts-are-a-member-code-signing-errors-after-upgrading-to-xcode)
   for more information).
4. If you want different settings than the default ones, make your changes in
   `settings.js`. You can always come back later to change the settings again.
5. Build and run the project (`⌘ + r`)
6. An empty GUI box will show up - ignore it (we'll fix it later). Go to
   Safari and open up settings (`⌘ + ,`). Go to _Extensions_ and you should
   see **vimari** in the list of extensions. Enable it.
7. You may now press stop in Xcode and close Xcode. The extension will be
   available even if you restart Safari.

This was tested on High Sierra with Safari Technology Preview (version 12). Let
us know if something is not working for you.
