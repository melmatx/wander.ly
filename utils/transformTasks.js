const transformTasks = (tasks) => {
  if (!tasks) {
    return [];
  }

  // Group tasks by time of day
  const sections = tasks.reduce((acc, task) => {
    let group = acc.find((g) => g.title === task.timeOfDay);

    if (!group) {
      group = { title: task.timeOfDay, data: [] };
      acc.push(group);
    }

    group.data.push(task);
    return acc;
  }, []);

  const sortedTasks = sections.map((section) => ({
    ...section,
    data: section.data.sort((a, b) => {
      // If both tasks are completed or not completed, sort by progress
      if (
        (a.completedAt && b.completedAt) ||
        (!a.completedAt && !b.completedAt)
      ) {
        return a.progress / a.maxValue > b.progress / b.maxValue ? -1 : 1;
      }
      // If only a is completed, b should come first
      if (a.completedAt) return 1;
      // If only b is completed, a should come first
      if (b.completedAt) return -1;
    }),
  }));

  return sortedTasks;
};

export default transformTasks;
