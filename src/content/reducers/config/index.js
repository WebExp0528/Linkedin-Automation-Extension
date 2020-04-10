import {
    SET_LIMIT_VALUE,
    SET_INCLUDE_MUTUAL_VALUE,
    SET_INCLUDE_PHOTO_VALUE,
    SET_INVITATION_MSG,
    SET_DISPLAY_VALUE
} from "../../actions/type";
import { createLocalStorageAccess as localStorage } from "./../../helper";

export const INITIAL_STATE = {
    limit: 50,
    includeMutual: false,
    invitationMsg: "Hi, {full_name}, how are you?",
    displayStatus: true
};

export default (state = INITIAL_STATE, action) => {
    let nextState = {};
    switch (action.type) {
        case SET_LIMIT_VALUE:
            nextState = {
                ...state,
                limit: action.payload
            };
            break;
        case SET_INCLUDE_MUTUAL_VALUE:
            nextState = {
                ...state,
                includeMutual: action.payload
            };
            break;
        case SET_INCLUDE_PHOTO_VALUE:
            nextState = {
                ...state,
                includePhoto: action.payload
            };
            break;
        case SET_INVITATION_MSG: {
            nextState = {
                ...state,
                invitationMsg: action.payload
            };
            break;
        }
        case SET_DISPLAY_VALUE: {
            nextState = {
                ...state,
                displayStatus: action.payload
            };
            break;
        }
        default:
            nextState = state;
    }
    localStorage("@config").set(nextState);
    return nextState;
};
