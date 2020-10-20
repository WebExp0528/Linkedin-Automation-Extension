/**
 * Get Search Results
 *
 * @param {HTMLElement} parent
 */
export const getSearchResultWrappers = (parent = document) => {
    const wrapperSelector = `li>div.ember-view[class*="-result"]`;
    return Array.from(parent.querySelectorAll(wrapperSelector));
};

/**
 * Check if people has shared connections
 *
 * @param {HTMLElement} parent
 */
export const isSharedConnection = (parent = document) => {
    return parent.innerHTML.indexOf("shared connection") !== -1;
};

/**
 * Get Profile image
 *
 * @param {HTMLElement} parent
 */
export const getImage = (parent = document) => {
    const imageSelector = "div.ivm-image-view-model.ember-view img";
    return parent.querySelector(imageSelector);
};

/**
 * Get Profile Link element
 *
 * @param {HTMLElement} parent
 */
export const getProfileLink = (parent = document) => {
    const linkSelector = "a.ember-view";
    return parent.querySelector(linkSelector);
};

export const delay = interval => {
    return new Promise(resolve => setTimeout(resolve, interval));
};

/**
 * Check if is invited already
 *
 * @param {HTMLElement} parent
 */
export const isInvited = (parent = document) => {
    return (
        parent.documentElement.innerHTML.indexOf(
            "invitation has been sent to"
        ) != -1 ||
        parent.documentElement.innerHTML.indexOf("Remove Connection") != -1
    );
};

/**
 * Get ConnectButton
 *
 * @param {HTMLElement} parent
 */
export const getConnectBtn = (parent = document) => {
    const conBtnSelector = "button.pv-s-profile-actions--connect";
    const moreConBtnSelector =
        "li>div>.artdeco-dropdown__item.pv-s-profile-actions--connect";
    return (
        parent.querySelector(conBtnSelector) ||
        parent.querySelector(moreConBtnSelector)
    );
};

/**
 * Get Custom Message View Element
 *
 * @param {HTMLElement} parent
 */
export const getCustomMessageView = (parent = document) => {
    const customMSGSelector = "textarea.send-invite__custom-message";
    return parent.querySelector(customMSGSelector);
};

/**
 * Get Add Note Button Element
 *
 * @param {HTMLElement} parent
 */
export const getAddNoteBtn = (parent = document) => {
    const addNoteBtnSelector = 'button.artdeco-button[aria-label="Add a note"]';
    return parent.querySelector(addNoteBtnSelector);
};

/**
 * Get Invite Button Element
 *
 * @param {HTMLElement} parent
 */
export const getInviteBtn = (parent = document) => {
    const inviteBtnSelector = 'button.artdeco-button[aria-label="Send now"]';
    const inviteBtnSelector1 = 'button.artdeco-button[aria-label="Done"]';
    const inviteBtnSelector2 =
        'button.artdeco-button[aria-label="Send Invitation"]';
    return (
        parent.querySelector(inviteBtnSelector) ||
        parent.querySelector(inviteBtnSelector1) ||
        parent.querySelector(inviteBtnSelector2)
    );
};

/**
 * Get peoples from search page
 *
 * @param {{includeMutual:boolean, includePhoto:boolean}} config
 */
export const getPeopleFromSearchPage = config => {
    var wrappers = getSearchResultWrappers();
    const filtered = wrappers
        .filter(wrapper => {
            const shardConn = config.includeMutual
                ? true
                : !isSharedConnection(wrapper);
            const image = config.includePhoto ? true : getImage(wrapper);
            return (
                image &&
                shardConn &&
                !getProfileLink(wrapper).classList.contains("disabled")
            );
        })
        .map(item => {
            const link = getProfileLink(item);
            const image = getImage(item);
            return {
                url: link.getAttribute("href"),
                name: "",
                image: image ? image.getAttribute("src") : null
            };
        });

    console.log("~~~~~~~~~~~~ filtered peoples", filtered);
    return filtered;
};

/**
 * Invite People
 *
 * @param {string} msg Invitation Message
 */
export const invitePeople = msg => {
    return new Promise(async (resolve, reject) => {
        try {
            await delay(10 * 1000); // Delay for 10 seconds

            // if invitation is pending
            if (isInvited()) {
                console.log("~~~~~ Already invited! ~~~~~");
                return resolve(false);
            }

            // connect button
            let connectButton = getConnectBtn();
            if (!connectButton) {
                console.log("~~~~~ Could not found connect button ~~~~~");
                return resolve(false);
            }
            connectButton.click(); // Click connect button

            await delay(1 * 1000); // Delay for 1 second

            if (msg) {
                // custom message
                let customMSGEle = getCustomMessageView();
                if (!customMSGEle) {
                    // Click Add Note button if customMessageView non exist
                    const addNoteButton = getAddNoteBtn();
                    if (!addNoteButton) {
                        return resolve(false);
                    }
                    addNoteButton.click();
                    await delay(1 * 1000);
                    customMSGEle = getCustomMessageView();
                }

                //Insert message in customMessageView
                customMSGEle.value = msg;
                var evt = document.createEvent("Events"); // Add change event in textarea
                evt.initEvent("change", true, true);
                customMSGEle.dispatchEvent(evt);

                await delay(1 * 1000); // Delay for 1 seconds
            }
            // Click Invite Button
            const inviteBtn = getInviteBtn();
            console.log(`~~~~ inviteBtn`, inviteBtn);
            if (!inviteBtn) {
                return resolve(false);
            }
            inviteBtn.click();

            await delay(1 * 1000); // Delay for 1 seconds

            return resolve(true);
        } catch (err) {
            resolve(false);
        }
    });
};

/**
 * Get Element from parent
 *
 * @param {string} selector
 * @param {HTMLElement} parent
 */
export const querySelector = (selector, parent = document) => {
    return parent.querySelector(selector);
};

/**
 * Click Next page button
 */
export const nextSearchPage = () => {
    const nextBtnSelector =
        "button.artdeco-pagination__button.artdeco-pagination__button--next";
    querySelector(nextBtnSelector).click();
};

/**
 * Create LocalStorage Instance
 *
 * @param {*} storageProp
 */
export const createLocalStorageAccess = storageProp => {
    const propId = `linkedinAutomation___${storageProp}`;
    return {
        clear: async () => {
            localStorage.removeItem(propId);
        },
        get: () => {
            const dataLocal = localStorage.getItem(propId);
            return dataLocal ? JSON.parse(dataLocal) : {};
        },
        set: data => {
            localStorage.setItem(
                propId,
                JSON.stringify({
                    storage: {
                        updated_at: new Date().toISOString()
                    },
                    ...data
                })
            );
        }
    };
};

export const pageScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        return;
    }
    window.scrollBy(0, 10);
    setTimeout(pageScroll, 10);
};

export const changeDisplayStatusPanel = status => {
    const panel = querySelector(".linkedin-extension-panel");
    panel.setAttribute("style", `display:${status ? "block" : "none"}`);
};

export default createLocalStorageAccess;
