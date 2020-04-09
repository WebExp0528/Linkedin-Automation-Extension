import _ from "lodash";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, FormControlLabel, Checkbox, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import NumericInput from "react-numeric-input";

import {
    SetLimitValue,
    SetIncludeMutual,
    GetActivity,
    SetIncludePhoto
} from "../../actions/index";
import People from "./People";

const useStyles = makeStyles(theme => ({
    root: { height: "400px" },

    panel: {
        backgroundColor: "#fff",
        padding: "1rem",
        boxShadow:
            "0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)"
    },

    queuePanel: {
        backgroundColor: "#fff",
        padding: "1rem",
        boxShadow:
            "0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)",
        height: "215px",
        overflow: "scroll"
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
    console.log("~~~~~~~~~~activitystate", activityState);
    const limitState = useSelector(state => state.config.limit);
    const includeMutualState = useSelector(state => state.config.includeMutual);
    const includePhotoState = useSelector(state => state.config.includePhoto);

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

    const handleChangeIncludePhoto = event => {
        d(SetIncludePhoto(event.target.checked));
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
                        <h4>Elapsed Time:&nbsp;</h4>
                        <h4>Invited Count:&nbsp;</h4>
                        <h4>Limit:&nbsp;</h4>
                    </Grid>
                    <Grid xs={6} item>
                        <h4>{`${hours}:${minutes}:${seconds}`}</h4>
                        <h4>{activityState.invitedCount}</h4>
                        <h4>
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
                <Grid item>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={includePhotoState}
                                onChange={handleChangeIncludePhoto}
                            />
                        }
                        label="Include NoPhoto"
                    />
                </Grid>
            </Grid>
            <Grid className={cls.queuePanel} item>
                {activityState.queuedPeoples.map(item => {
                    return (
                        <>
                            <People people={item} />
                            <Divider />
                        </>
                    );
                })}
            </Grid>
        </Grid>
    );
};
export default ActivityBody;
