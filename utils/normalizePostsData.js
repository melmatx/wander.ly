const normalizePostsData = (posts) => {
  return posts.map((post) => {
    // Get the opt task value
    const task = post.task[0] || {};

    return {
      ...post,
      task,
    };
  });
};

export default normalizePostsData;
