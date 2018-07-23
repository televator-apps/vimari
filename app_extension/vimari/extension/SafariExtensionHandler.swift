//
//  SafariExtensionHandler.swift
//  extension
//
//  Created by Simon on 2018-07-13.
//  Copyright © 2018 vimari. All rights reserved.
//

import SafariServices

class SafariExtensionHandler: SFSafariExtensionHandler {
    
    enum MessageType: String {
        case openLinkInTab
        case openNewTab
    }
    
    override func messageReceived(withName messageName: String, from page: SFSafariPage, userInfo: [String : Any]?) {
        switch messageName {
        case MessageType.openLinkInTab.rawValue:
            let url = URL(string: userInfo?["url"] as! String)
            openInNewTab(url: url!)
            break
        case MessageType.openNewTab.rawValue:
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
