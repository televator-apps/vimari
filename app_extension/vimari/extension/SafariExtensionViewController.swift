import SafariServices

class SafariExtensionViewController: SFSafariExtensionViewController {
    
    @IBOutlet weak var btnSettings: NSButton!
    
    static let shared = SafariExtensionViewController()
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    @IBAction func settingsClick(_ sender: NSButton) {
        NSWorkspace.shared.launchApplication("vimari")
    }
}
