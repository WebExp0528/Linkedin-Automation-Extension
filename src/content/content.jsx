import React from "react";
import ReactDOM from "react-dom";
import ext from "../utils/ext";
import Draggable from "react-draggable";
import { Provider, useSelector } from "react-redux";

import createStore from "./createStore";

import Panel from "./components/panel";
import onRequest from "./messageListener";

ext.runtime.onMessage.addListener(onRequest);

const store = createStore(undefined);
console.log(store);

const Main = () => {
    const activityState = useSelector(state => state.activity);
    const url = window.location.href;

    return (
        <div className="my-extension">
            {!(
                activityState.isStarted &&
                url.includes("https://www.linkedin.com/in/")
            ) && (
                <Draggable
                    defaultPosition={{ x: 0, y: 0 }}
                    position={null}
                    grid={[25, 25]}
                    scale={1}
                    enableUserSelectHack={false}
                >
                    <div style={{ position: "fixed" }}>
                        <Panel />
                    </div>
                </Draggable>
            )}
        </div>
    );
};

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
