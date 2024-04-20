import convertAltValue from "./convertAltValue";
import getTaskUnit from "./getTaskUnit";

const getTaskProgress = (task) => {
  const progress = convertAltValue(task.taskType, task.progress);
  const maxValue = convertAltValue(task.taskType, task.maxValue);
  const unit = getTaskUnit(task.taskType, task.maxValue);

  return {
    progress,
    maxValue,
    unit,
  };
};

export default getTaskProgress;
