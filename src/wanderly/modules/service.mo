import Data "data";
import Types "../types";

import DateTime "mo:datetime/DateTime";
import Map "mo:map/Map";
import { thash } "mo:map/Map";
import { phash } "mo:map/Map";

import Debug "mo:base/Debug";
import Option "mo:base/Option";
import Principal "mo:base/Principal";

module {
  public func getAllTasksToday(map : Map.Map<Types.Id, Types.TaskWithId>) : Map.Map<Types.Id, Types.TaskWithId> {
    return Map.filter(
      map,
      thash,
      func(id : Types.Id, task : Types.TaskWithId) : Bool {
        // Convert timeStart to day number
        let dayStart : Nat = do {
          switch (DateTime.fromText(task.timeStart, Data.dateFormat)) {
            case (null) {
              Debug.trap("Invalid time start");
            };
            case (?date) {
              date.dayOfYear();
            };
          };
        };

        // Convert timeEnd to day number
        let dayEnd : Nat = do {
          switch (DateTime.fromText(task.timeEnd, Data.dateFormat)) {
            case (null) {
              Debug.trap("Invalid time end");
            };
            case (?date) {
              date.dayOfYear();
            };
          };
        };

        // Get day today
        let today = DateTime.now().dayOfYear();

        // Check if task is for today
        return today >= dayStart and today <= dayEnd;
      },
    );
  };

  public func getAllPosts(map : Map.Map<Types.Id, Types.PostWithId>, postLikes : Map.Map<Types.Id, Types.PostLike>, postAwards : Map.Map<Types.Id, Types.PostAward>) : Map.Map<Types.Id, Types.PostComplete> {
    return Map.map(
      map,
      thash,
      func(id : Types.Id, post : Types.PostWithId) : Types.PostComplete {
        let likes = getLikesOfPost(postLikes, post.id);
        let awards = getAwardsOfPost(postAwards, post.id);

        return {
          post with
          likes = if (Map.empty(likes)) { 0 } else likes.size();
          awards = if (Map.empty(awards)) { 0 } else awards.size();
        };
      },
    );
  };

  public func getCompletedTasksOfUser(map : Map.Map<Types.Id, Types.UserCompletedTask>, tasks : Map.Map<Types.Id, Types.TaskWithId>, userId : Principal) : Map.Map<Types.Id, Types.UserCompletedTaskResult> {
    return Map.mapFilter(
      map,
      thash,
      func(id : Types.Id, userCompletedTask : Types.UserCompletedTask) : ?Types.UserCompletedTaskResult {
        if (userCompletedTask.userId == userId) {
          Option.map(
            Map.get(tasks, thash, userCompletedTask.taskId),

            // Combine task data with user completed task
            func(task : Types.TaskWithId) : Types.UserCompletedTaskResult {
              return { userCompletedTask with task };
            },
          );
        } else {
          null;
        };
      },
    );
  };

  public func getAchievementsOfUser(map : Map.Map<Types.Id, Types.UserAchievement>, achievements : Map.Map<Types.Id, Types.AchievementWithId>, userId : Principal) : Map.Map<Types.Id, Types.UserAchievementResult> {
    return Map.mapFilter(
      map,
      thash,
      func(id : Types.Id, userAchievement : Types.UserAchievement) : ?Types.UserAchievementResult {
        if (userAchievement.userId == userId) {
          Option.map(
            Map.get(achievements, thash, userAchievement.achievementId),

            // Combine achievement data with user achievement
            func(achievement : Types.AchievementWithId) : Types.UserAchievementResult {
              return { userAchievement with achievement };
            },
          );
        } else {
          null;
        };
      },
    );
  };

  public func getPostsOfUser(map : Map.Map<Types.Id, Types.PostWithId>, userId : Principal) : Map.Map<Types.Id, Types.PostWithId> {
    return Map.filter(
      map,
      thash,
      func(id : Types.Id, post : Types.PostWithId) : Bool {
        post.userId == userId;
      },
    );
  };

  public func getLikesOfPost(map : Map.Map<Types.Id, Types.PostLike>, postId : Types.Id) : Map.Map<Types.Id, Types.PostLike> {
    return Map.filter(
      map,
      thash,
      func(id : Types.Id, postLike : Types.PostLike) : Bool {
        postLike.postId == postId;
      },
    );
  };

  public func getAwardsOfPost(map : Map.Map<Types.Id, Types.PostAward>, postId : Types.Id) : Map.Map<Types.Id, Types.PostAward> {
    return Map.filter(
      map,
      thash,
      func(id : Types.Id, postAward : Types.PostAward) : Bool {
        postAward.postId == postId;
      },
    );
  };

  public func modifyUserPoints(map : Map.Map<Principal, Types.UserWithId>, userId : Principal, points : Float, operation : { #add; #deduct }) : Bool {
    var prevPoints = 0.0;
    var newPoints = 0.0;

    let updatedUser = Map.update(
      map,
      phash,
      userId,
      func(id : Principal, user : ?Types.UserWithId) : ?Types.UserWithId {
        Option.map(
          user,
          func(u : Types.UserWithId) : Types.UserWithId {
            prevPoints := u.points;

            switch (operation) {
              case (#add) {
                newPoints := prevPoints + points;
              };
              case (#deduct) {
                newPoints := prevPoints - points;
              };
            };

            return { u with points = newPoints };
          },
        );
      },
    );

    // Get updated points, if user does not exist return prevPoints
    newPoints := Option.getMapped(
      updatedUser,
      func(user : Types.UserWithId) : Float {
        user.points;
      },
      prevPoints,
    );

    newPoints != prevPoints;
  };

  public func modifyPostPoints(map : Map.Map<Types.Id, Types.PostWithId>, postId : Types.Id, points : Float, operation : { #add; #deduct }) : Bool {
    var prevPoints = 0.0;
    var newPoints = 0.0;

    let updatedPost = Map.update(
      map,
      thash,
      postId,
      func(id : Types.Id, post : ?Types.PostWithId) : ?Types.PostWithId {
        Option.map(
          post,
          func(p : Types.PostWithId) : Types.PostWithId {
            prevPoints := p.points;

            switch (operation) {
              case (#add) {
                newPoints := prevPoints + points;
              };
              case (#deduct) {
                newPoints := prevPoints - points;
              };
            };

            return { p with points = newPoints };
          },
        );
      },
    );

    // Get points from updated post, if not updated just use the previous points
    newPoints := Option.getMapped(
      updatedPost,
      func(post : Types.PostWithId) : Float {
        post.points;
      },
      prevPoints,
    );

    newPoints != prevPoints;
  };

  public func calculateRewardPoints(task : Types.TaskWithId) : Float {
    var baseRate = 0.0;

    switch (task.taskType) {
      case (#DistanceBased) {
        baseRate := 0.1;
      };
      case (#StepBased) {
        baseRate := 0.15;
      };
      case (#TimeBased) {
        baseRate := 0.12;
      };
    };

    /*
      Base Rate: A constant that represents the base number of points given per unit (meter, step, minute). This could differ based on the task type.
      Value Completed: The actual value completed by the user, which could be distance, steps, or time.
      Difficulty Factor: A multiplier based on the time of day, weather, or other conditions.
    */
    return baseRate * task.maxValue * task.difficultyFactor;
  };
};
