import _ from "lodash";
import * as React from "react";
import blueGrey from "@material-ui/core/colors/blueGrey";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: blueGrey[400],
        textAlign: "center",
        padding: "10px",
        borderBottom: "1px solid"
    },
    title: {
        color: "#fff"
    }
}));

const PanelHeader = () => {
    const cls = useStyles();
    return (
        <div className={cls.root}>
            <h3 className={cls.title}>Linkedin Automation Tool</h3>
        </div>
    );
};
export default PanelHeader;
