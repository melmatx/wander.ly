const transformTasks = (tasks) => {
  const sections = tasks.reduce((acc, task) => {
    let group = acc.find((g) => g.title === task.timeOfDay);

    if (!group) {
      group = { title: task.timeOfDay, data: [] };
      acc.push(group);
    }

    group.data.push(task);
    return acc;
  }, []);

  return sections;
};

export default transformTasks;
