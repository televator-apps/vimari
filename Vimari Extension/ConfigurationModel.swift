//
//  ConfigurationModel.swift
//  Vimari Extension
//
//  Created by Daniel Mendez on 12/15/19.
//  Copyright © 2019 net.televator. All rights reserved.
//

protocol ConfigurationModelProtocol {
    func editConfigFile() throws
    func resetConfigFile() throws
    func getDefaultSettings() throws -> [String: Any]
    func getUserSettings() throws -> [String : Any]
}

import Foundation
import SafariServices

class ConfigurationModel: ConfigurationModelProtocol {
    
    private enum Constant {
        static let settingsFileName = "defaultSettings"
        static let userSettingsFileName = "userSettings"
        static let defaultEditor = "TextEdit"
    }

    let userSettingsUrl: URL = FileManager.documentDirectoryURL
        .appendingPathComponent(Constant.userSettingsFileName)
        .appendingPathExtension("json")
    
    func editConfigFile() throws {
        let settingsFilePath = try findOrCreateUserSettings()
        openFileInPreferredEditor(filePath: settingsFilePath)
    }
    
    func resetConfigFile() throws {
        let settingsFilePath = try overwriteUserSettings()
        openFileInPreferredEditor(filePath: settingsFilePath)
    }

    func openFileInPreferredEditor(filePath: String) {
        let fileUrl = URL(fileURLWithPath: filePath)
        let app = NSWorkspace.shared.urlForApplication(toOpen: fileUrl)

        if #available(OSXApplicationExtension 10.15, *), let app = app {
            NSLog("opening \(fileUrl) with \(String(describing: app))")

            let config = NSWorkspace.OpenConfiguration()
            config.promptsUserIfNeeded = true

            NSWorkspace.shared.open([fileUrl], withApplicationAt: app, configuration: config, completionHandler: nil)
        } else {
            // Fallback on earlier versions
            NSWorkspace.shared.openFile(
                filePath,
                withApplication: Constant.defaultEditor
            )
        }
    }
    
    func getDefaultSettings() throws -> [String : Any] {
        return try loadSettings(fromFile: Constant.settingsFileName)
    }
    
    func getUserSettings() throws -> [String : Any] {
        let userFilePath = try findOrCreateUserSettings()
        let urlSettingsFile = URL(fileURLWithPath: userFilePath)
        let settingsData = try Data(contentsOf: urlSettingsFile)
        return try settingsData.toJSONObject()
    }
    
    private func loadSettings(fromFile file: String) throws -> [String : Any] {
        let settingsData = try Bundle.main.getJSONData(from: file)
        return try settingsData.toJSONObject()
    }
    
    private func findOrCreateUserSettings() throws -> String {
        let url = userSettingsUrl
        let urlString = url.path
        if FileManager.default.fileExists(atPath: urlString) {
            return urlString
        }
        let data = try Bundle.main.getJSONData(from: Constant.settingsFileName)
        try data.write(to: url)
        return urlString
    }
    
    private func overwriteUserSettings() throws -> String {
        let url = userSettingsUrl
        let urlString = userSettingsUrl.path
        let data = try Bundle.main.getJSONData(from: Constant.settingsFileName)
        try data.write(to: url)
        return urlString
    }
}

enum DataError: Error {
    case unableToParse
    case notFound
}

private extension Data {
    func toJSONObject() throws -> [String: Any] {
        let serialized = try JSONSerialization.jsonObject(with: self, options: [])
        guard let result = serialized as? [String: Any] else {
            throw DataError.unableToParse
        }
        return result
    }
}

private extension Bundle {
    func getJSONPath(for file: String) throws -> String {
        guard let result = self.path(forResource: file, ofType: ".json") else {
            throw DataError.notFound
        }
        return result
    }
    
    func getJSONData(from file: String) throws -> Data {
        let settingsPath = try self.getJSONPath(for: file)
        let urlSettingsFile = URL(fileURLWithPath: settingsPath)
        return try Data(contentsOf: urlSettingsFile)
    }
}

private extension FileManager {
    static var documentDirectoryURL: URL {
        let documentDirectoryURL = try! FileManager.default.url(for: .applicationSupportDirectory, in: .userDomainMask, appropriateFor: nil, create: false)
        return documentDirectoryURL
    }
}
