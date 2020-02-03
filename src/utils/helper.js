export const isOnSearchPage = url => {
  return strContains(url, "linkedin.com/search/results/people");
};

export const strContains = function(string, substring) {
  return string.indexOf(substring) !== -1;
};

export const delay = interval => {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }, interval)
  );
};

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
