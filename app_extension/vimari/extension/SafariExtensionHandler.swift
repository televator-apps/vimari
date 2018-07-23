//
//  SafariExtensionHandler.swift
//  extension
//
//  Created by Simon on 2018-07-13.
//  Copyright © 2018 vimari. All rights reserved.
//

import SafariServices

enum ActionType: String {
    case openLinkInTab
    case openNewTab
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
        default:
            NSLog("Received message with unsupported type: \(messageName)")
        }
    }
    
    func openInNewTab(url: URL) {
        SFSafariApplication.getActiveWindow { (activeWindow) in
            activeWindow?.openTab(with: url, makeActiveIfPossible: false, completionHandler: {_ in
                // Perform some action here after the page loads
            })
        }
    }
    
    func openNewTab() {
        // Ideally this URL would be something that represents an empty tab better than localhost
        let url = URL(string: "http://localhost")!
        SFSafariApplication.getActiveWindow { (activeWindow) in
            activeWindow?.openTab(with: url, makeActiveIfPossible: true, completionHandler: {_ in
                // Perform some action here after the page loads
            })
        }
    }
    
}
