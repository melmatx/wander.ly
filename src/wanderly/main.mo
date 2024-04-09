import Init "modules/init";
import Map "mo:map/Map";
import { thash } "mo:map/Map";
import { phash } "mo:map/Map";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Option "mo:base/Option";
import Types "types";
import Utils "utils";
import Service "modules/service";

actor Wanderly {
  stable let users = Map.new<Principal, Types.UserWithId>();
  stable let tasks = Map.new<Types.Id, Types.TaskWithId>();
  stable let posts = Map.new<Types.Id, Types.PostWithId>();
  stable let postLikes = Map.new<Types.Id, Types.PostLike>();
  stable let postAwards = Map.new<Types.Id, Types.PostAward>();

  let initialPoints = 10;

  public shared ({ caller }) func _init() : async () {
    Init.initTasks(tasks);
    Init.initPosts(posts);

    ignore await updateOrCreateUser({
      id = ?caller;
      name = null;
      country = null;
    });
  };

  public shared ({ caller }) func getUser({ id : ?Principal }) : async ?Types.UserWithId {
    let userId = Option.get(id, caller);

    return Map.get(users, phash, userId);
  };

  public func getAllUsers() : async [(Principal, Types.UserWithId)] {
    return Map.toArray(users);
  };

  public func getAllTasks() : async [(Types.Id, Types.TaskWithId)] {
    return Map.toArray(tasks);
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

  public shared ({ caller }) func getPostsByUser({ userId : ?Principal }) : async [(Types.Id, Types.PostWithId)] {
    let filteredPosts = Service.getPostsOfUser(posts, Option.get(userId, caller));

    return Map.toArray(filteredPosts);
  };

  public func getPostById({ id : Types.Id }) : async ?Types.PostWithId {
    return Map.get(posts, thash, id);
  };

  public func getTaskById({ id : Types.Id }) : async ?Types.TaskWithId {
    return Map.get(tasks, thash, id);
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
      return #err({ message = "Anonymous identity found!" });
    };

    // Check if task exists
    let containsTask = Option.get(Map.contains(tasks, thash, postPayload.taskId), false);

    if (not containsTask) {
      return #err({ message = "Task not found!" });
    };

    // Generate id
    let newId : Types.Id = await Utils.generateUUID();

    // Create new post
    let newPost : Types.PostWithId = {
      postPayload with id = newId;
      userId = caller;
      points = 0;
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
      return #err({ message = "Anonymous identity found!" });
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
      return #err({ message = "Anonymous identity found!" });
    };

    // Check if user owns the post
    switch (Map.get(posts, thash, postId)) {
      case (null) {
        return #err({ message = "Post not found!" });
      };
      case (?post) {
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
      return #err({ message = "Anonymous identity found!" });
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
                return #err({
                  message = "An error happened! (Post already liked?)";
                });
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
      return #err({ message = "Anonymous identity found!" });
    };

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
              func(user : Types.UserWithId) : { points : Nat } {
                return { points = user.points };
              },
              { points = 0 },
            );

            if (currentUser.points <= 0) {
              return #err({ message = "You don't have enough points!" });
            };

            // Deduct one point
            if (not Service.modifyUserPoints(users, caller, 1, #deduct)) {
              return #err({ message = "Failed to deduct points for user!" });
            };

            // Increase points of post by one
            if (not Service.modifyPostPoints(posts, postId, 1, #add)) {
              return #err({ message = "Failed to increase points for post!" });
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
              case (?postLike) {
                return #err({
                  message = "An error happened! (Post already awarded?)";
                });
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
          return #err({ message = "Failed to add points for user!" });
        };

        if (not Service.modifyPostPoints(posts, postId, post.points, #deduct)) {
          return #err({ message = "Failed to deduct points for post!" });
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
        return #err({ message = "Failed to add points for user!" });
      };

      if (not Service.modifyPostPoints(posts, post.id, 0, #deduct)) {
        return #err({ message = "Failed to deduct points for post!" });
      };
    };

    return #ok({ message = "All points claimed successfully!" });
  };

  public shared (msg) func whoami() : async Principal {
    msg.caller;
  };
};
