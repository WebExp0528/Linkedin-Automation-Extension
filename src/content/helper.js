/**
 * Get Search Results
 *
 * @param {HTMLElement} parent
 */
export const getSearchResultWrappers = (parent = document) => {
    const wrapperSelector = `li>div.ember-view[class*="-result"]`;
    const wrapperSelector1 = `li.reusable-search__result-container`;
    return Array.from(
        parent.querySelectorAll(wrapperSelector).length > 0
            ? parent.querySelectorAll(wrapperSelector)
            : parent.querySelectorAll(wrapperSelector1).length > 0
            ? parent.querySelectorAll(wrapperSelector1)
            : []
    );
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
    const linkSelector1 = "a.app-aware-link";
    return (
        parent.querySelector(linkSelector) ||
        parent.querySelector(linkSelector1)
    );
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
export const getConnectBtn = (
    parent = document.querySelector(".pv-top-card .pvs-profile-actions")
) => {
    const conBtnSelector = 'button[data-control-name="connect"]';
    const moreConBtnSelector = 'li>div[data-control-name="connect"]';
    const conBtnEl = parent.querySelector(conBtnSelector);
    if (conBtnEl) {
        return conBtnEl;
    }

    const moreConBtnEl = parent.querySelector(moreConBtnSelector);
    if (moreConBtnEl) {
        return moreConBtnEl;
    }
};

/**
 * Get Custom Message View Element
 *
 * @param {HTMLElement} parent
 */
export const getCustomMessageView = (parent = document) => {
    const customMSGSelector1 = "textarea.send-invite__custom-message";
    const customMSGSelector2 = "textarea.ember-text-area";
    return (
        parent.querySelector(customMSGSelector1) ||
        parent.querySelector(customMSGSelector2)
    );
};

/**
 * Get Add Note Button Element
 *
 * @param {HTMLElement} parent
 */
export const getAddNoteBtn = (parent = document) => {
    const addNoteBtnSelector = 'button[aria-label="Add a note"]';
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
                return resolve(false);
            }

            // connect button
            let connectButton = getConnectBtn();
            if (!connectButton) {
                return resolve(false);
            }
            connectButton.click(); // Click connect button

            await delay(1 * 1000); // Delay for 1 second

            const modal = document.querySelector(
                'div.artdeco-modal.send-invite[role="dialog"]'
            );
            if (!modal) {
                return resolve(false);
            }

            const modalConBtn = modal.querySelector(
                'button[aria-label="Connect"]'
            );
            if (modalConBtn) {
                await delay(1 * 1000);
                modalConBtn.click();
                await delay(1 * 1000);
            }

            if (msg) {
                // custom message
                let customMSGEle = getCustomMessageView();
                if (!customMSGEle) {
                    // Click Add Note button if customMessageView non exist
                    const addNoteButton = getAddNoteBtn(modal);

                    if (!addNoteButton) {
                        return resolve(false);
                    }
                    addNoteButton.click();
                    await delay(1 * 1000);
                    customMSGEle = getCustomMessageView(modal);
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
