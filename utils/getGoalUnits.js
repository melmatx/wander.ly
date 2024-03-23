const GOAL_UNITS = {
  "distance-based": { singular: "mile", plural: "miles" },
  "step-based": { singular: "step", plural: "steps" },
  "time-based": { singular: "minute", plural: "minutes" },
};

const getGoalUnits = (type, value) => {
  return parseFloat(value) <= 1
    ? GOAL_UNITS[type].singular
    : GOAL_UNITS[type].plural;
};

export default getGoalUnits;
