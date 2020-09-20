//
//  SettingsMerger.swift
//  Vimari Extension
//
//  Created by Nick Belzer on 20/09/2020.
//  Copyright © 2020 net.televator. All rights reserved.
//

import Foundation

class SettingsMerger {
    /** This function merges the user settings with the default values when they are not provided by the user settings.  */
    static func mergeWithDefaults(_ settings: [String: Any], defaults: [String: Any]) -> [String: Any] {
        return settings.merging(defaults, uniquingKeysWith: solveSettingsMergeConflict)
    }

    /** Helper method for conflicts during settings merging. Recursively merges dictionaries with the preference for the first value.*/
    static private func solveSettingsMergeConflict(val: Any, defaultVal: Any) -> Any {
        if let subDictUser = val as? [String: Any], let subDictDefault = defaultVal as? [String: Any] {
            // Allow for recursive merging of nested dictionaries.
            return subDictUser.merging(subDictDefault, uniquingKeysWith: self.solveSettingsMergeConflict)
        }
        return val;
    }
}
