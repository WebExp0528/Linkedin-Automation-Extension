import _ from "lodash";
import * as React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import ActivityBody from "./ActivityBody";
import ActivityFooter from "./ActivityFooter";

const useStyles = makeStyles(theme => ({
    body: {},
    footer: {
        paddingTop: "10px"
    }
}));

const Activity = () => {
    const cls = useStyles();
    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            className="activityWrapper"
        >
            <Grid className={cls.body} item>
                <ActivityBody />
            </Grid>
            <Grid className={cls.footer} item>
                <ActivityFooter />
            </Grid>
        </Grid>
    );
};
export default Activity;
