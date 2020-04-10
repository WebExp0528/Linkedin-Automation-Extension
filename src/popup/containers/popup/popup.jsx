import React from "react";
import { Button } from "@material-ui/core";
import sendMessage from "../../services/comunicationManager";
import { CircularProgress } from "@material-ui/core";

export default () => {
    // const storageData = data.getStorageData("isShowPanel");

    // console.log(storageData);

    // if (storageData.isLoading) {
    //     return <CircularProgress />;
    // }

    const handleClickShowPanel = () => {};

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClickShowPanel}
            >
                Hide Panel
            </Button>
        </div>
    );
};
