const normalizeTasksData = (tasks) => {
  return tasks.map((task) => {
    // Get the variant string of timeOfDay
    const timeOfDay = Object.keys(task.timeOfDay)[0];

    // Get the variant string of taskType
    const taskType = Object.keys(task.taskType)[0];

    return {
      ...task,
      timeOfDay,
      taskType,
      progress: 0,
      completedAt: null,
    };
  });
};

export default normalizeTasksData;
