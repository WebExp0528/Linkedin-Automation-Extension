import React from "react";
import { Button } from "@material-ui/core";
import sendMessage from "../../services/comunicationManager";
import { CircularProgress, Grid, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createLocalStorageAccess as localStorage } from "./../../../content/helper";
import { MSG_DISPLAY_STATUS, MSG_GET_CONFIG } from "./../../../utils/msgType";

const useStyles = makeStyles(theme => ({
    root: { backgroundColor: "#eee" },
    panel: {
        backgroundColor: "#fff",
        padding: "1rem",
        boxShadow:
            "0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)"
    },
    panelBody: {
        paddingTop: "30px",
        paddingBottom: "10px"
    }
}));

export default () => {
    const cls = useStyles();

    const [status, setStatus] = React.useState(false);
    const [isLoading, setLoading] = React.useState(true);

    React.useEffect(() => {
        sendMessage({ type: MSG_GET_CONFIG }, res => {
            console.log("~~~~~~ config", res);
            setStatus(res.displayStatus);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <CircularProgress />;
    }

    const handleClickShowPanel = () => {
        setStatus(!status);
        sendMessage({ type: MSG_DISPLAY_STATUS, status: !status });
    };

    return (
        <div className={cls.root}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch"
                className={cls.panel}
            >
                <Grid container item justify="center">
                    <h1>Linkedin Automation</h1>
                </Grid>
                <Divider />
                <Grid container item justify="center" className={cls.panelBody}>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClickShowPanel}
                        >
                            {status ? "Hide Panel" : "Show Panel"}
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};
