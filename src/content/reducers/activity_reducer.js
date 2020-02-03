import { GET_ACTIVITY } from "./../actions/type";

let INITIAL_STATE = {
  runtime: 0,
  invitedCount: 0,
  isStarted: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ACTIVITY:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
