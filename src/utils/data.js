import * as storage from "utils/storage.js";

export const defaultState = {
  isShowPanel: true
};

export const getData = async (keys = Object.keys(defaultState)) => {
  const data = await storage.getData(keys);
  if (typeof keys == "string") {
    return data ? data : defaultState[key];
  } else {
    const newData = {
      ...defaultState,
      ...data
    };
    return Object.keys(newData)
      .filter(key => keys.includes(key))
      .reduce((obj, key) => {
        obj[key] = newData[key];
        return obj;
      }, {});
  }
};

export const saveData = async data => {
  return await storage.setData(data);
};
