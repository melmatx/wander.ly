import Init "modules/init";
import Service "modules/service";
import Types "types";
import Utils "utils";

import DateTime "mo:datetime/DateTime";
import Map "mo:map/Map";
import { phash } "mo:map/Map";
import { thash } "mo:map/Map";

import Debug "mo:base/Debug";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Result "mo:base/Result";

actor Wanderly {
  stable let users = Map.new<Principal, Types.UserWithId>();
  stable let tasks = Map.new<Types.Id, Types.TaskWithId>();
  stable let userCompletedTasks = Map.new<Types.Id, Types.UserCompletedTask>();
  stable let achievements = Map.new<Types.Id, Types.AchievementWithId>();
  stable let userAchievements = Map.new<Types.Id, Types.UserAchievement>();
  stable let rewards = Map.new<Types.Id, Types.RewardWithId>();
  stable let posts = Map.new<Types.Id, Types.PostWithId>();
  stable let postLikes = Map.new<Types.Id, Types.PostLike>();
  stable let postAwards = Map.new<Types.Id, Types.PostAward>();

  private let initialPoints = 10.0;
  private let awardPoints = 1.0;

  public shared ({ caller }) func _init() : async () {
    Init.initTasks(tasks);
    Init.initAchievements(achievements);
    Init.initRewards(rewards);
    Init.initPosts(posts);

    ignore await updateOrCreateUser({
      id = ?caller;
      name = null;
      country = null;
    });
  };

  public shared ({ caller }) func getUser({ id : ?Principal }) : async Types.UserWithId {
    let userId = Option.get(id, caller);

    switch (Map.get(users, phash, userId)) {
      case (null) {
        Debug.trap("User not found!");
      };
      case (?user) {
        return user;
      };
    };
  };

  public func getAllUsers() : async [(Principal, Types.UserWithId)] {
    return Map.toArray(users);
  };

  public func getAllTasks() : async [(Types.Id, Types.TaskWithId)] {
    return Map.toArray(tasks);
  };

  public func getAllUserCompletedTasks() : async [(Types.Id, Types.UserCompletedTask)] {
    return Map.toArray(userCompletedTasks);
  };

  public func getAllAchievements() : async [(Types.Id, Types.AchievementWithId)] {
    return Map.toArray(achievements);
  };

  public func getAllUserAchievements() : async [(Types.Id, Types.UserAchievement)] {
    return Map.toArray(userAchievements);
  };

  public func getAllRewards() : async [(Types.Id, Types.RewardWithId)] {
    return Map.toArray(rewards);
  };

  public func getAllPosts() : async [(Types.Id, Types.PostComplete)] {
    let completePosts = Service.getAllPosts(posts, postLikes, postAwards);

    return Map.toArray(completePosts);
  };

  public func getAllPostLikes() : async [(Types.Id, Types.PostLike)] {
    return Map.toArray(postLikes);
  };

  public func getAllPostAwards() : async [(Types.Id, Types.PostAward)] {
    return Map.toArray(postAwards);
  };

  public shared ({ caller }) func getCompletedTasksByUser({
    userId : ?Principal;
  }) : async [(Types.Id, Types.UserCompletedTaskResult)] {
    let user = Option.get(userId, caller);

    // Check if user exists
    let userExists = Option.get(Map.contains(users, phash, user), false);

    if (not userExists) {
      Debug.trap("User not found!");
    };

    let filteredTasks = Service.getCompletedTasksOfUser(userCompletedTasks, tasks, user);

    return Map.toArray(filteredTasks);
  };

  public shared ({ caller }) func getAchievementsByUser({
    userId : ?Principal;
  }) : async [(Types.Id, Types.UserAchievementResult)] {
    let user = Option.get(userId, caller);

    // Check if user exists
    let userExists = Option.get(Map.contains(users, phash, user), false);

    if (not userExists) {
      Debug.trap("User not found!");
    };

    let filteredAchievements = Service.getAchievementsOfUser(userAchievements, achievements, user);

    return Map.toArray(filteredAchievements);
  };

  public shared ({ caller }) func getPostsByUser({ userId : ?Principal }) : async [(Types.Id, Types.PostWithId)] {
    let user = Option.get(userId, caller);

    // Check if user exists
    let userExists = Option.get(Map.contains(users, phash, user), false);

    if (not userExists) {
      Debug.trap("User not found!");
    };

    let filteredPosts = Service.getPostsOfUser(posts, user);

    return Map.toArray(filteredPosts);
  };

  public func getTaskById({ id : Types.Id }) : async ?Types.TaskWithId {
    return Map.get(tasks, thash, id);
  };

  public func getPostById({ id : Types.Id }) : async ?Types.PostWithId {
    return Map.get(posts, thash, id);
  };

  public func getLikesByPost({ postId : Types.Id }) : async [(Types.Id, Types.PostLike)] {
    let filteredLikes = Service.getLikesOfPost(postLikes, postId);

    return Map.toArray(filteredLikes);
  };

  public func getAwardsByPost({ postId : Types.Id }) : async [(Types.Id, Types.PostAward)] {
    let filteredAwards = Service.getAwardsOfPost(postAwards, postId);

    return Map.toArray(filteredAwards);
  };

  public shared ({ caller }) func createPost(postPayload : Types.PostPayload) : async Result.Result<Types.MessageResult, Types.MessageResult> {
    if (Utils.isUserAnonymous(caller)) {
      Debug.trap("Anonymous identity found!");
    };

    // Check if user exists
    let userExists = Option.get(Map.contains(users, phash, caller), false);

    if (not userExists) {
      Debug.trap("User not found!");
    };

    // Check if task exists
    let taskExists = Option.get(Map.contains(tasks, thash, postPayload.taskId), false);

    if (not taskExists) {
      return #err({ message = "Task not found!" });
    };

    // Generate id
    let newId : Types.Id = await Utils.generateUUID();

    // Create new post
    let newPost : Types.PostWithId = {
      postPayload with id = newId;
      userId = caller;
      points = 0.0;
    };

    // Check if creation was successful
    switch (Map.add(posts, thash, newId, newPost)) {
      case (null) {
        return #ok({ message = "Post created successfully!" });
      };
      case (?post) {
        return #err({ message = "Post already exists!" });
      };
    };
  };

  public shared ({ caller }) func updateOrCreateUser(userPayload : Types.UserPayload) : async Result.Result<Types.MessageResult, Types.MessageResult> {
    if (Utils.isUserAnonymous(caller)) {
      Debug.trap("Anonymous identity found!");
    };

    // Checks if the user is first time created
    var isNewUser = false;

    // Get the id from the payload if it exists, else use who called this func
    let userId = Option.get(userPayload.id, caller);

    let currentUser = Map.update(
      users,
      phash,
      userId,
      func(id : Principal, user : ?Types.UserWithId) : ?Types.UserWithId {
        switch (user) {
          case (null) {
            isNewUser := true;

            let newUser : Types.UserWithId = {
              userPayload with id = userId;
              points = initialPoints;
            };

            Option.make(newUser);
          };
          case (?user) {
            // Updates the user
            Option.make({
              user with name = userPayload.name;
              country = userPayload.country;
            });
          };
        };
      },
    );

    if (isNewUser) {
      return #ok({ message = "New user created!" });
    } else {
      return #ok({ message = "User updated!" });
    };
  };

  public shared ({ caller }) func updatePostContent({
    postId : Types.Id;
    content : Text;
  }) : async Result.Result<Types.MessageResult, Types.MessageResult> {
    if (Utils.isUserAnonymous(caller)) {
      Debug.trap("Anonymous identity found!");
    };

    // Check if user exists
    let userExists = Option.get(Map.contains(users, phash, caller), false);

    if (not userExists) {
      Debug.trap("User not found!");
    };

    // Check if post exists
    switch (Map.get(posts, thash, postId)) {
      case (null) {
        return #err({ message = "Post not found!" });
      };
      case (?post) {
        // Check if user owns the post
        if (post.userId != caller) {
          return #err({
            message = "You are not authorized to update this post!";
          });
        };
      };
    };

    switch (
      Map.update(
        posts,
        thash,
        postId,
        func(id : Types.Id, post : ?Types.PostWithId) : ?Types.PostWithId {
          Option.map(
            post,
            func(p : Types.PostWithId) : Types.PostWithId {
              return { p with content };
            },
          );
        },
      )
    ) {
      case (null) {
        return #err({ message = "No changes made!" });
      };
      case (?post) {
        return #ok({ message = "Post successfully updated!" });
      };
    };
  };

  public shared ({ caller }) func likeOrDislikePost({ postId : Types.Id }) : async Result.Result<Types.MessageResult, Types.MessageResult> {
    if (Utils.isUserAnonymous(caller)) {
      Debug.trap("Anonymous identity found!");
    };

    // Check if user exists
    let userExists = Option.get(Map.contains(users, phash, caller), false);

    if (not userExists) {
      Debug.trap("User not found!");
    };

    // Check if post exists
    switch (Map.get(posts, thash, postId)) {
      case (null) {
        return #err({ message = "Post not found!" });
      };
      case (?post) {
        // Check if post is already liked
        switch (
          Map.find(
            postLikes,
            func(id : Types.Id, postLike : Types.PostLike) : Bool {
              postLike.userId == caller and postLike.postId == postId;
            },
          )
        ) {
          // If not liked, then Like the post
          case (null) {
            let newId = await Utils.generateUUID();

            let newPostLike : Types.PostLike = {
              userId = caller;
              postId;
            };

            switch (Map.add(postLikes, thash, newId, newPostLike)) {
              case (null) {
                return #ok({ message = "Post liked!" });
              };
              case (?postLike) {
                Debug.trap("An error happened! (Post already liked?)");
              };
            };
          };
          // Unlike the post
          case (?(id, postLike)) {
            Map.delete(postLikes, thash, id);

            return #ok({ message = "Post unliked!" });
          };
        };
      };
    };
  };

  public shared ({ caller }) func awardPost({ postId : Types.Id }) : async Result.Result<Types.MessageResult, Types.MessageResult> {
    if (Utils.isUserAnonymous(caller)) {
      Debug.trap("Anonymous identity found!");
    };

    // Check if user exists
    let userExists = Option.get(Map.contains(users, phash, caller), false);

    if (not userExists) {
      Debug.trap("User not found!");
    };

    // Check if post exists
    switch (Map.get(posts, thash, postId)) {
      case (null) {
        return #err({ message = "Post not found!" });
      };
      case (?post) {
        // Check if post is already awarded
        switch (
          Map.find(
            postAwards,
            func(id : Types.Id, postAward : Types.PostAward) : Bool {
              postAward.userId == caller and postAward.postId == postId;
            },
          )
        ) {
          case (null) {
            // Check if user has available points
            let currentUser = Option.getMapped(
              Map.get(users, phash, caller),
              func(user : Types.UserWithId) : { points : Float } {
                return { points = user.points };
              },
              { points = 0.0 },
            );

            // Check if the user has available balance
            if (currentUser.points < awardPoints) {
              Debug.trap("You don't have enough points!");
            };

            // Deduct points of user
            if (not Service.modifyUserPoints(users, caller, awardPoints, #deduct)) {
              Debug.trap("Failed to deduct points for user!");
            };

            // Increase points of post based on award
            if (not Service.modifyPostPoints(posts, postId, awardPoints, #add)) {
              Debug.trap("Failed to increase points for post!");
            };

            // Add new post award
            let newId = await Utils.generateUUID();

            let newPostAward : Types.PostAward = {
              userId = caller;
              postId;
            };

            switch (Map.add(postAwards, thash, newId, newPostAward)) {
              case (null) {
                return #ok({ message = "Post awarded!" });
              };
              case (?postAward) {
                Debug.trap("An error happened! (Post already awarded?)");
              };
            };
          };
          // Dismiss awarding
          case (?(id, postAward)) {
            return #err({
              message = "Post already awarded! You can't unaward posts.";
            });
          };
        };
      };
    };
  };

  public shared ({ caller }) func claimPointsByPost({ postId : Types.Id }) : async Result.Result<Types.MessageResult, Types.MessageResult> {
    if (Utils.isUserAnonymous(caller)) {
      Debug.trap("Anonymous identity found!");
    };

    // Check if user exists
    let userExists = Option.get(Map.contains(users, phash, caller), false);

    if (not userExists) {
      Debug.trap("User not found!");
    };

    // Check if post exists
    switch (Map.get(posts, thash, postId)) {
      case (null) {
        return #err({ message = "Post not found!" });
      };
      case (?post) {
        if (post.userId != caller) {
          return #err({
            message = "You are not authorized to claim points on this post!";
          });
        };

        if (not Service.modifyUserPoints(users, caller, post.points, #add)) {
          Debug.trap("Failed to add points for user!");
        };

        if (not Service.modifyPostPoints(posts, postId, post.points, #deduct)) {
          Debug.trap("Failed to deduct points for post!");
        };

        return #ok({ message = "Points for post claimed successfully!" });
      };
    };
  };

  public shared ({ caller }) func claimAllPoints() : async Result.Result<Types.MessageResult, Types.MessageResult> {
    let userPosts = Map.filter(
      posts,
      thash,
      func(id : Types.Id, post : Types.PostWithId) : Bool {
        post.userId == caller;
      },
    );

    for (post in Map.vals(userPosts)) {
      if (not Service.modifyUserPoints(users, caller, post.points, #add)) {
        Debug.trap("Failed to add points for user!");
      };

      if (not Service.modifyPostPoints(posts, post.id, 0, #deduct)) {
        Debug.trap("Failed to deduct points for post!");
      };
    };

    return #ok({ message = "All points claimed successfully!" });
  };

  public shared ({ caller }) func completeTask({ taskId : Types.Id }) : async Result.Result<Types.MessageResult, Types.MessageResult> {
    if (Utils.isUserAnonymous(caller)) {
      Debug.trap("Anonymous identity found!");
    };

    // Check if user exists
    let userExists = Option.get(Map.contains(users, phash, caller), false);

    if (not userExists) {
      Debug.trap("User not found!");
    };

    // Check if task exists
    switch (Map.get(tasks, thash, taskId)) {
      case (null) {
        return #err({ message = "Task not found!" });
      };
      case (?task) {
        // Add points to user based on task reward calculation
        let rewardPoints = Service.calculateRewardPoints(task);

        if (not Service.modifyUserPoints(users, caller, rewardPoints, #add)) {
          Debug.trap("Failed to add points for user!");
        };

        // Add completed task for user
        let newId = await Utils.generateUUID();

        let newUserCompletedTask : Types.UserCompletedTask = {
          userId = caller;
          taskId;
          completedAt = DateTime.now().toText();
          receivedPoints = rewardPoints;
        };

        switch (Map.add(userCompletedTasks, thash, newId, newUserCompletedTask)) {
          case (null) {
            return #ok({ message = "Task Completed!" });
          };
          case (?postAward) {
            Debug.trap("An error happened! (Task already completed?)");
          };
        };
      };
    };
  };

  public shared ({ caller }) func addAchievementToUser({
    userId : ?Principal;
    achievementId : Types.Id;
  }) : async Result.Result<Types.MessageResult, Types.MessageResult> {
    // Get user from either payload or who called the func
    let user = Option.get(userId, caller);

    if (Utils.isUserAnonymous(user)) {
      Debug.trap("Anonymous identity found!");
    };

    // Check if user exists
    let userExists = Option.get(Map.contains(users, phash, user), false);

    if (not userExists) {
      Debug.trap("User not found!");
    };

    // Check if achievement exists
    switch (Map.get(achievements, thash, achievementId)) {
      case (null) {
        return #err({ message = "Achievement not found!" });
      };
      case (?achievement) {
        // Check if achievement is already given to user
        switch (
          Map.find(
            userAchievements,
            func(id : Types.Id, userAchievement : Types.UserAchievement) : Bool {
              userAchievement.userId == user and userAchievement.achievementId == achievementId;
            },
          )
        ) {
          case (null) {
            if (not Service.modifyUserPoints(users, caller, achievement.points, #add)) {
              Debug.trap("Failed to add points for user!");
            };

            let newId = await Utils.generateUUID();

            let newUserAchievement : Types.UserAchievement = {
              userId = user;
              achievementId;
              completedAt = DateTime.now().toText();
              receivedPoints = achievement.points;
            };

            switch (Map.add(userAchievements, thash, newId, newUserAchievement)) {
              case (null) {
                return #ok({ message = "Achievement awarded!" });
              };
              case (?userAchievement) {
                Debug.trap("An error happened! (Achievement already awarded?)");
              };
            };
          };
          case (?(id, userAchievement)) {
            return #err({
              message = "Achievement already awarded!";
            });
          };
        };
      };
    };
  };

  public shared (msg) func whoami() : async Principal {
    msg.caller;
  };
};
