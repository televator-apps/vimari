//
//  SafariExtensionViewController.swift
//  Vimari Safari Extension
//
//  Created by Daniel Compton on 15/09/19.
//  Copyright © 2019 Televator. All rights reserved.
//

import SafariServices

class SafariExtensionViewController: SFSafariExtensionViewController {
    
    static let shared: SafariExtensionViewController = {
        let shared = SafariExtensionViewController()
        shared.preferredContentSize = NSSize(width:320, height:240)
        return shared
    }()

}
