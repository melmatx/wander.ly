import Data "data";
import Types "../types";

import Map "mo:map/Map";
import { thash } "mo:map/Map";
import Debug "mo:base/Debug";

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

  public func initPosts(posts : Map.Map<Types.Id, Types.PostWithId>) {
    let samplePosts = Data.getSamplePosts();

    for (post in samplePosts.vals()) {
      let currentPost = Map.add(posts, thash, post.id, post);

      switch (currentPost) {
        case (null) {
          Debug.print("Post " # debug_show (post.id) # " added");
        };
        case (?task) {
          Debug.trap("Failed adding post " # debug_show (post.id));
        };
      };
    };
  };
};
