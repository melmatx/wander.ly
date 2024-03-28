import tasks from "./sampleTasks";

// Get morning tasks as sample
const morningTasks = tasks
  .filter((task) => task.title === "Morning")
  .flatMap((task) => task.data);

const posts = [
  {
    id: 1,
    content:
      "Exploring San Fernando's heritage houses transported me back in time. A must-visit for history buffs!",
    place: "San Fernando, Pampanga",
    image: require("../assets/images/travel/travel-1.jpg"),
    likes: 128,
    awards: 3,
    points: 50,
    task: morningTasks[0],
  },
  {
    id: 2,
    content:
      "Angeles City's culinary scene is unforgettable. Sisig at Aling Lucing's is legendary!",
    place: "Angeles City, Pampanga",
    image: require("../assets/images/travel/travel-2.jpg"),
    likes: 65,
    awards: 1,
    points: 0,
    task: morningTasks[1],
  },
  {
    id: 3,
    content:
      "Mt. Arayat National Park offers serene landscapes and challenging trails. Perfect for nature lovers.",
    place: "Arayat, Pampanga",
    image: require("../assets/images/travel/travel-3.jpg"),
    likes: 33,
    awards: 0,
    points: 30,
    task: morningTasks[2],
  },
  {
    id: 4,
    content:
      "The Giant Lantern Festival in San Fernando was mesmerizing. The colors and craftsmanship are spectacular.",
    place: "San Fernando, Pampanga",
    image: require("../assets/images/travel/travel-4.jpg"),
    likes: 45,
    awards: 2,
    points: 20,
    task: morningTasks[3],
  },
  {
    id: 5,
    content:
      "Clark Freeport Zone's blend of leisure and history offers a refreshing getaway. Don't miss the airshow!",
    place: "Clark Freeport Zone, Pampanga",
    image: require("../assets/images/travel/travel-5.jpg"),
    likes: 98,
    awards: 4,
    points: 0,
    task: morningTasks[4],
  },
];

export default posts;
