import { set } from "date-fns";

import academy from "./features/academy";
import animals from "./features/animals";
import bakery from "./features/bakery";
import boba from "./features/boba";
import cars from "./features/cars";
import coffee from "./features/coffee";
import health from "./features/health";
import mall from "./features/mall";
import shoes from "./features/shoes";
import shop from "./features/shop";
import surf from "./features/surf";
import wellness from "./features/wellness";

const featureList = [
  academy,
  animals,
  bakery,
  boba,
  cars,
  coffee,
  health,
  mall,
  shoes,
  shop,
  surf,
  wellness,
].map((feature) => ({
  ...feature,
  deadline: set(new Date(), {
    hours: Math.floor(Math.random() * 24),
    minutes: Math.floor(Math.random() * 60),
  }),
}));

export default featureList;
