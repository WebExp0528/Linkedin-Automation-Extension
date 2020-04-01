import React from "react";
import ReactDOM from "react-dom";
import ext from "../utils/ext";
import Draggable from "react-draggable";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";

import Panel from "./components/Panel";
import {
    GET_PEOPLE_SEARHPAGE,
    INVITE_PEOPLE,
    NEXT_SEARCH_PAGE
} from "utils/type.js";
import {
    getPeopleFromSearchPage,
    delay,
    invitePeople,
    nextSearchPage
} from "./helper";

function pageScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        return;
    }
    window.scrollBy(0, 10);
    setTimeout(pageScroll, 10);
}

const onRequest = (message, sender, reply) => {
    console.log("~~~~~ Received message in content script", message);
    switch (message.type) {
        case GET_PEOPLE_SEARHPAGE: {
            pageScroll();
            setTimeout(() => {
                const links = getPeopleFromSearchPage();

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

ext.runtime.onMessage.addListener(onRequest);

const store = createStore(reducers, applyMiddleware(thunk));

class Main extends React.Component {
    render() {
        return (
            <div className="my-extension">
                <Draggable
                    defaultPosition={{ x: 0, y: 0 }}
                    position={null}
                    grid={[25, 25]}
                    scale={1}
                >
                    <div style={{ position: "fixed" }}>
                        <Panel />
                    </div>
                </Draggable>
            </div>
        );
    }
}

const app = document.createElement("div");
app.id = "my-extension-root";
app.setAttribute(
    "style",
    "position:absolute; top:200px; left:500px; z-index:10000000"
);
document.body.appendChild(app);
ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    app
);
