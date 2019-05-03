//
//  SafariExtensionHandler.swift
//  extension
//
//  Created by simeg on 2018-07-13.
//  Copyright © 2018 vimari. All rights reserved.
//

import SafariServices

enum ActionType: String {
    case openLinkInTab
    case openNewTab
    case closeTab
}

class SafariExtensionHandler: SFSafariExtensionHandler {

    override func messageReceived(withName messageName: String, from page: SFSafariPage, userInfo: [String : Any]?) {
        switch messageName {
        case ActionType.openLinkInTab.rawValue:
            let url = URL(string: userInfo?["url"] as! String)
            openInNewTab(url: url!)
            break
        case ActionType.openNewTab.rawValue:
            openNewTab()
            break
        case ActionType.closeTab.rawValue:
            closeTab()
            break
        default:
            NSLog("Received message with unsupported type: \(messageName)")
        }
    }
    
    func openInNewTab(url: URL) {
        SFSafariApplication.getActiveWindow(completionHandler: {
            $0?.openTab(with: url, makeActiveIfPossible: false, completionHandler: {_ in
                // Perform some action here after the page loads
            })
        })
    }
    
    func openNewTab() {
        // Ideally this URL would be something that represents an empty tab better than localhost
        let url = URL(string: "http://localhost")!
        SFSafariApplication.getActiveWindow(completionHandler: {
            $0?.openTab(with: url, makeActiveIfPossible: true, completionHandler: {_ in
                // Perform some action here after the page loads
            })
        })
    }
    
    func closeTab() {
        SFSafariApplication.getActiveWindow { (window) in
            window?.getActiveTab(completionHandler: { (tab) in
                tab?.close()
            })
        }
    }

    override func toolbarItemClicked(in window: SFSafariWindow) {
        // This method will be called when your toolbar item is clicked.
        NSLog("The extension's toolbar item was clicked")
    }
    
    override func validateToolbarItem(in window: SFSafariWindow, validationHandler: @escaping ((Bool, String) -> Void)) {
        // This is called when Safari's state changed in some way that would require the extension's toolbar item to be validated again.
        validationHandler(true, "")
    }
    
    override func popoverViewController() -> SFSafariExtensionViewController {
        return SafariExtensionViewController.shared
    }
}
