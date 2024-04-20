const normalizeUserData = (user) => {
  return Object.entries(user).reduce((acc, [key, value]) => {
    // If value is empty (which is an empty array [] on ICP), set it to an empty string
    if (Array.isArray(value)) {
      acc[key] = value[0] || "";
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});
};

export default normalizeUserData;
