import * as storage from "utils/storage.js";
import _ from "lodash";
import * as React from "react";
import { Grid } from "@material-ui/core";

import PanelHeader from "./PanelHeader";
import PanelBody from "./PanelBody";

const Panel = () => {
  return (
    <div className="panelWrapper">
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <PanelHeader />
        </Grid>
        <Grid item>
          <PanelBody />
        </Grid>
      </Grid>
    </div>
  );
};
export default Panel;
