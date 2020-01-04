import ext from "./ext";

const storage = ext.storage.sync ? ext.storage.sync : ext.storage.local;

export const getData = async keys => {
  return new Promise((resolve, reject) => {
    try {
      storage.get(keys, options => {
        resolve(options);
      });
    } catch (err) {
      reject(null);
    }
  });
};

export const setData = async data => {
  return new Promise((resolve, reject) => {
    try {
      storage.set(data, () => {
        resolve(true);
      });
    } catch (err) {
      reject(false);
    }
  });
};
