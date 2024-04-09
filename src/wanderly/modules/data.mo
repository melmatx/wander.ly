import DateTime "mo:datetime/DateTime";
import Principal "mo:base/Principal";
import Types "../Types";

module {
  let examplePrincipal = "un4fu-tqaaa-aaaab-qadjq-cai";

  public func getSampleTasks() : [Types.TaskWithId] {
    [
      {
        id = "0";
        title = "Sunrise Stroll";
        timeOfDay = #Morning;
        description = "Start your day with a calm 1600-meter walk to greet the sunrise.";
        emoji = "🌅";
        timeStart = DateTime.now().add(#hours(5)).toText();
        timeEnd = DateTime.now().add(#hours(8)).toText();
        taskType = #DistanceBased;
        maxValue = 1600;
        completedAt = "";
      },
      {
        id = "1";
        title = "Step Fresh";
        timeOfDay = #Morning;
        description = "Aim for 3,000 steps to energize your morning routine.";
        emoji = "👟";
        timeStart = DateTime.now().add(#hours(6)).toText();
        timeEnd = DateTime.now().add(#hours(9)).toText();
        taskType = #StepBased;
        maxValue = 3000;
        completedAt = "";
      },
      {
        id = "2";
        timeOfDay = #Morning;
        title = "Park Explorer";
        description = "Explore a nearby park for 30 minutes, discovering a new route each time.";
        emoji = "🌳";
        timeStart = DateTime.now().add(#hours(7)).toText();
        timeEnd = DateTime.now().add(#hours(10)).toText();
        taskType = #TimeBased;
        maxValue = 1800;
        completedAt = "";
      },
      {
        id = "3";
        timeOfDay = #Morning;
        title = "Morning Challenge";
        description = "Push for a quick 3200-meter walk to boost your metabolism.";
        emoji = "🏃";
        timeStart = DateTime.now().add(#hours(6)).toText();
        timeEnd = DateTime.now().add(#hours(11)).toText();
        taskType = #DistanceBased;
        maxValue = 3200;
        completedAt = "";
      },
      {
        id = "4";
        timeOfDay = #Morning;
        title = "Quiet Time Walk";
        description = "Take a 15-minute walk in silence, practicing mindfulness.";
        emoji = "🧘";
        timeStart = DateTime.now().add(#hours(5)).toText();
        timeEnd = DateTime.now().add(#hours(8)).toText();
        taskType = #TimeBased;
        maxValue = 900;
        completedAt = "";
      },
      {
        id = "5";
        timeOfDay = #Afternoon;
        title = "Lunch Loop";
        description = "A brisk 2400-meter walk post-lunch to aid digestion.";
        emoji = "🍽️";
        timeStart = DateTime.now().add(#hours(11)).toText();
        timeEnd = DateTime.now().add(#hours(14)).toText();
        taskType = #DistanceBased;
        maxValue = 2400;
        completedAt = "";
      },
      {
        id = "6";
        timeOfDay = #Afternoon;
        title = "Step It Up";
        description = "Accumulate an additional 2,500 steps in your afternoon activities.";
        emoji = "👣";
        timeStart = DateTime.now().add(#hours(12)).toText();
        timeEnd = DateTime.now().add(#hours(17)).toText();
        taskType = #StepBased;
        maxValue = 2500;
        completedAt = "";
      },
      {
        id = "7";
        timeOfDay = #Afternoon;
        title = "Nature's Midday";
        description = "Spend 20 minutes walking in a natural setting, appreciating the daylight.";
        emoji = "🌞";
        timeStart = DateTime.now().add(#hours(11)).toText();
        timeEnd = DateTime.now().add(#hours(15)).toText();
        taskType = #TimeBased;
        maxValue = 1200;
        completedAt = "";
      },
      {
        id = "8";
        timeOfDay = #Afternoon;
        title = "Urban Explorer";
        description = "Discover a new neighborhood or area in your city with a 3200-meter walk.";
        emoji = "🏙️";
        timeStart = DateTime.now().add(#hours(12)).toText();
        timeEnd = DateTime.now().add(#hours(17)).toText();
        taskType = #DistanceBased;
        maxValue = 3200;
        completedAt = "";
      },
      {
        id = "9";
        timeOfDay = #Afternoon;
        title = "Afternoon Reset";
        description = "A 10-minute walk to clear your mind and refocus for the rest of the day.";
        emoji = "🔄";
        timeStart = DateTime.now().add(#hours(13)).toText();
        timeEnd = DateTime.now().add(#hours(16)).toText();
        taskType = #TimeBased;
        maxValue = 600;
        completedAt = "";
      },
      {
        id = "10";
        timeOfDay = #Evening;
        title = "Sunset Wind Down";
        description = "A relaxing 1600-meter walk to wind down as the sun sets.";
        emoji = "🌇";
        timeStart = DateTime.now().add(#hours(17)).toText();
        timeEnd = DateTime.now().add(#hours(20)).toText();
        taskType = #DistanceBased;
        maxValue = 1600;
        completedAt = "";
      },
      {
        id = "11";
        timeOfDay = #Evening;
        title = "Evening Steps";
        description = "Gather the last 2,000 steps to meet your daily goal.";
        emoji = "🎯";
        timeStart = DateTime.now().add(#hours(18)).toText();
        timeEnd = DateTime.now().add(#hours(21)).toText();
        taskType = #StepBased;
        maxValue = 2000;
        completedAt = "";
      },
      {
        id = "12";
        timeOfDay = #Evening;
        title = "Night Sky Gazer";
        description = "15-minute walk under the night sky, stargazing and decompressing.";
        emoji = "🌌";
        timeStart = DateTime.now().add(#hours(19)).toText();
        timeEnd = DateTime.now().add(#hours(22)).toText();
        taskType = #TimeBased;
        maxValue = 900;
        completedAt = "";
      },
      {
        id = "13";
        timeOfDay = #Evening;
        title = "Reflective Walk";
        description = "A peaceful 3200-meter walk to reflect on your day and plan for tomorrow.";
        emoji = "🤔";
        timeStart = DateTime.now().add(#hours(17)).toText();
        timeEnd = DateTime.now().add(#hours(21)).toText();
        taskType = #DistanceBased;
        maxValue = 3200;
        completedAt = "";
      },
      {
        id = "14";
        timeOfDay = #Evening;
        title = "Moonlit Serenity";
        description = "End your day with a 20-minute serene walk under the moonlight.";
        emoji = "🌜";
        timeStart = DateTime.now().add(#hours(20)).toText();
        timeEnd = DateTime.now().add(#hours(23)).toText();
        taskType = #TimeBased;
        maxValue = 1200;
        completedAt = "";
      },
    ];
  };

  public func getSamplePosts() : [Types.PostWithId] {
    [
      {
        id = "0";
        taskId = "0";
        userId = Principal.fromText(examplePrincipal);
        content = "Exploring San Fernando's heritage houses transported me back in time. A must-visit for history buffs!";
        place = "San Fernando, Pampanga";
        image = "";
        points = 0;
      },
      {
        id = "1";
        taskId = "1";
        userId = Principal.fromText(examplePrincipal);
        content = "Angeles City's culinary scene is unforgettable. Sisig at Aling Lucing's is legendary!";
        place = "Angeles City, Pampanga";
        image = "";
        points = 0;
      },
      {
        id = "2";
        taskId = "2";
        userId = Principal.fromText(examplePrincipal);
        content = "Mt. Arayat National Park offers serene landscapes and challenging trails. Perfect for nature lovers.";
        place = "Arayat, Pampanga";
        image = "";
        points = 0;
      },
      {
        id = "3";
        taskId = "3";
        userId = Principal.fromText(examplePrincipal);
        content = "The Giant Lantern Festival in San Fernando was mesmerizing. The colors and craftsmanship are spectacular.";
        place = "San Fernando, Pampanga";
        image = "";
        points = 0;
      },
      {
        id = "4";
        taskId = "4";
        userId = Principal.fromText(examplePrincipal);
        content = "Clark Freeport Zone's blend of leisure and history offers a refreshing getaway. Don't miss the airshow!";
        place = "Clark Freeport Zone, Pampanga";
        image = "";
        points = 0;
      },
    ];
  };
};
