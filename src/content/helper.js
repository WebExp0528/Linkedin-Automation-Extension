export const getPeopleFromSearchPage = () => {
    var wrapperSelector = "div.search-result__wrapper";
    var linkSelector = "div.search-result__info>a.search-result__result-link";

    var sharedConnSelector = "div.search-result__social-proof";

    var wrappers = Array.from(document.querySelectorAll(wrapperSelector));
    const filtered = wrappers
        .filter(wrapper => {
            return (
                !wrapper.querySelector(sharedConnSelector) &&
                !wrapper
                    .querySelector(linkSelector)
                    .classList.contains("disabled")
            );
        })
        .map(item => {
            const link = item.querySelector(linkSelector);
            return {
                url: link.getAttribute("href"),
                name: link.querySelector(".name-and-distance>.name").innerHTML
            };
        });
    console.log("~~~~~filtered peoples~~~~~", filtered);
    return filtered;
};

export const delay = interval => {
    return new Promise(resolve => setTimeout(resolve, interval));
};

export const invitePeople = msg => {
    // if invitation is pending
    if (
        document.documentElement.innerHTML.indexOf(
            "invitation has been sent to"
        ) != -1 ||
        document.documentElement.innerHTML.indexOf("Remove Connection") != -1
    ) {
        return false;
    }

    let conBtnSelector = "button.pv-s-profile-actions--connect";
    let connectButton = querySelector(conBtnSelector);
    if (!connectButton) {
        const moreBtnSelector =
            'button.pv-s-profile-actions__overflow-toggle.artdeco-button.artdeco-button--2[aria-expanded="false"]';
        const moreButton = querySelector(moreBtnSelector);
        if (!moreButton) {
            return false;
        }
        moreButton.click();

        conBtnSelector =
            "li>div>artdeco-dropdown-item.pv-s-profile-actions.pv-s-profile-actions--connect.pv-s-profile-actions__overflow-button";

        connectButton = querySelector(conBtnSelector);
        if (!connectButton) {
            return false;
        }
    }
    connectButton.click();

    const addNoteBtnSelector =
        'button.artdeco-button.artdeco-button--muted.artdeco-button--3.artdeco-button--secondary.ember-view[aria-label="Add a note"]';
    const addNoteButton = querySelector(addNoteBtnSelector);
    if (!addNoteButton) return false;
    addNoteButton.click();

    const customMSGSelector = "textarea.send-invite__custom-message";
    document.querySelector(customMSGSelector).value = msg;

    const invitBtnSelector =
        'button.artdeco-button.artdeco-button--3[aria-label="Send invitation"]';
    document.querySelector(invitBtnSelector).click();
    return true;
};

export const querySelector = selector => {
    return document.querySelector(selector);
};

export const nextSearchPage = () => {
    const nextBtnSelector =
        "button.artdeco-pagination__button.artdeco-pagination__button--next";
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

export default createLocalStorageAccess;
