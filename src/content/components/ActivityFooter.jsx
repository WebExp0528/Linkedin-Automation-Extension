import * as storage from "utils/storage.js";
import _ from "lodash";
import * as React from "react";
import { Container, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { GetActivity } from "./../actions";
import { START, STOP } from "utils/type";
import ext from "utils/ext";
import { isOnSearchPage } from "utils/helper";
let myTimer;
const ActivityFooter = () => {
  const d = useDispatch();

  const activityState = useSelector(state => state.activity);
  const limitState = useSelector(state => state.config.limit);

  const handleClickStart = () => {
    if (!isOnSearchPage(location.href)) {
      alert("This is no search page!");
      return;
    }

    ext.runtime.sendMessage(
      { type: activityState.isStarted ? STOP : START, limit: limitState },
      function(response) {
        console.log("~~~~~ status", response.isStarted);
        if (response.isStarted) {
          myTimer = setInterval(() => {
            d(GetActivity());
          }, 500);
        } else {
          clearInterval(myTimer);
          d(GetActivity());
        }
      }
    );
  };

  return (
    <Container className="tabPanelFooterWrapper">
      <Button
        variant="contained"
        color="primary"
        style={{ width: "100%" }}
        onClick={handleClickStart}
      >
        {activityState.isStarted ? "Stop" : "Start"}
      </Button>
    </Container>
  );
};
export default ActivityFooter;
