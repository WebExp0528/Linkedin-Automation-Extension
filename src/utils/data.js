import * as storage from "utils/storage.js";
import _ from "lodash";
import * as React from "react";

export const initState = {
    isShowPanel: true
};

export const initStateKeys = [..._.keys(initState)];

export const getStorageData = (...keys) => {
    keys = keys.length == 0 ? initStateKeys : keys;
    const [isLoading, setLoading] = React.useState(true);
    const [data, setData] = React.useState({});

    React.useEffect(async () => {
        async function fetchData() {
            const storageData = await storage.getData(keys);
            const filterd = keys.reduce((obj, key) => {
                obj[key] =
                    key in storageData ? storageData[key] : initState[key];
                return obj;
            }, {});
            setData({
                ...filterd
            });
            setLoading(false);
        }
        fetchData();
    }, []);

    return {
        isLoading,
        data
    };
};

export const saveStorageData = data => {
    return storage.setData(data);
};
