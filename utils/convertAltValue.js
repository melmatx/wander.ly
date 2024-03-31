const convertAltValue = (type, value) => {
  if (type === "time-based") {
    return Math.floor(value / 60); // convert seconds to minutes
  }

  return value;
};

export default convertAltValue;
