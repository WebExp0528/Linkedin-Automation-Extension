import ext from "./../utils/ext";
import {
  GET_ACTIVITY,
  START,
  GET_PEOPLE_SEARHPAGE,
  STOP,
  INVITE_PEOPLE,
  NEXT_SEARCH_PAGE
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
  }

  /**
   * Document Ready
   * @returns {void}
   */
  init = () => {
    console.log("loaded Background Scripts");

    //When extension installed
    ext.runtime.onInstalled.addListener(() => this.onInstalled());

    //Add message listener in Browser.
    ext.runtime.onMessage.addListener((message, sender, reply) =>
      this.onMessage(message, sender, reply)
    );

    //Add message listener from Extension
    ext.extension.onConnect.addListener(port => this.onConnect(port));

    //Add Update listener for tab
    ext.tabs.onUpdated.addListener((tabId, changeInfo, tab) =>
      this.onUpdatedTab(tabId, changeInfo, tab)
    );

    //Add New tab create listener
    ext.tabs.onCreated.addListener(tab => this.onCreatedTab(tab));

    //Add Listener for browser action
    ext.browserAction.onClicked.addListener(tabId =>
      this.onClickedExtension(tabId)
    );
  };

  //TODO: Listeners
  /**
   * Clicked Extension ICON
   * @param {*} tabId
   */
  onClickedExtension = tabId => {
    console.log("~~~~~Browser Action!", tabId);
    // checkAuth();
  };

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
          isStarted: this._isStarted
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
        console.log("~~~~~limit is ", this._limit);
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
    }
    return true;
  };

  /**
   * Connect with Extension
   *
   * @param {*} port
   */
  onConnect = port => {
    this._port = port;
    console.log("~~~~~Connected .....");
    this._port.onMessage.addListener(msg => this.onMessageFromExtension(msg));
  };

  /**
   * Message from Extension
   *
   * @param {*} msg
   */
  onMessageFromExtension = msg => {
    console.log("~~~~Recieved message from Popup:" + msg);
  };

  /**
   *
   * @param {object} tab
   */
  onCreatedTab = tab => {
    console.log("~~~~~Created new tab", tab);
  };

  /**
   * When changes tabs
   *
   * @param {*} tabId
   * @param {*} changeInfo
   * @param {*} tab
   */
  onUpdatedTab = (tabId, changeInfo, tab) => {
    console.log("~~~~~Changed tab", tabId);
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
    // return new Promise((resolve, reject) =>
    //   ext.tabs.create({ url: `https://www.linkedin.com${url}` }, function(tab) {
    //     resolve(tab);
    //   })
    // );

    return new Promise(resolve => {
      ext.tabs.create({ url: `https://www.linkedin.com${url}` }, async tab => {
        ext.tabs.onUpdated.addListener(function listener(tabId, info) {
          if (info.status === "complete" && tabId === tab.id) {
            ext.tabs.onUpdated.removeListener(listener);
            resolve(tab);
          }
        });
      });
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

  /**
   * Update Tab
   */
  updateTab = (tab, options) => {
    return new Promise((resolve, reject) => {
      ext.tabs.update(tab.id, options, function(updateTab) {
        resolve(updateTab);
      });
    });
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
    if (parseInt(this._invitedCount) >= parseInt(this._limit)) {
      this._isStarted = false;
      return;
    }
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

    const searchResult = await this.sendMessage(this._searchPageTab, {
      type: GET_PEOPLE_SEARHPAGE
    });

    await this.sendInvitationMsg(searchResult);

    await this.sendMessage(this._searchPageTab, {
      type: NEXT_SEARCH_PAGE
    });

    await this.startInvite();
  };

  sendInvitationMsg = async peoples => {
    console.log("~~~~~", peoples);
    for (let item of peoples) {
      console.log("~~~~~ People ~~~~~", item);
      if (!this._isStarted) {
        console.log("~~~~~ Invitation is stopped!!!!!");
        return;
      }
      const tab = await this.openNewTab(item.url);

      const { isInvited } = await this.sendMessage(tab, {
        type: INVITE_PEOPLE,
        msg: `Hi,${item.name}, how are you?`
      });

      await this.closeTab(tab);
      ext.tabs.update(this._searchPageTab.id, { highlighted: true });
      console.log("invited count", this._invitedCount);
      console.log("limited count", this._limit);
      if (isInvited) {
        this.increaseInvitedCount();
      } else {
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
