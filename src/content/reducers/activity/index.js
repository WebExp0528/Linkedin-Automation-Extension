import { GET_ACTIVITY } from "../../actions/type";

export const INITIAL_STATE = {
    runtime: 0,
    invitedCount: 0,
    isStarted: false,
    queuedPeoples: [],
    invitedPeoples: []
};

export default (state = INITIAL_STATE, action) => {
    let nextState = {};
    switch (action.type) {
        case GET_ACTIVITY:
            nextState = { ...state, ...action.payload };
            break;
        default:
            nextState = state;
    }
    return nextState;
};
