import * as storage from "utils/storage.js";
import _ from "lodash";
import * as React from "react";
import { Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { SetLimitValue } from "./../actions/index";
import NumericInput from "react-numeric-input";

const ActivityBody = () => {
  const d = useDispatch();
  const activityState = useSelector(state => state.activity);
  const limitState = useSelector(state => state.config.limit);

  const now = new Date();
  const elapsed = activityState.runtime
    ? now.getTime() - activityState.runtime
    : 0;

  const hours = Math.floor(
    (elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

  const changeLimitValue = value => {
    console.log("~~~", value);
    d(SetLimitValue(value));
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="stretch"
      className="tabPanelBodyWrapper"
    >
      <Grid item>
        <h2>{`${hours}:${minutes}:${seconds}`}</h2>
      </Grid>
      <Grid item>
        <h2>
          Invited Count:
          {activityState.invitedCount}
        </h2>
      </Grid>
      <Grid item>
        <h4>
          Limit:{" "}
          <NumericInput
            min={0}
            max={200}
            step={1}
            value={limitState}
            onChange={changeLimitValue}
          />
        </h4>
      </Grid>
    </Grid>
  );
};
export default ActivityBody;
