import TimeOfDay from "../consts/timeOfDay";

const getTimeOfDay = () => {
  const hours = new Date().getHours();
  if (hours < 12) {
    return TimeOfDay.MORNING;
  } else if (hours < 18) {
    return TimeOfDay.AFTERNOON;
  } else {
    return TimeOfDay.EVENING;
  }
};

export default getTimeOfDay;
