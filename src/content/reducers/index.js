import { combineReducers } from "redux";

import activity from "./activity";
import config from "./config";

const createAppReducer = initialState => {
    const rootReducer = combineReducers({
        activity,
        config
    });

    return (state = initialState, action) => {
        const nextState = rootReducer(state, action);
        return nextState;
    };
};

export default createAppReducer;
