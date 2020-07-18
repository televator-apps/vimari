import Cocoa
import SafariServices.SFSafariApplication
import OSLog

class ViewController: NSViewController {
    @IBOutlet var extensionStatus: NSTextField!
    @IBOutlet var spinner: NSProgressIndicator!
    
    private enum Constant {
        static let extensionIdentifier = "net.televator.Vimari.SafariExtension"
        static let openSettings = "openSettings"
        static let resetSettings = "resetSettings"
    }

    func refreshExtensionStatus() {
        NSLog("Refreshing extension status")
        spinner.startAnimation(self)
        extensionStatus.stringValue = "Checking extension status"

        if SFSafariServicesAvailable() {
            SFSafariExtensionManager.getStateOfSafariExtension(
            withIdentifier: Constant.extensionIdentifier) {
                state, error in
                print("State", state as Any, "Error", error as Any, state?.isEnabled as Any)

                DispatchQueue.main.async {
                    // TODO: handle this getting updated in the Safari preferences too.
                    if let state = state {
                        if state.isEnabled {
                            self.extensionStatus.stringValue = "Enabled"
                        } else {
                            self.extensionStatus.stringValue = "Disabled"
                        }
                    }
                    if let error = error {
                        NSLog("Error", error.localizedDescription)
                        self.extensionStatus.stringValue = error.localizedDescription
                    }
                    self.spinner.stopAnimation(self)
                }
            }
        } else {
            NSLog("SFSafariServices not available")
            extensionStatus.stringValue = "Unavailable, Vimari requires Safari 10 or greater."
            spinner.stopAnimation(self)
        }
    }

    @IBAction func refreshButton(_: NSButton) {
        refreshExtensionStatus()
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        refreshExtensionStatus()
    }

    @IBAction func openSafariExtensionPreferences(_: AnyObject?) {
        SFSafariApplication.showPreferencesForExtension(
            withIdentifier: Constant.extensionIdentifier) { error in
            if let _ = error {
                // Insert code to inform the user that something went wrong.
            }
        }
    }
    
    @IBAction func openSettingsAction(_ sender: Any) {
        dispatchOpenSettings()
    }
    
    @IBAction func resetSettingsAction(_ sender: Any) {
        dispatchResetSettings()
    }
    
    func dispatchOpenSettings() {
        SFSafariApplication.dispatchMessage(
            withName: Constant.openSettings,
            toExtensionWithIdentifier: Constant.extensionIdentifier,
            userInfo: nil) { (error) in
                if let error = error {
                    print(error.localizedDescription)
                }
        }
    }
    
    func dispatchResetSettings() {
        SFSafariApplication.dispatchMessage(
            withName: Constant.resetSettings,
            toExtensionWithIdentifier: Constant.extensionIdentifier,
            userInfo: nil) { (error) in
                if let error = error {
                    print(error.localizedDescription)
                }
        }
    }
}
