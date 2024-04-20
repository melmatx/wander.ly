import Data "data";
import Types "../types";

import Map "mo:map/Map";
import { thash } "mo:map/Map";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Float "mo:base/Float";
import LocalDateTime "mo:datetime/LocalDateTime";

module {
  public func initTasks(tasks : Map.Map<Types.Id, Types.TaskWithId>) {
    let sampleTasks = Data.getSampleTasks();

    for (task in sampleTasks.vals()) {
      let currentTask = Map.add(tasks, thash, task.id, task);

      switch (currentTask) {
        case (null) {
          Debug.print("Task " # debug_show (task.id) # " added");
        };
        case (?task) {
          Debug.trap("Failed adding task " # debug_show (task.id));
        };
      };
    };
  };

  public func initAchievements(achievements : Map.Map<Types.Id, Types.AchievementWithId>) {
    let sampleAchievements = Data.getSampleAchievements();

    for (achievement in sampleAchievements.vals()) {
      let currentAchievement = Map.add(achievements, thash, achievement.id, achievement);

      switch (currentAchievement) {
        case (null) {
          Debug.print("Achievement " # debug_show (achievement.id) # " added");
        };
        case (?achievement) {
          Debug.trap("Failed adding achievement " # debug_show (achievement.id));
        };
      };
    };
  };

  public func initUserAchievements(userAchievements : Map.Map<Types.Id, Types.UserAchievement>, userId : Principal) {
    let sampleAchievements = Data.getSampleAchievements();

    for (i in Iter.range(0, 5)) {
      let userAchievementId = "userAchievement-" # Nat.toText(i);

      let newUserAchievement : Types.UserAchievement = {
        userId;
        achievementId = sampleAchievements[i].id;
        completedAt = LocalDateTime.now(Data.timeZone).toText();
        receivedPoints = 20 * (Float.fromInt(i) + 1);
      };

      let currentUserAchievement = Map.add(userAchievements, thash, userAchievementId, newUserAchievement);

      switch (currentUserAchievement) {
        case (null) {
          Debug.print("User achievement " # debug_show (userAchievementId) # " added");
        };
        case (?userAchievement) {
          Debug.trap("Failed adding user achievement " # debug_show (userAchievementId));
        };
      };
    };
  };

  public func initRewards(rewards : Map.Map<Types.Id, Types.RewardWithId>) {
    let sampleRewards = Data.getSampleRewards();

    for (reward in sampleRewards.vals()) {
      let currentReward = Map.add(rewards, thash, reward.id, reward);

      switch (currentReward) {
        case (null) {
          Debug.print("Reward " # debug_show (reward.id) # " added");
        };
        case (?reward) {
          Debug.trap("Failed adding reward " # debug_show (reward.id));
        };
      };
    };
  };

  public func initPosts(posts : Map.Map<Types.Id, Types.PostWithId>, userId : Principal) {
    let samplePosts = Data.getSamplePosts(userId);

    for (post in samplePosts.vals()) {
      let currentPost = Map.add(posts, thash, post.id, post);

      switch (currentPost) {
        case (null) {
          Debug.print("Post " # debug_show (post.id) # " added");
        };
        case (?post) {
          Debug.trap("Failed adding post " # debug_show (post.id));
        };
      };
    };
  };
};
