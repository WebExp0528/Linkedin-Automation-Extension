import { combineReducers } from "redux";

import activity from "./activity_reducer";
import config from "./config_reducer";

const rootReducer = combineReducers({
  activity,
  config
});

export default rootReducer;
