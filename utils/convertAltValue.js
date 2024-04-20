import TaskTypes from "../consts/taskTypes";

const convertAltValue = (type, value) => {
  if (type === TaskTypes.TIME) {
    return Math.floor(value / 60); // convert seconds to minutes
  }

  return value;
};

export default convertAltValue;
