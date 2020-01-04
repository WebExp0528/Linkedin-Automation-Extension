import React from "react";
import { Button } from "@material-ui/core";
import sendMessage from "../../services/comunicationManager";
import * as data from "utils/data.js";

function setGreen() {
  sendMessage("change-color", { color: "green" });
}

function setRed() {
  sendMessage("change-color", { color: "red" });
}

export default async() => {
  
  const isShowPanel = await data.getData('isShowPanel');
  console.log('~~~~~~', isShowPanel);

  const handleClickShowPanel = ()=>{
    data.saveData(!isShowPanel)
  }

  return (
  <div>
    <Button variant="contained" color="primary" onClick={}></Button>
  </div>
);
}