const wrapperSelector = "div.search-result__wrapper";
const linkSelector = "div.search-result__info>a.search-result__result-link";
const imageSelector = "div.search-result__image-wrapper img";

const sharedConnSelector = "div.search-result__social-proof";

const nextBtnSelector =
    "button.artdeco-pagination__button.artdeco-pagination__button--next";

const conBtnSelector = "button.pv-s-profile-actions--connect";
const moreConBtnSelector =
    "li>div>.artdeco-dropdown__item.pv-s-profile-actions--connect";
const moreBtnSelector =
    'button.pv-s-profile-actions__overflow-toggle.artdeco-button.artdeco-button--2[aria-expanded="false"]';

const customMSGSelector = "textarea.send-invite__custom-message";
const addNoteBtnSelector = 'button.artdeco-button[aria-label="Add a note"]';
const inviteBtnSelector = 'button.artdeco-button[aria-label="Send now"]';
const doneBtnSelector = 'button.artdeco-button[aria-label="Done"]';
const sendInvitationBtnSelector =
    'button.artdeco-button[aria-label="Send Invitation"]';

export const getPeopleFromSearchPage = config => {
    var wrappers = Array.from(document.querySelectorAll(wrapperSelector));
    const filtered = wrappers
        .filter(wrapper => {
            const shardConn = config.includeMutual
                ? true
                : !wrapper.querySelector(sharedConnSelector);
            const image = config.includePhoto
                ? true
                : wrapper.querySelector(imageSelector);
            // console.log(wrapper.querySelector(imageSelector));
            return (
                image &&
                shardConn &&
                !wrapper
                    .querySelector(linkSelector)
                    .classList.contains("disabled")
            );
        })
        .map(item => {
            const link = item.querySelector(linkSelector);
            const image = item.querySelector(imageSelector);
            return {
                url: link.getAttribute("href"),
                name: link.querySelector(".name-and-distance>.name").innerHTML,
                image: image ? image.getAttribute("src") : null
            };
        });

    console.log("~~~~~~~~~~~~ filtered peoples", filtered);

    return filtered;
};

export const delay = interval => {
    return new Promise(resolve => setTimeout(resolve, interval));
};

export const invitePeople = msg => {
    return new Promise(async (resolve, reject) => {
        try {
            await delay(10 * 1000);

            // if invitation is pending
            if (
                document.documentElement.innerHTML.indexOf(
                    "invitation has been sent to"
                ) != -1 ||
                document.documentElement.innerHTML.indexOf(
                    "Remove Connection"
                ) != -1
            ) {
                console.log("~~~~~ Already invited! ~~~~~");
                return resolve(false);
            }

            // connect button
            let connectButton = querySelector(conBtnSelector);
            if (!connectButton) {
                //more connect button
                connectButton = querySelector(moreConBtnSelector);
                if (!connectButton) {
                    console.log("~~~~~ Could not found connect button ~~~~~");
                    return resolve(false);
                }
            }
            connectButton.click();
            await delay(1 * 1000);
            if (!msg || msg == "" || msg == " ") {
                querySelector(inviteBtnSelector).click();
            } else {
                // custom message
                let customMSGEle = querySelector(customMSGSelector);
                if (!customMSGEle) {
                    // addnote button
                    const addNoteButton = querySelector(addNoteBtnSelector);
                    if (!addNoteButton) {
                        console.log(
                            "~~~~~ Could not found Add note button ~~~~~"
                        );
                        return resolve(false);
                    }
                    addNoteButton.click();
                    await delay(1 * 1000);
                    customMSGEle = querySelector(customMSGSelector);
                }
                customMSGEle.value = msg;
                var evt = document.createEvent("Events"); //Add change event in textarea
                evt.initEvent("change", true, true);
                customMSGEle.dispatchEvent(evt);
                await delay(1 * 1000);
                // invite button
                if (querySelector(doneBtnSelector)) {
                    querySelector(doneBtnSelector).click();
                } else if (querySelector(sendInvitationBtnSelector)) {
                    querySelector(sendInvitationBtnSelector).click();
                }
            }

            return resolve(true);
        } catch (err) {
            resolve(false);
        }
    });
};

export const querySelector = selector => {
    return document.querySelector(selector);
};

export const nextSearchPage = () => {
    querySelector(nextBtnSelector).click();
};

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
