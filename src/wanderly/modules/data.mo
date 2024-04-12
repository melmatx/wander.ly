import LocalDateTime "mo:datetime/LocalDateTime";
import Principal "mo:base/Principal";
import Types "../types";
import Utils "../utils";

module {
  public let dateFormat = "YYYY-MM-DDTHH:mm:ss"; // Do not add Z at the end

  public let timeZone = #fixed(#hours(8)); // UTC+8

  public func getSampleTasks() : [Types.TaskWithId] {
    let today = Utils.clearLocalTime(LocalDateTime.now(timeZone));
    let textFormat = #custom({ format = dateFormat; locale = null });
    [
      {
        id = "0";
        title = "Sunrise Stroll";
        timeOfDay = #Morning;
        description = "Start your day with a calm 1600-meter walk to greet the sunrise.";
        emoji = "🌅";
        timeStart = today.add(#hours(5)).toTextFormatted(textFormat);
        timeEnd = today.add(#hours(8)).toTextFormatted(textFormat);
        taskType = #DistanceBased;
        maxValue = 1600;
        difficultyFactor = 1.5;
      },
      {
        id = "1";
        title = "Step Fresh";
        timeOfDay = #Morning;
        description = "Aim for 3,000 steps to energize your morning routine.";
        emoji = "👟";
        timeStart = today.add(#hours(6)).toTextFormatted(textFormat);
        timeEnd = today.add(#hours(9)).toTextFormatted(textFormat);
        taskType = #StepBased;
        maxValue = 3000;
        difficultyFactor = 1.4;
      },
      {
        id = "2";
        timeOfDay = #Morning;
        title = "Park Explorer";
        description = "Explore a nearby park for 30 minutes, discovering a new route each time.";
        emoji = "🌳";
        timeStart = today.add(#hours(7)).toTextFormatted(textFormat);
        timeEnd = today.add(#hours(10)).toTextFormatted(textFormat);
        taskType = #TimeBased;
        maxValue = 1800;
        difficultyFactor = 1.3;
      },
      {
        id = "3";
        timeOfDay = #Morning;
        title = "Morning Challenge";
        description = "Push for a quick 3200-meter walk to boost your metabolism.";
        emoji = "🏃";
        timeStart = today.add(#hours(6)).toTextFormatted(textFormat);
        timeEnd = today.add(#hours(11)).toTextFormatted(textFormat);
        taskType = #DistanceBased;
        maxValue = 3200;
        difficultyFactor = 1.6;
      },
      {
        id = "4";
        timeOfDay = #Morning;
        title = "Quiet Time Walk";
        description = "Take a 15-minute walk in silence, practicing mindfulness.";
        emoji = "🧘";
        timeStart = today.add(#hours(5)).toTextFormatted(textFormat);
        timeEnd = today.add(#hours(8)).toTextFormatted(textFormat);
        taskType = #TimeBased;
        maxValue = 900;
        difficultyFactor = 1.3;
      },
      {
        id = "5";
        timeOfDay = #Afternoon;
        title = "Lunch Loop";
        description = "A brisk 2400-meter walk post-lunch to aid digestion.";
        emoji = "🍽️";
        timeStart = today.add(#hours(11)).toTextFormatted(textFormat);
        timeEnd = today.add(#hours(14)).toTextFormatted(textFormat);
        taskType = #DistanceBased;
        maxValue = 2400;
        difficultyFactor = 1.2;
      },
      {
        id = "6";
        timeOfDay = #Afternoon;
        title = "Step It Up";
        description = "Accumulate an additional 2,500 steps in your afternoon activities.";
        emoji = "👣";
        timeStart = today.add(#hours(12)).toTextFormatted(textFormat);
        timeEnd = today.add(#hours(17)).toTextFormatted(textFormat);
        taskType = #StepBased;
        maxValue = 2500;
        difficultyFactor = 1.2;
      },
      {
        id = "7";
        timeOfDay = #Afternoon;
        title = "Nature's Midday";
        description = "Spend 20 minutes walking in a natural setting, appreciating the daylight.";
        emoji = "🌞";
        timeStart = today.add(#hours(11)).toTextFormatted(textFormat);
        timeEnd = today.add(#hours(15)).toTextFormatted(textFormat);
        taskType = #TimeBased;
        maxValue = 1200;
        difficultyFactor = 1.3;
      },
      {
        id = "8";
        timeOfDay = #Afternoon;
        title = "Urban Explorer";
        description = "Discover a new neighborhood or area in your city with a 3200-meter walk.";
        emoji = "🏙️";
        timeStart = today.add(#hours(12)).toTextFormatted(textFormat);
        timeEnd = today.add(#hours(17)).toTextFormatted(textFormat);
        taskType = #DistanceBased;
        maxValue = 3200;
        difficultyFactor = 1.3;
      },
      {
        id = "9";
        timeOfDay = #Afternoon;
        title = "Afternoon Reset";
        description = "A 10-minute walk to clear your mind and refocus for the rest of the day.";
        emoji = "🔄";
        timeStart = today.add(#hours(13)).toTextFormatted(textFormat);
        timeEnd = today.add(#hours(16)).toTextFormatted(textFormat);
        taskType = #TimeBased;
        maxValue = 600;
        difficultyFactor = 1.2;
      },
      {
        id = "10";
        timeOfDay = #Evening;
        title = "Sunset Wind Down";
        description = "A relaxing 1600-meter walk to wind down as the sun sets.";
        emoji = "🌇";
        timeStart = today.add(#hours(17)).toTextFormatted(textFormat);
        timeEnd = today.add(#hours(20)).toTextFormatted(textFormat);
        taskType = #DistanceBased;
        maxValue = 1600;
        difficultyFactor = 1.4;
      },
      {
        id = "11";
        timeOfDay = #Evening;
        title = "Evening Steps";
        description = "Gather the last 2,000 steps to meet your daily goal.";
        emoji = "🎯";
        timeStart = today.add(#hours(18)).toTextFormatted(textFormat);
        timeEnd = today.add(#hours(21)).toTextFormatted(textFormat);
        taskType = #StepBased;
        maxValue = 2000;
        difficultyFactor = 1.5;
      },
      {
        id = "12";
        timeOfDay = #Evening;
        title = "Night Sky Gazer";
        description = "15-minute walk under the night sky, stargazing and decompressing.";
        emoji = "🌌";
        timeStart = today.add(#hours(19)).toTextFormatted(textFormat);
        timeEnd = today.add(#hours(22)).toTextFormatted(textFormat);
        taskType = #TimeBased;
        maxValue = 900;
        difficultyFactor = 1.4;
      },
      {
        id = "13";
        timeOfDay = #Evening;
        title = "Reflective Walk";
        description = "A peaceful 3200-meter walk to reflect on your day and plan for tomorrow.";
        emoji = "🤔";
        timeStart = today.add(#hours(17)).toTextFormatted(textFormat);
        timeEnd = today.add(#hours(21)).toTextFormatted(textFormat);
        taskType = #DistanceBased;
        maxValue = 3200;
        difficultyFactor = 1.5;
      },
      {
        id = "14";
        timeOfDay = #Evening;
        title = "Moonlit Serenity";
        description = "End your day with a 20-minute serene walk under the moonlight.";
        emoji = "🌜";
        timeStart = today.add(#hours(20)).toTextFormatted(textFormat);
        timeEnd = today.add(#hours(23)).toTextFormatted(textFormat);
        taskType = #TimeBased;
        maxValue = 1200;
        difficultyFactor = 1.5;
      },
    ];
  };

  public func getSampleAchievements() : [Types.AchievementWithId] {
    [
      {
        id = "0";
        name = "Marathoner";
        description = "You've reached the monumental milestone of walking a total of 26.2 miles with us. Your perseverance is inspiring!";
        emoji = "🏅";
        points = 500;
      },
      {
        id = "1";
        name = "Endurance Expert";
        description = "Walking for over 2 hours straight? That's no small feat. You're a true endurance expert.";
        emoji = "⌛";
        points = 300;
      },
      {
        id = "2";
        name = "Step Legend";
        description = "100,000 steps? Your dedication to moving is off the charts. Welcome to the legend status.";
        emoji = "🚀";
        points = 1000;
      },
      {
        id = "3";
        name = "Community Pillar";
        description = "You've supported 20 different local businesses by scanning their QR codes. Your commitment to local growth is unmatched.";
        emoji = "🏛";
        points = 200;
      },
      {
        id = "4";
        name = "Social Butterfly";
        description = "You've made 50 valuable posts in the community, sparking discussions and connections. Your engagement is key to our vibrant community.";
        emoji = "🦋";
        points = 250;
      },
      {
        id = "5";
        name = "Event Enthusiast";
        description = "Attending 20 local business events is no easy task. Your enthusiasm for community events is contagious!";
        emoji = "🎉";
        points = 300;
      },
      {
        id = "6";
        name = "Trendsetter";
        description = "Your posts have been awarded by other users over 50 times! Your influence shapes our community.";
        emoji = "📈";
        points = 400;
      },
      {
        id = "7";
        name = "Pioneer Walker";
        description = "You've explored and mapped out 100 miles of uncharted territory with us. Thanks for leading the way!";
        emoji = "🌍";
        points = 700;
      },
      {
        id = "8";
        name = "Master of Challenges";
        description = "You've completed every single walking and engagement challenge we've thrown at you. Truly a master of challenges!";
        emoji = "🏆";
        points = 800;
      },
    ];
  };

  public func getSampleRewards() : [Types.RewardWithId] {
    [
      { id = "0"; name = "P500 GCash"; points = 100 },
      { id = "1"; name = "P300 GCash"; points = 75 },
      { id = "2"; name = "P100 GCash"; points = 50 },
    ];
  };

  public func getSamplePosts() : [Types.PostWithId] {
    let examplePrincipal = "un4fu-tqaaa-aaaab-qadjq-cai";
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
