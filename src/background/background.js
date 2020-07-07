import ext from "./../utils/ext";
import {
    GET_ACTIVITY,
    START,
    GET_PEOPLE_SEARCH_PAGE,
    STOP,
    INVITE_PEOPLE,
    NEXT_SEARCH_PAGE,
    MSG_SHOW_PAGE_ACTION
} from "utils/type";
import { delay, getRandomInt } from "utils/helper";

/**
 * Define content script functions
 * @type {class}
 */
class Background {
    constructor() {
        this.init();
        this._isStarted = false;
        this._invitedCount = 0;
        this._runtime = 0;
        this._searchPageTab;
        this._isLoadingPage = false;
        this._limit = 50;
        this._queuedPeoples = [];
        this._invitedPeoples = [];
    }

    /**
     * Document Ready
     * @returns {void}
     */
    init = () => {
        console.log("loaded Background Scripts");

        //When extension installed
        ext.runtime.onInstalled.addListener(this.onInstalled());

        //Add message listener in Browser.
        ext.runtime.onMessage.addListener(this.onMessage);

        //Add page action listener in browser
        ext.pageAction.onClicked.addListener(this.onClickedExtension);
    };

    //TODO: Listeners

    /**
     * Extension Installed
     */
    onInstalled = () => {
        console.log("~~~~~Installed Linkedin Extension!");
    };

    /**
     * Message Handler Function
     *
     * @param { object } message
     * @param { object } sender
     * @param { object } reply
     */
    onMessage = (message, sender, reply) => {
        console.log("~~~~~Received message", message);
        switch (message.type) {
            case GET_ACTIVITY: {
                reply({
                    runtime: this._runtime,
                    invitedCount: this._invitedCount,
                    isStarted: this._isStarted,
                    queuedPeoples: this._queuedPeoples,
                    invitedPeoples: this._invitedPeoples
                });
                break;
            }
            case START: {
                this._searchPageTab = sender.tab;
                this._isStarted = true;
                const now = new Date();
                this._runtime = now.getTime();
                this._limit = message.limit ? message.limit : 50;
                this._invitedCount = 0;
                this._invitedPeoples = [];
                this.startInvite();
                reply({ isStarted: this._isStarted });
                break;
            }

            case STOP: {
                this._searchPageTab = null;
                this._runtime = 0;
                this.stopInvite();
                reply({ isStarted: this._isStarted });
                break;
            }

            case MSG_SHOW_PAGE_ACTION: {
                ext.pageAction.setPopup({
                    tabId: sender.tab.id,
                    popup: "/popup/index.html"
                });
                ext.pageAction.show(sender.tab.id);
                reply(true);
            }
        }
        return true;
    };

    /**
     * When click extension icon
     *
     * @param {tab} tab
     */
    onClickedExtension = tab => {
        ext.pageAction.show(tab.id);
    };

    /**
     * get url from tab
     * @param {number} tabid
     */
    getURLFromTab = tabid => {
        return new Promise(function(resolve, reject) {
            ext.tabs.get(tabid, function(tab) {
                resolve(tab.url ? tab.url : "");
            });
        });
    };

    /**
     * open new tab
     *
     * @param {string} url
     */
    openNewTab = url => {
        return new Promise(resolve => {
            ext.tabs.create(
                { url: `https://www.linkedin.com${url}` },
                async tab => {
                    ext.tabs.onUpdated.addListener(function listener(
                        tabId,
                        info
                    ) {
                        if (info.status === "complete" && tabId === tab.id) {
                            ext.tabs.onUpdated.removeListener(listener);
                            resolve(tab);
                        }
                    });
                }
            );
        });
    };

    /**
     * Close specific tab
     * @param {} tab
     */
    closeTab = tab => {
        return new Promise((resolve, reject) =>
            ext.tabs.remove(tab.id, () => {
                resolve();
            })
        );
    };

    getTab = tab => {
        return new Promise(resolve => {
            ext.tabs.get(tab.id, function(newTab) {
                resolve(newTab);
            });
        });
    };
    /**
     * send message
     */
    sendMessage = (tab, msg) => {
        return new Promise((resolve, reject) =>
            ext.tabs.sendMessage(tab.id, msg, function(response) {
                resolve(response);
            })
        );
    };

    /**
     * Start invit queue.
     */
    startInvite = async () => {
        if (!this._isStarted) {
            console.log("~~~~~ Invitation is stopped!!!!!");
            return;
        }

        while (1) {
            const updatedTab = await this.getTab(this._searchPageTab);
            if (updatedTab.status === "complete") {
                break;
            }
        }

        this._queuedPeoples = await this.sendMessage(this._searchPageTab, {
            type: GET_PEOPLE_SEARCH_PAGE
        });

        await this.sendInvitationMsg(this._queuedPeoples);

        if (!this._isStarted) {
            console.log("~~~~~ Invitation is stopped!!!!!");
            return;
        }

        await this.sendMessage(this._searchPageTab, {
            type: NEXT_SEARCH_PAGE
        });

        await this.startInvite();
    };

    sendInvitationMsg = async peoples => {
        let i = 0;
        for (let item of peoples) {
            i++;
            if (parseInt(this._invitedCount) >= parseInt(this._limit)) {
                this.stopInvite();
                return;
            }

            if (!this._isStarted) {
                return;
            }
            const tab = await this.openNewTab(item.url);

            const { isInvited } = await this.sendMessage(tab, {
                type: INVITE_PEOPLE,
                people: item
            });

            await this.closeTab(tab);
            ext.tabs.update(this._searchPageTab.id, { highlighted: true });

            if (isInvited) {
                this.increaseInvitedCount();
                this._invitedPeoples.push(item);
                this._queuedPeoples[i - 1] = {
                    ...item,
                    isInvited: true
                };
            } else {
                this._queuedPeoples[i - 1] = {
                    ...item,
                    isInvited: true
                };
                continue;
            }

            const waitingTime = getRandomInt(40, 60) * 1000;
            console.log(
                `~~~~~Invited ${item.name} and waiting for ${waitingTime}, invited count ${this._invitedCount}`
            );
            await delay(waitingTime);
        }
    };
    /**
     * Stop invite
     */
    stopInvite = async () => {
        this._isStarted = false;
    };

    /**
     * increase invited count
     */
    increaseInvitedCount = () => {
        this._invitedCount++;
    };
}

export const background = new Background();
