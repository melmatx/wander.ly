const getInitialState = (states) => {
  return Object.values(states).reduce((acc, state) => {
    acc[state] = "";
    return acc;
  }, {});
};

export default getInitialState;
