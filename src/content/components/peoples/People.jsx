import _ from "lodash";
import * as React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import ext from "../../../utils/ext";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(1)
        }
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7)
    },
    statusPanel: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }
}));

const People = ({ people = { image: null, name: null } }) => {
    const classes = useStyles();
    people["image"] = people.image
        ? people.image
        : ext.runtime.getURL("assets/img/avatar.png");

    return (
        <div className={classes.root}>
            <Avatar alt="NO" src={people.image} className={classes.large} />
            <div className={classes.statusPanel}>
                <div>
                    <p>{people.name}</p>
                </div>
            </div>
        </div>
    );
};

export default People;
