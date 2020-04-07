import {
    GET_PEOPLE_SEARHPAGE,
    INVITE_PEOPLE,
    NEXT_SEARCH_PAGE
} from "utils/type.js";
import localStorage, {
    getPeopleFromSearchPage,
    invitePeople,
    nextSearchPage,
    pageScroll
} from "./helper";

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
            const invited = invitePeople(message.msg);
            reply({ isInvited: invited });
            break;
        }
        case NEXT_SEARCH_PAGE: {
            nextSearchPage();
            reply({});
            break;
        }
    }
    return true;
};

export default onRequest;
