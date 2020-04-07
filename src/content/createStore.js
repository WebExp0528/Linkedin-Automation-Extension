import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import createAppReducer from "./reducers";
import getInitialStateFromLocalStorage from "./reducers/getInitialStatefromLocalStorage";

export default (preloadedState = getInitialStateFromLocalStorage()) => {
    const middleware = [thunk];

    // Add Redux Logger
    const createLogger = require("redux-logger").createLogger; // eslint-disable-line
    const logger = createLogger({
        collapsed: true
    });
    middleware.push(logger);

    const appReducer = createAppReducer(preloadedState, history);

    const store = createStore(
        appReducer,
        preloadedState,
        applyMiddleware(...middleware)
    );

    return store;
};
