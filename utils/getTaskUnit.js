import TaskTypes from "../consts/taskTypes";

const TASK_UNITS = {
  [TaskTypes.DISTANCE]: {
    singular: "meter",
    plural: "meters",
  },
  [TaskTypes.STEP]: {
    singular: "step",
    plural: "steps",
  },
  [TaskTypes.TIME]: {
    singular: "minute",
    plural: "minutes",
  },
};

const getTaskUnit = (type, value) => {
  const unitType = TASK_UNITS[type];

  if (!unitType) {
    throw new Error(`Invalid task type: ${JSON.stringify(type)}`);
  }

  // const units =
  //   useAlt && unitType.alternative ? unitType.alternative : unitType.standard;

  return parseFloat(value) === 1 ? unitType.singular : unitType.plural;
};

export default getTaskUnit;
