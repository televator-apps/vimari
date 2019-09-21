import Cocoa
import SafariServices.SFSafariApplication

class ViewController: NSViewController {

    @IBOutlet var appNameLabel: NSTextField!
    @IBOutlet var extensionStatus: NSTextField!
    @IBOutlet var spinner: NSProgressIndicator!
    
    func refreshExtensionStatus () {
        self.spinner.startAnimation(self)
        self.extensionStatus.stringValue = "Checking extension status"
        
        if SFSafariServicesAvailable() {
            SFSafariExtensionManager.getStateOfSafariExtension(withIdentifier: "net.televator.Vimari-Extension") {
                (state, error) in
//                print(state as Any, error as Any, state?.isEnabled as Any)
                
                DispatchQueue.main.async {
                    // TODO: handle this getting updated in the Safari preferences too.
                    if let state = state {
                        if state.isEnabled {
                            self.extensionStatus.stringValue = "enabled"
                        } else {
                            self.extensionStatus.stringValue = "disabled"
                        }
                    }
                    self.spinner.stopAnimation(self)
                }
            }
        } else {
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
        SFSafariApplication.showPreferencesForExtension(withIdentifier: "net.televator.Vimari-Extension") { error in
            if let _ = error {
                // Insert code to inform the user that something went wrong.

            }
        }
    }

}
