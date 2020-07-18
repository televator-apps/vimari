import SafariServices

enum ActionType: String {
    case openLinkInTab
    case openNewTab
    case tabForward
    case tabBackward
    case closeTab
    case updateSettings
}

enum InputAction: String {
    case openSettings
    case resetSettings
}

enum TabDirection: String {
    case forward
    case backward
}

class SafariExtensionHandler: SFSafariExtensionHandler {
    
    private enum Constant {
        static let mainAppName = "Vimari"
        static let newTabPageURL = "https://duckduckgo.com" //Try it :D
    }
    
    let configuration: ConfigurationModelProtocol = ConfigurationModel()
    
    //MARK: Overrides
    
    override func messageReceivedFromContainingApp(withName messageName: String, userInfo: [String : Any]? = nil) {
        do {
            switch InputAction(rawValue: messageName) {
            case .openSettings:
                try configuration.editConfigFile()
            case .resetSettings:
                try configuration.resetConfigFile()
            default:
                NSLog("Input not supported " + messageName)
            }
        } catch {
            NSLog(error.localizedDescription)
        }

    }
    
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
        case .updateSettings:
            updateSettings()
        }
    }

    override func toolbarItemClicked(in _: SFSafariWindow) {
        // This method will be called when your toolbar item is clicked.
        NSLog("The extension's toolbar item was clicked")
        NSWorkspace.shared.launchApplication(Constant.mainAppName)
    }

    override func validateToolbarItem(in _: SFSafariWindow, validationHandler: @escaping ((Bool, String) -> Void)) {
        // This is called when Safari's state changed in some way that would require the extension's toolbar item to be validated again.
        validationHandler(true, "")
    }

    override func popoverViewController() -> SFSafariExtensionViewController {
        return SafariExtensionViewController.shared
    }
    
    // MARK: Tabs Methods
    
    private func openInNewTab(url: URL) {
        SFSafariApplication.getActiveWindow { activeWindow in
            activeWindow?.openTab(with: url, makeActiveIfPossible: false, completionHandler: { _ in
                // Perform some action here after the page loads
            })
        }
    }

    private func openNewTab() {
        // Ideally this URL would be something that represents an empty tab better than localhost
        let url = URL(string: Constant.newTabPageURL)!
        SFSafariApplication.getActiveWindow { activeWindow in
            activeWindow?.openTab(with: url, makeActiveIfPossible: true, completionHandler: { _ in
                // Perform some action here after the page loads
            })
        }
    }

    private func changeTab(withDirection direction: TabDirection, from page: SFSafariPage, completionHandler: (() -> Void)? = nil ) {
        page.getContainingTab() { currentTab in
            // Using .currentWindow instead of .containingWindow, this prevents the window being nil in the case of a pinned tab.
            self.currentWindow(from: page) { window in
                window?.getAllTabs() { tabs in
                    tabs.forEach { tab in NSLog(tab.description) }
                    if let currentIndex = tabs.firstIndex(of: currentTab) {
                        let indexStep = direction == TabDirection.forward ? 1 : -1

                        // Wrap around the ends with a modulus operator.
                        // % calculates the remainder, not the modulus, so we need a
                        // custom function.
                        let newIndex = mod(currentIndex + indexStep, tabs.count)

                        tabs[newIndex].activate(completionHandler: completionHandler ?? {})

                    }
                }
            }
        }
    }

    /**
     Returns the containing window of a SFSafariPage, if not available default to the current active window.
     */
    private func currentWindow(from page: SFSafariPage, completionHandler: @escaping ((SFSafariWindow?) -> Void)) {
        page.getContainingTab() { $0.getContainingWindow() { window in
            if window != nil {
                return completionHandler(window)
            } else {
                SFSafariApplication.getActiveWindow() { window in
                    return completionHandler(window)
                }
            }
        }}
    }
    
    private func closeTab(from page: SFSafariPage) {
        page.getContainingTab {
            tab in
            tab.close()
        }
    }
    
    // MARK: Settings
    
    private func updateSettings() {
        do {
            let settings: [String: Any]
            if let userSettings = try? configuration.getUserSettings() {
                settings = userSettings
            } else {
                settings = try configuration.getSettings()
            }
            SFSafariApplication.getActivePage {
                $0?.dispatch(settings: settings)
            }
        } catch {
            NSLog(error.localizedDescription)
        }
    }
    
    private func fallbackSettings() {
        do {
            let settings = try configuration.getUserSettings()
            SFSafariApplication.getActivePage {
                $0?.dispatch(settings: settings)
            }
        } catch {
            NSLog(error.localizedDescription)
        }
    }
}

// MARK: Helpers

private func mod(_ a: Int, _ n: Int) -> Int {
    // https://stackoverflow.com/questions/41180292/negative-number-modulo-in-swift
    precondition(n > 0, "modulus must be positive")
    let r = a % n
    return r >= 0 ? r : r + n
}

private extension SFSafariPage {
    func dispatch(settings: [String: Any]) {
        self.dispatchMessageToScript(
            withName: "updateSettingsEvent",
            userInfo: settings
        )
    }
}

private extension SFSafariApplication {
    static func getActivePage(completionHandler: @escaping (SFSafariPage?) -> Void) {
        SFSafariApplication.getActiveWindow {
            $0?.getActiveTab {
                $0?.getActivePage(completionHandler: completionHandler)
            }
        }
    }
}

