import Cocoa
import SafariServices.SFSafariApplication

class ViewController: NSViewController {

    @IBOutlet var appNameLabel: NSTextField!
    @IBOutlet var extensionStatus: NSTextField!
    @IBOutlet var spinner: NSProgressIndicator!
    
    func refreshExtensionStatus () {
        NSLog("Refreshing extension status")
        self.spinner.startAnimation(self)
        self.extensionStatus.stringValue = "Checking extension status"
        
        if SFSafariServicesAvailable() {
            SFSafariExtensionManager.getStateOfSafariExtension(withIdentifier: "net.televator.Vimari.SafariExtension") {
                (state, error) in
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
            self.extensionStatus.stringValue = "Unavailable, Vimari requires Safari 10 or greater."
            self.spinner.stopAnimation(self)
        }
    }
    
    @IBAction func refreshButton(_ sender: NSButton) {
        refreshExtensionStatus()
    }
    
    override func viewDidLoad() {
        super.viewDidLoad();
        self.appNameLabel.stringValue = "Vimari";
        
        
        refreshExtensionStatus();
    }
    
    @IBAction func openSafariExtensionPreferences(_ sender: AnyObject?) {
        SFSafariApplication.showPreferencesForExtension(withIdentifier: "net.televator.Vimari.SafariExtension") { error in
            if let _ = error {
                // Insert code to inform the user that something went wrong.

            }
        }
    }

}
