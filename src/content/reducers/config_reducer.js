import { SET_LIMIT_VALUE } from "./../actions/type";

let INITIAL_STATE = {
    limit: 50,
    includeMutual: false
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_LIMIT_VALUE:
            return {
                ...state,
                limit: action.payload
            };
        case SET_LIMIT_VALUE:
            return {
                ...state,
                includeMutual: action.payload
            };
        default:
            return state;
    }
}
