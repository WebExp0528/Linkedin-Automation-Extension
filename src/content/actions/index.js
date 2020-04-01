import ext from "utils/ext.js";
import { GET_ACTIVITY, SET_LIMIT_VALUE } from "./type";

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
