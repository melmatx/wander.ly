import { colors } from "../assets/styles/globalStyles";

const tasks = [
  {
    title: "Morning",
    color: colors.primary,
    data: [
      {
        title: "Sunrise Stroll",
        description:
          "Start your day with a calm 1-mile walk to greet the sunrise.",
        type: "distance-based",
        emoji: "🌅",
        timeStart: new Date().setHours(5, 0, 0, 0),
        timeEnd: new Date().setHours(8, 0, 0, 0),
        progress: "0.5/1 miles",
        isCompleted: false,
      },
      {
        title: "Step Fresh",
        description: "Aim for 3,000 steps to energize your morning routine.",
        type: "step-based",
        emoji: "👟",
        timeStart: new Date().setHours(6, 0, 0, 0),
        timeEnd: new Date().setHours(9, 0, 0, 0),
        progress: "600/3000 steps",
        isCompleted: false,
      },
      {
        title: "Park Explorer",
        description:
          "Explore a nearby park for 30 minutes, discovering a new route each time.",
        type: "time-based",
        emoji: "🌳",
        timeStart: new Date().setHours(7, 0, 0, 0),
        timeEnd: new Date().setHours(10, 0, 0, 0),
        progress: "30/30 minutes",
        isCompleted: true,
      },
      {
        title: "Morning Challenge",
        description: "Push for a quick 2-mile walk to boost your metabolism.",
        type: "distance-based",
        emoji: "🏃",
        timeStart: new Date().setHours(6, 0, 0, 0),
        timeEnd: new Date().setHours(10, 0, 0, 0),
        progress: "1/2 miles",
        isCompleted: false,
      },
      {
        title: "Quiet Time Walk",
        description:
          "Take a 15-minute walk in silence, practicing mindfulness.",
        type: "time-based",
        emoji: "🧘",
        timeStart: new Date().setHours(5, 0, 0, 0),
        timeEnd: new Date().setHours(8, 0, 0, 0),
        progress: "15/15 minutes",
        isCompleted: true,
      },
    ],
  },
  {
    title: "Afternoon",
    color: colors.secondary,
    data: [
      {
        title: "Lunch Loop",
        description: "A brisk 1.5-mile walk post-lunch to aid digestion.",
        type: "distance-based",
        emoji: "🍽️",
        timeStart: new Date().setHours(11, 0, 0, 0),
        timeEnd: new Date().setHours(14, 0, 0, 0),
        progress: "0.75/1.5 miles",
        isCompleted: false,
      },
      {
        title: "Step It Up",
        description:
          "Accumulate an additional 2,500 steps in your afternoon activities.",
        type: "step-based",
        emoji: "👣",
        timeStart: new Date().setHours(12, 0, 0, 0),
        timeEnd: new Date().setHours(17, 0, 0, 0),
        progress: "1250/2500 steps",
        isCompleted: false,
      },
      {
        title: "Nature's Midday",
        description:
          "Spend 20 minutes walking in a natural setting, appreciating the daylight.",
        type: "time-based",
        emoji: "🌞",
        timeStart: new Date().setHours(11, 0, 0, 0),
        timeEnd: new Date().setHours(15, 0, 0, 0),
        progress: "20/20 minutes",
        isCompleted: true,
      },
      {
        title: "Urban Explorer",
        description:
          "Discover a new neighborhood or area in your city with a 2-mile walk.",
        type: "distance-based",
        emoji: "🏙️",
        timeStart: new Date().setHours(12, 0, 0, 0),
        timeEnd: new Date().setHours(17, 0, 0, 0),
        progress: "2/2 miles",
        isCompleted: true,
      },
      {
        title: "Afternoon Reset",
        description:
          "A 10-minute walk to clear your mind and refocus for the rest of the day.",
        type: "time-based",
        emoji: "🔄",
        timeStart: new Date().setHours(13, 0, 0, 0),
        timeEnd: new Date().setHours(16, 0, 0, 0),
        progress: "5/10 minutes",
        isCompleted: false,
      },
    ],
  },
  {
    title: "Evening",
    color: colors.tertiary,
    data: [
      {
        title: "Sunset Wind Down",
        description: "A relaxing 1-mile walk to wind down as the sun sets.",
        type: "distance-based",
        emoji: "🌇",
        timeStart: new Date().setHours(17, 0, 0, 0),
        timeEnd: new Date().setHours(20, 0, 0, 0),
        progress: "0.5/1 miles",
        isCompleted: false,
      },
      {
        title: "Evening Steps",
        description: "Gather the last 2,000 steps to meet your daily goal.",
        type: "step-based",
        emoji: "🎯",
        timeStart: new Date().setHours(18, 0, 0, 0),
        timeEnd: new Date().setHours(21, 0, 0, 0),
        progress: "2000/2000 steps",
        isCompleted: true,
      },
      {
        title: "Night Sky Gazer",
        description:
          "15-minute walk under the night sky, stargazing and decompressing.",
        type: "time-based",
        emoji: "🌌",
        timeStart: new Date().setHours(19, 0, 0, 0),
        timeEnd: new Date().setHours(22, 0, 0, 0),
        progress: "7.5/15 minutes",
        isCompleted: false,
      },
      {
        title: "Reflective Walk",
        description:
          "A peaceful 2-mile walk to reflect on your day and plan for tomorrow.",
        type: "distance-based",
        emoji: "🤔",
        timeStart: new Date().setHours(17, 0, 0, 0),
        timeEnd: new Date().setHours(21, 0, 0, 0),
        progress: "2/2 miles",
        isCompleted: true,
      },
      {
        title: "Moonlit Serenity",
        description:
          "End your day with a 20-minute serene walk under the moonlight.",
        type: "time-based",
        emoji: "🌜",
        timeStart: new Date().setHours(20, 0, 0, 0),
        timeEnd: new Date().setHours(23, 0, 0, 0),
        progress: "10/20 minutes",
        isCompleted: false,
      },
    ],
  },
];

export default tasks;
