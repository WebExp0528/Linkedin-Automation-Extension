import { createLocalStorageAccess as localStorage } from "./../helper";
import { initialState } from "./initialState";

/**
 * As an initial state,
 * we are merging default initial state and data from the localstorage first
 */

const initReducerState = {
    isLoading: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false
};

export default () => ({
    ...initialState,
    ...{
        activity: {
            ...initialState.activity,
            ...localStorage("@activity").get(),
            ...initReducerState
        },
        config: {
            ...initialState.config,
            ...localStorage("@config").get(),
            ...initReducerState
        }
    }
});
