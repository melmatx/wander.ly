import convertAltValue from "./convertAltValue";
import getTaskUnit from "./getTaskUnit";

const getTaskProgress = (task) => {
  const progress = convertAltValue(task.type, task.progress);
  const maxValue = convertAltValue(task.type, task.maxValue);
  const unit = getTaskUnit(task.type, task.maxValue);

  return {
    progress,
    maxValue,
    unit,
  };
};

export default getTaskProgress;
