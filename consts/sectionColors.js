import TimeOfDay from "./timeOfDay";
import { colors } from "../assets/styles/globalStyles";

const sectionColors = {
  [TimeOfDay.MORNING]: colors.primary,
  [TimeOfDay.AFTERNOON]: colors.secondary,
  [TimeOfDay.EVENING]: colors.tertiary,
};

export default sectionColors;
