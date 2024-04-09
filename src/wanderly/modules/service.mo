import Types "../types";
import { thash } "mo:map/Map";
import { phash } "mo:map/Map";
import Map "mo:map/Map";
import Option "mo:base/Option";

module {
  public func getAllPosts(map : Map.Map<Types.Id, Types.PostWithId>, postLikes : Map.Map<Types.Id, Types.PostLike>, postAwards : Map.Map<Types.Id, Types.PostAward>) : Map.Map<Types.Id, Types.PostComplete> {
    return Map.map(
      map,
      thash,
      func(id : Types.Id, post : Types.PostWithId) : Types.PostComplete {
        let likes = getLikesOfPost(postLikes, post.id);
        let awards = getAwardsOfPost(postAwards, post.id);

        return {
          post with likes = if (Map.empty(likes)) { 0 } else likes.size();
          awards = if (Map.empty(awards)) { 0 } else awards.size();
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

  public func modifyUserPoints(map : Map.Map<Principal, Types.UserWithId>, userId : Principal, points : Nat, operation : { #add; #deduct }) : Bool {
    var prevPoints = 0;
    var newPoints = 0;

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
      func(user : Types.UserWithId) : Nat {
        user.points;
      },
      prevPoints,
    );

    newPoints != prevPoints;
  };

  public func modifyPostPoints(map : Map.Map<Types.Id, Types.PostWithId>, postId : Types.Id, points : Nat, operation : { #add; #deduct }) : Bool {
    var prevPoints = 0;
    var newPoints = 0;

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
      func(post : Types.PostWithId) : Nat {
        post.points;
      },
      prevPoints,
    );

    newPoints != prevPoints;
  };
};
