import * as storage from "utils/storage.js";
import _ from "lodash";
import * as React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";

import ActivityBody from "./ActivityBody";
import ActivityFooter from "./ActivityFooter";

const Activity = () => {
    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            className="activityWrapper"
        >
            <Grid item>
                <ActivityBody />
            </Grid>
            <Grid item>
                <ActivityFooter />
            </Grid>
        </Grid>
    );
};
export default Activity;
