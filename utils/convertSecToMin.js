import { intervalToDuration } from "date-fns";

const convertSecToMin = (seconds) => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });

  const zeroPad = (num) => String(num).padStart(2, "0");

  return `${duration.minutes ?? 0}:${zeroPad(duration.seconds ?? 0)}`;
};

export default convertSecToMin;
