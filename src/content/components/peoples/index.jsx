import _ from "lodash";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import People from "./People";

const useStyles = makeStyles(theme => ({
    root: {
        height: "431px",
        borderRadius: "5px",
        backgroundColor: "#fff",
        padding: "1rem",
        boxShadow:
            "0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)",
        overflow: "scroll"
    },
    panel: {}
}));

const Peoples = () => {
    const cls = useStyles();
    const d = useDispatch();
    const { invitedPeoples } = useSelector(state => state.activity);
    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            className={cls.root}
        >
            <div className={cls.panel}>
                {invitedPeoples.map((item, index) => {
                    return <People people={item} key={index} />;
                })}
            </div>
        </Grid>
    );
};
export default Peoples;
