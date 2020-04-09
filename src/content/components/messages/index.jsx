import _ from "lodash";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextareaAutosize, Button } from "@material-ui/core";

import { SetInvitationMsg } from "./../../actions";

const useStyles = makeStyles(theme => ({
    root: {
        height: "431px"
    },
    panel: {
        borderRadius: "5px",
        backgroundColor: "#fff",
        padding: "1rem",
        boxShadow:
            "0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)"
    },
    panelSetNames: {
        paddingBottom: "10px"
    },
    panelMessage: {
        height: "375px"
    },
    msgTextArea: {
        resize: "none"
    }
}));

const Messages = () => {
    const cls = useStyles();
    const d = useDispatch();
    const invitationMsgState = useSelector(state => state.config.invitationMsg);

    const handleClickFullName = () => {
        console.log("~~~~~~~ invitation msg", invitationMsgState);
        d(SetInvitationMsg(`${invitationMsgState} {full_name}`));
    };

    const handleChangeMessage = e => {
        d(SetInvitationMsg(e.target.value));
    };

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            className={cls.root}
        >
            <div className={cls.panel}>
                <Grid item className={cls.panelSetNames}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClickFullName}
                    >
                        Full Name
                    </Button>
                </Grid>
                <Grid item className={cls.panelMessage}>
                    <TextareaAutosize
                        aria-label="message"
                        rowsMin={19}
                        rowsMax={19}
                        placeholder="Customize invitation message!"
                        className={cls.msgTextArea}
                        value={invitationMsgState}
                        onChange={handleChangeMessage}
                    />
                </Grid>
            </div>
        </Grid>
    );
};
export default Messages;
