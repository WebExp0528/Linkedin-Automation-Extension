import _ from "lodash";
import * as React from "react";
import { Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import NumericInput from "react-numeric-input";
import {
    SetLimitValue,
    SetIncludeMutual,
    GetActivity
} from "./../actions/index";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: { height: "400px" },

    panel: {
        backgroundColor: "#fff",
        padding: "1rem",
        boxShadow:
            "0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)"
    },

    inputLimit: {
        width: "100px"
    },

    textAlignEnd: {
        textAlign: "end"
    }
}));

const ActivityBody = () => {
    const d = useDispatch();
    React.useEffect(() => {
        d(GetActivity());
    }, []);

    const cls = useStyles();

    const activityState = useSelector(state => state.activity);

    const limitState = useSelector(state => state.config.limit);
    const includeMutualState = useSelector(state => state.config.includeMutual);

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
        d(SetLimitValue(value));
    };

    const handleChangeIncludeMutual = event => {
        d(SetIncludeMutual(event.target.checked));
    };

    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            // alignItems="stretch"
            className={cls.root}
        >
            <Grid
                container
                direction="column"
                justify="center"
                className={cls.panel}
            >
                <Grid container direction="row" justify="center">
                    <Grid xs={6} item className={cls.textAlignEnd}>
                        <h3>Elapsed Time: </h3>
                        <h3>Invited Count: </h3>
                        <h3>Limit: </h3>
                    </Grid>
                    <Grid xs={6} item>
                        <h3>{`${hours}:${minutes}:${seconds}`}</h3>
                        <h3>{activityState.invitedCount}</h3>
                        <h3>
                            <NumericInput
                                min={0}
                                max={200}
                                step={1}
                                value={limitState}
                                onChange={changeLimitValue}
                            />
                        </h3>
                    </Grid>
                </Grid>
                <Grid item>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={includeMutualState}
                                onChange={handleChangeIncludeMutual}
                            />
                        }
                        label="Include mutual"
                    />
                </Grid>
            </Grid>

            <Grid className={cls.panel} item></Grid>
        </Grid>
    );
};
export default ActivityBody;
