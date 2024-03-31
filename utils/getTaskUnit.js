const TASK_UNITS = {
  "distance-based": {
    singular: "meter",
    plural: "meters",
  },
  "step-based": {
    singular: "step",
    plural: "steps",
  },
  "time-based": {
    singular: "minute",
    plural: "minutes",
  },
};

const getTaskUnit = (type, value) => {
  const unitType = TASK_UNITS[type];

  // const units =
  //   useAlt && unitType.alternative ? unitType.alternative : unitType.standard;

  return parseFloat(value) === 1 ? unitType.singular : unitType.plural;
};

export default getTaskUnit;
