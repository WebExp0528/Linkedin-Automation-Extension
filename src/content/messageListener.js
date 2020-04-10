import {
    GET_PEOPLE_SEARHPAGE,
    INVITE_PEOPLE,
    NEXT_SEARCH_PAGE,
    MSG_DISPLAY_STATUS,
    MSG_GET_CONFIG
} from "utils/type.js";
import localStorage, {
    getPeopleFromSearchPage,
    invitePeople,
    nextSearchPage,
    pageScroll,
    changeDisplayStatusPanel
} from "./helper";

import { Strings } from "./../utils/helper";

const onRequest = (message, sender, reply) => {
    console.log("~~~~~ Received message in content script", message);
    switch (message.type) {
        case GET_PEOPLE_SEARHPAGE: {
            pageScroll();
            const config = localStorage("@config").get();
            setTimeout(() => {
                const links = getPeopleFromSearchPage(config);
                reply(links);
            }, 10000);
            break;
        }
        case INVITE_PEOPLE: {
            const { invitationMsg } = localStorage("@config").get();
            const msg = Strings.create(invitationMsg, {
                full_name: message.people.name
            });
            const invited = invitePeople(msg);
            reply({ isInvited: invited });
            break;
        }
        case NEXT_SEARCH_PAGE: {
            nextSearchPage();
            reply({});
            break;
        }
        case MSG_DISPLAY_STATUS: {
            localStorage("@config").set({
                ...localStorage("@config").get(),
                displayStatus: message.status
            });
            changeDisplayStatusPanel(message.status);
            reply();
            break;
        }
        case MSG_GET_CONFIG: {
            const config = localStorage("@config").get();
            reply(config);
        }
    }
    return true;
};

export default onRequest;
