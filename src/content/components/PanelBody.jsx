import * as storage from "utils/storage.js";
import _ from "lodash";
import * as React from "react";
import { Grid, Tabs, Tab } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const StyledTab = withStyles(theme => ({
  root: {
    backgroundColor: "#eeeeee",
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightRegular,
    minWidth: 120,
    width: 120
  }
}))(props => <Tab disableRipple {...props} />);

const PanelBody = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="panelBody">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <StyledTab label="Item One" {...a11yProps(0)} />
        <StyledTab label="Item Two" {...a11yProps(1)} />
        <StyledTab label="Item Three" {...a11yProps(2)} />
      </Tabs>
    </div>
  );
};
export default PanelBody;
