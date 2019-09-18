// Function to handle messages... all messages are sent to this function
function handleMessage(msg) {
    // Attempt to call a function with the same name as the message name
    switch (msg.name) {
        case 'getSettings' :
            getSettings(msg);
            break;
        case 'openTab' :
            openTab();
            break;
        case 'closeTab':
            closeTab(msg.message);
            break;
        case 'changeTab' :
            changeTab(msg.message);
            break;
    }
}

// Dispatch a message to a tab's page or reader view
function dispatchMessage(target, name, message) {
    if (target) {
        // Do some checks on the target to make sure we aren't trying to send a
        // message to inaccessible tabs (e.g. Top Sites)
        if (target.page && typeof target.page.dispatchMessage === "function") {
            target.page.dispatchMessage(name, message);
        } else if (typeof target.dispatchMessage === "function") {
            target.dispatchMessage(name, message);
        }
    }
}

// Pass the settings on to the injected script
function getSettings(event) {
    var settings = {
        'linkHintCharacters': safari.extension.settings.linkHintCharacters,
        'hintToggle': safari.extension.settings.hintToggle,
        'newTabHintToggle': safari.extension.settings.newTabHintToggle,
        'tabForward': safari.extension.settings.tabForward,
        'tabBack': safari.extension.settings.tabBack,
        'scrollDown': safari.extension.settings.scrollDown,
        'scrollUp': safari.extension.settings.scrollUp,
        'scrollLeft': safari.extension.settings.scrollLeft,
        'scrollRight': safari.extension.settings.scrollRight,
        'goBack': safari.extension.settings.goBack,
        'goForward': safari.extension.settings.goForward,
        'reload': safari.extension.settings.reload,
        'scrollDownHalfPage': safari.extension.settings.scrollDownHalfPage,
        'scrollUpHalfPage': safari.extension.settings.scrollUpHalfPage,
        'goToPageBottom': safari.extension.settings.goToPageBottom,
        'goToPageTop': safari.extension.settings.goToPageTop,
        'closeTab': safari.extension.settings.closeTab,
        'closeTabReverse': safari.extension.settings.closeTabReverse,
        'openTab': safari.extension.settings.openTab,
        'modifier': safari.extension.settings.modifier,
        'scrollSize': safari.extension.settings.scrollSize,
        'excludedUrls': safari.extension.settings.excludedUrls,
        'detectByCursorStyle': safari.extension.settings.detectByCursorStyle
    };

    dispatchMessage(event.target, 'setSettings', settings);
}

/*
 * Changes to the next avail tab
 *
 * dir - 1 forwards, 0 backwards
 */
function changeTab(dir) {
    var tabs = safari.application.activeBrowserWindow.tabs,
        i;

    for (i = 0; i < tabs.length; i++) {
        if (tabs[i] === safari.application.activeBrowserWindow.activeTab) {
            if (dir === 1) {
                if ((i + 1) === tabs.length) {
                    tabs[0].activate();
                } else {
                    tabs[i + 1].activate();
                }
            } else {
                if (i === 0) {
                    tabs[tabs.length - 1].activate();
                } else {
                    tabs[i - 1].activate();
                }
            }
            return;
        }
    }
}

/*
 * Closes to current tab
 *
 * dir - 1 forwards, 0 backwards
 */
function closeTab(dir) {
    var tab = safari.application.activeBrowserWindow.activeTab;
    changeTab(dir);
    tab.close();
}

/*
 * Opens a new tab
 */
function openTab() {
    var win = safari.application.activeBrowserWindow;
    win.openTab();
}

/*
 * Get the active tab
 *
 */
function getActiveTab() {
    var tabs = safari.application.activeBrowserWindow.tabs,
        i;

    for (i = 0; i < tabs.length; i++) {
        if (tabs[i] === safari.application.activeBrowserWindow.activeTab) {
            return i;
        }
    }
}

/*
 * Disable extension on non active tabs,
 * enable on active tab
 *
 * Need to do it in 2 seperate loops to make sure all tabs are disabled first
 */
function activateTab() {
    var tabs = safari.application.activeBrowserWindow.tabs,
        i;

    for (i = 0; i < tabs.length; i++) {
        dispatchMessage(safari.application.activeBrowserWindow.tabs[i], 'setActive', false);
    }

    for (i = 0; i < tabs.length; i++) {
        if (tabs[i] === safari.application.activeBrowserWindow.activeTab) {
            dispatchMessage(safari.application.activeBrowserWindow.tabs[i], 'setActive', true);
        }
    }

}

safari.application.addEventListener('message', handleMessage, false);

// Need to detect if a new tab becomes active and if so, reload the extension
safari.application.addEventListener('activate', function (event) {
    activateTab();
    getSettings(event);
}, true);
