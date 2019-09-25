import SafariServices

enum ActionType: String {
    case openLinkInTab
    case openNewTab
    case tabForward
    case tabBackward
    case closeTab
}

enum TabDirection: String {
    case forward
    case backward
}

func mod(_ a: Int, _ n: Int) -> Int {
    // https://stackoverflow.com/questions/41180292/negative-number-modulo-in-swift
    precondition(n > 0, "modulus must be positive")
    let r = a % n
    return r >= 0 ? r : r + n
}

class SafariExtensionHandler: SFSafariExtensionHandler {
    override func messageReceived(withName messageName: String, from page: SFSafariPage, userInfo: [String: Any]?) {
        guard let action = ActionType(rawValue: messageName) else {
            NSLog("Received message with unsupported type: \(messageName)")
            return
        }

        NSLog("Received message: \(messageName)")
        switch action {
        case .openLinkInTab:
            let url = URL(string: userInfo?["url"] as! String)
            openInNewTab(url: url!)
        case .openNewTab:
            openNewTab()
        case .tabForward:
            changeTab(withDirection: .forward, from: page)
        case .tabBackward:
            changeTab(withDirection: .backward, from: page)
        case .closeTab:
            closeTab(from: page)
        }
    }

    func openInNewTab(url: URL) {
        SFSafariApplication.getActiveWindow { activeWindow in
            activeWindow?.openTab(with: url, makeActiveIfPossible: false, completionHandler: { _ in
                // Perform some action here after the page loads
            })
        }
    }

    func openNewTab() {
        // Ideally this URL would be something that represents an empty tab better than localhost
        let url = URL(string: "http://localhost")!
        SFSafariApplication.getActiveWindow { activeWindow in
            activeWindow?.openTab(with: url, makeActiveIfPossible: true, completionHandler: { _ in
                // Perform some action here after the page loads
            })
        }
    }

    func changeTab(withDirection direction: TabDirection, from page: SFSafariPage, completionHandler: (() -> Void)? = nil ) {
        page.getContainingTab(completionHandler: { currentTab in
            currentTab.getContainingWindow(completionHandler: { window in
                window?.getAllTabs(completionHandler: { tabs in
                    if let currentIndex = tabs.firstIndex(of: currentTab) {
                        let indexStep = direction == TabDirection.forward ? 1 : -1

                        // Wrap around the ends with a modulus operator.
                        // % calculates the remainder, not the modulus, so we need a
                        // custom function.
                        let newIndex = mod(currentIndex + indexStep, tabs.count)
    
                        tabs[newIndex].activate(completionHandler: completionHandler ?? {})
                        
                    }
                })
            })
        })
    }
    
    func closeTab(from page: SFSafariPage) {
        page.getContainingTab {
            tab in
            tab.close()
        }
    }

    override func toolbarItemClicked(in _: SFSafariWindow) {
        // This method will be called when your toolbar item is clicked.
        NSLog("The extension's toolbar item was clicked")
        NSWorkspace.shared.launchApplication("Vimari")
    }

    override func validateToolbarItem(in _: SFSafariWindow, validationHandler: @escaping ((Bool, String) -> Void)) {
        // This is called when Safari's state changed in some way that would require the extension's toolbar item to be validated again.
        validationHandler(true, "")
    }

    override func popoverViewController() -> SFSafariExtensionViewController {
        return SafariExtensionViewController.shared
    }
}
