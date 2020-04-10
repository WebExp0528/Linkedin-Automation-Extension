import ext from "utils/ext.js";
import {
    GET_ACTIVITY,
    SET_LIMIT_VALUE,
    SET_INCLUDE_MUTUAL_VALUE,
    SET_INCLUDE_PHOTO_VALUE,
    SET_INVITATION_MSG,
    SET_DISPLAY_VALUE
} from "./type";

export function GetActivity() {
    return function(dispatch) {
        ext.runtime.sendMessage({ type: GET_ACTIVITY }, function(response) {
            dispatch({ type: GET_ACTIVITY, payload: response });
        });
    };
}

export function SetLimitValue(value) {
    return function(dispatch) {
        dispatch({ type: SET_LIMIT_VALUE, payload: value });
    };
}

export function SetIncludeMutual(value) {
    return function(dispatch) {
        dispatch({ type: SET_INCLUDE_MUTUAL_VALUE, payload: value });
    };
}

export function SetIncludePhoto(value) {
    return function(dispatch) {
        dispatch({ type: SET_INCLUDE_PHOTO_VALUE, payload: value });
    };
}

export function SetInvitationMsg(msg) {
    return function(dispatch) {
        dispatch({ type: SET_INVITATION_MSG, payload: msg });
    };
}

export function SetDisplayStatus(value) {
    return function(dispatch) {
        dispatch({ type: SET_DISPLAY_VALUE, payload: value });
    };
}
