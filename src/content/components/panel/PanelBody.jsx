import * as storage from "utils/storage.js";
import _ from "lodash";
import * as React from "react";
import { Tabs, Tab } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";

import TabPanel from "./TabPanel";
import Activity from "../activity";
import Messages from "../messages";
import Peoples from "../peoples";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: blueGrey[50],
        boxShadow:
            "0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)"
    }
}));

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`
    };
}

const StyledTab = withStyles(theme => ({
    root: {
        backgroundColor: blueGrey[400],
        color: "#eee",
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular,
        minWidth: 120,
        width: 120,
        "&:hover": {
            color: "#fff",
            opacity: 1
        },
        "&$selected": {
            color: "#fff",
            fontWeight: theme.typography.fontWeightBold
        },
        "&:focus": {
            color: "#fff"
        }
    },
    selected: {}
}))(props => <Tab disableRipple {...props} />);

const PanelBody = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const cls = useStyles();
    return (
        <div className={cls.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="primary"
            >
                <StyledTab label="Activity" {...a11yProps(0)} />
                <StyledTab label="Messages" {...a11yProps(1)} />
                <StyledTab label="People" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Activity />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Messages />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Peoples />
            </TabPanel>
        </div>
    );
};
export default PanelBody;
