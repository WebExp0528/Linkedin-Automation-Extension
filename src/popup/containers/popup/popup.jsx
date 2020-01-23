import React from "react";
import { Button } from "@material-ui/core";
import sendMessage from "../../services/comunicationManager";
import * as data from "./../../../utils/data";
import { CircularProgress } from "@material-ui/core";

export default () => {
  const storageData = data.getStorageData("isShowPanel");

  console.log(storageData);

  if (storageData.isLoading) {
    return <CircularProgress />;
  }

  const handleClickShowPanel = () => {
    data.saveStorageData({ isShowPanel: !storageData.data.isShowPanel });
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickShowPanel}
      >
        {storageData.data.isShowPanel ? "Hide Panel" : "Show Panel"}
      </Button>
    </div>
  );
};
