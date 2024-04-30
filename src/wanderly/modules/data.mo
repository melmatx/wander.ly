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
        id = "task-0";
        title = "Sunrise Stroll";
        timeOfDay = #Morning;
        description = "Start your day with a calm 100-meter walk to greet the sunrise.";
        emoji = "🌅";
        timeStart = today.add(#hours(5)).toTextFormatted(textFormat);
        timeEnd = today.add(#hours(8)).toTextFormatted(textFormat);
        taskType = #DistanceBased;
        maxValue = 100;
        difficultyFactor = 1.5;
      },
      {
        id = "task-1";
        title = "Step Fresh";
        timeOfDay = #Morning;
        description = "Aim for 500 steps to energize your morning routine.";
        emoji = "👟";
        timeStart = today.add(#hours(6)).toTextFormatted(textFormat);
        timeEnd = today.add(#hours(9)).toTextFormatted(textFormat);
        taskType = #StepBased;
        maxValue = 500;
        difficultyFactor = 1.4;
      },
      {
        id = "task-2";
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
        id = "task-3";
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
        id = "task-4";
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
        id = "task-5";
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
        id = "task-6";
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
        id = "task-7";
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
        id = "task-8";
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
        id = "task-9";
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
        id = "task-10";
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
        id = "task-11";
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
        id = "task-12";
        timeOfDay = #Evening;
        title = "Evening Steps";
        description = "Gather the last 250 steps to meet your daily goal.";
        emoji = "🎯";
        timeStart = today.add(#hours(17)).toTextFormatted(textFormat);
        timeEnd = today.add(#hours(21)).toTextFormatted(textFormat);
        taskType = #StepBased;
        maxValue = 250;
        difficultyFactor = 1.3;
      },
      {
        id = "task-13";
        timeOfDay = #Evening;
        title = "Reflective Walk";
        description = "A peaceful 150-meter walk to reflect on your day and plan for tomorrow.";
        emoji = "🤔";
        timeStart = today.add(#hours(17)).toTextFormatted(textFormat);
        timeEnd = today.add(#hours(21)).toTextFormatted(textFormat);
        taskType = #DistanceBased;
        maxValue = 150;
        difficultyFactor = 1.2;
      },
      {
        id = "task-14";
        timeOfDay = #Evening;
        title = "Moonlit Serenity";
        description = "End your day with a 2-minute serene walk under the moonlight.";
        emoji = "🌜";
        timeStart = today.add(#hours(17)).toTextFormatted(textFormat);
        timeEnd = today.add(#hours(23)).toTextFormatted(textFormat);
        taskType = #TimeBased;
        maxValue = 120;
        difficultyFactor = 1.1;
      },
    ];
  };

  public func getSampleAchievements() : [Types.AchievementWithId] {
    [
      {
        id = "achievement-0";
        name = "Marathoner";
        description = "You've reached the monumental milestone of walking a total of 26.2 miles with us. Your perseverance is inspiring!";
        emoji = "🏅";
        points = 500;
      },
      {
        id = "achievement-1";
        name = "Endurance Expert";
        description = "Walking for over 2 hours straight? That's no small feat. You're a true endurance expert.";
        emoji = "⌛";
        points = 300;
      },
      {
        id = "achievement-2";
        name = "Step Legend";
        description = "100,000 steps? Your dedication to moving is off the charts. Welcome to the legend status.";
        emoji = "🚀";
        points = 1000;
      },
      {
        id = "achievement-3";
        name = "Community Pillar";
        description = "You've supported 20 different local businesses by scanning their QR codes. Your commitment to local growth is unmatched.";
        emoji = "🏛";
        points = 200;
      },
      {
        id = "achievement-4";
        name = "Social Butterfly";
        description = "You've made 50 valuable posts in the community, sparking discussions and connections. Your engagement is key to our vibrant community.";
        emoji = "🦋";
        points = 250;
      },
      {
        id = "achievement-5";
        name = "Event Enthusiast";
        description = "Attending 20 local business events is no easy task. Your enthusiasm for community events is contagious!";
        emoji = "🎉";
        points = 300;
      },
      {
        id = "achievement-6";
        name = "Trendsetter";
        description = "Your posts have been awarded by other users over 50 times! Your influence shapes our community.";
        emoji = "📈";
        points = 400;
      },
      {
        id = "achievement-7";
        name = "Pioneer Walker";
        description = "You've explored and mapped out 100 miles of uncharted territory with us. Thanks for leading the way!";
        emoji = "🌍";
        points = 700;
      },
      {
        id = "achievement-8";
        name = "Master of Challenges";
        description = "You've completed every single walking and engagement challenge we've thrown at you. Truly a master of challenges!";
        emoji = "🏆";
        points = 800;
      },
    ];
  };

  public func getSampleRewards() : [Types.RewardWithId] {
    [
      { id = "reward-0"; name = "P500 GCash"; code = "500GCASH"; points = 500 },
      { id = "reward-1"; name = "P300 GCash"; code = "300GCASH"; points = 300 },
      { id = "reward-2"; name = "P100 GCash"; code = "100GCASH"; points = 100 },
    ];
  };

  public func getSamplePosts(userId : Principal) : [Types.PostWithId] {
    let examplePrincipal = "un4fu-tqaaa-aaaab-qadjq-cai";
    [
      {
        id = "post-0";
        taskId = "task-0";
        userId = Principal.fromText(examplePrincipal);
        title = "San Fernando, Pampanga";
        content = "Exploring San Fernando's heritage houses transported me back in time. A must-visit for history buffs!";
        imageKey = "";
        points = 0;
      },
      {
        id = "post-1";
        taskId = "task-1";
        userId = Principal.fromText(examplePrincipal);
        title = "Angeles City, Pampanga";
        content = "Angeles City's culinary scene is unforgettable. Sisig at Aling Lucing's is legendary!";
        imageKey = "";
        points = 0;
      },
      {
        id = "post-2";
        taskId = "task-2";
        userId = Principal.fromText(examplePrincipal);
        title = "Arayat, Pampanga";
        content = "Mt. Arayat National Park offers serene landscapes and challenging trails. Perfect for nature lovers.";
        imageKey = "";
        points = 0;
      },
      {
        id = "post-3";
        taskId = "task-3";
        userId = Principal.fromText(examplePrincipal);
        title = "SM City Clark";
        content = "The view is nice and I like the shops like Conti's and Wendy's. They gave me tons of discounts and rewards after I went there for an event.";
        imageKey = "";
        points = 0;
      },
      {
        id = "post-4";
        taskId = "task-4";
        userId;
        title = "San Fernando, Pampanga";
        content = "The Giant Lantern Festival in San Fernando was mesmerizing. The colors and craftsmanship are spectacular.";
        imageKey = "";
        points = 50;
      },
      {
        id = "post-5";
        taskId = "task-5";
        userId;
        title = "Clark Freeport Zone, Pampanga";
        content = "Clark Freeport Zone's blend of leisure and history offers a refreshing getaway. Don't miss the airshow!";
        imageKey = "";
        points = 20;
      },
      {
        id = "post-6";
        taskId = "task-6";
        userId;
        title = "Marquee Mall";
        content = "I love the tech event that was held in the mall. They gave me discounts just for going there. Everyone had a nice time and the setup was gorgeous!";
        imageKey = "";
        points = 30;
      },
    ];
  };
};
