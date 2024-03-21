import Map "mo:map/Map";
import { phash } "mo:map/Map";
import { thash } "mo:map/Map";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Float "mo:base/Float";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Source "mo:uuid/async/SourceV4";
import UUID "mo:uuid/UUID";

actor Wanderly {
  // Message
  type MessageResult = {
    message : Text;
  };

  //* TYPES
  type User = {
    id : ?Text;
    nickname : Text;
    achievementsId : ?Text;
    points : ?Float;
  };

  type Achievement = {
    emoji : Text;
    title : Text;
    description : Text;
    multiplier : Float;
    tradable : Bool;
  };

  type Task = {
    id : ?Text;
    title : Text;
    description : Text;
    emoji : Text;
    timeStart : Text;
    timeEnd : Text;
    timeOfDay : {
      #Morning;
      #Afternoon;
      #Evening;
    };
    taskType : {
      #DistanceBased;
      #StepBased;
      #TimeBased;
    };
  };

  type UserTask = Task and {
    progress : Float;
    maxValue : Float;
    isCompleted : Bool;
  };

  type UserAchievement = {
    userId : Text;
    fullName : Text;
    achievementList : [Achievement];
  };

  //* UUID Generator
  func generateUUID() : async Text {
    let g = Source.Source();
    return UUID.toText(await g.new());
  };

  //* STABLE HASH-MAP
  stable let users = Map.new<Principal, User>();
  stable let achivementList = Map.new<Text, Achievement>();
  stable let userAchievements = Map.new<Text, Achievement>();
  stable let morningTaskList = Map.new<Text, Task>();
  stable let afternoonTaskList = Map.new<Text, Task>();
  stable let eveningTaskList = Map.new<Text, Task>();

  //* USER
  public shared ({ caller }) func createUser(payload : User) : async Result.Result<MessageResult and { id : Text }, MessageResult> {
    if (Principal.isAnonymous(caller)) {
      return #err({ message = "Anonymous identity found!" });
    };

    if (Map.contains(users, phash, caller) != null) {
      return #err({ message = "User already exist!" });
    };

    // Generate user id
    let userId : Text = do {
      switch (payload.id) {
        case (null) {
          await generateUUID();
        };
        case (?id) {
          id;
        };
      };
    };

    // Generate user achievements id
    let achievementsId : Text = do {
      switch (payload.id) {
        case (null) {
          await generateUUID();
        };
        case (?id) {
          id;
        };
      };
    };

    let newUser : User = {
      id = ?userId;
      nickname = payload.nickname;
      achievementsId = ?achievementsId;
      points = ?0.0;
    };

    // Create new user
    switch (Map.add(users, phash, caller, newUser)) {
      case (null) {
        return #ok({
          message = "User account created successfully!";
          id = userId;
        });
      };
      case (?user) {
        return #err({ message = "User already exists!" });
      };
    };
  };

  // Update User nickname
  public shared ({ caller }) func updateUserNickname(newUsername : User) : async Result.Result<MessageResult, MessageResult> {
    switch (Map.get(users, phash, caller)) {
      case (null) {
        return #err({ message = "user not found" });
      };
      case (?user) {
        let newUserNickname : User = {
          id = user.id;
          nickname = newUsername.nickname;
          achievementsId = user.achievementsId;
          points = user.points;
        };

        Map.set(users, phash, caller, newUserNickname);
        return #ok({ message = "User nickname updated successfully!" });
      };
    };
  };

  // Get specific user
  public func getUser(principal : Principal) : async Result.Result<?Text, MessageResult> {
    switch (Map.get(users, phash, principal)) {
      case (null) {
        return #err({ message = "No user found" });
      };
      case (?user) {
        return #ok(?user.nickname);
      };
    };
  };

  // TASK
  public func createTask(taskKey : Text, taskInfo : Task) : async Result.Result<MessageResult, MessageResult> {
    // Generating task UUID
    let taskId : Text = do {
      switch (taskInfo.id) {
        case (null) {
          await generateUUID();
        };
        case (?id) {
          id;
        };
      };

    };
    let newTaskInfo : Task = {
      id = ?taskId;
      title = taskInfo.title;
      description = taskInfo.description;
      emoji = taskInfo.emoji;
      timeStart = taskInfo.timeStart;
      timeEnd = taskInfo.timeEnd;
      timeOfDay = taskInfo.timeOfDay;
      taskType = taskInfo.taskType;
    };

    if (taskInfo.timeOfDay == #Morning) {
      switch (Map.add(morningTaskList, thash, taskKey, taskInfo)) {
        case (null) {
          return #ok({ message = "Task created successfully" });
        };
        case (?value) {
          return #err({ message = "Task created successfully" });
        };
      };
    } else if (taskInfo.timeOfDay == #Afternoon) {
      switch (Map.add(afternoonTaskList, thash, taskKey, taskInfo)) {
        case (null) {
          return #ok({ message = "Task created successfully" });
        };
        case (?value) {
          return #err({ message = "Task created successfully" });
        };
      };
    } else {
      switch (Map.add(eveningTaskList, thash, taskKey, taskInfo)) {
        case (null) {
          return #ok({ message = "Task created successfully" });
        };
        case (?value) {
          return #err({ message = "Task created successfully" });
        };
      };
    };

  };

  public func getMorningTaskList(taskName : Text) : async Result.Result<Task, MessageResult> {
    switch (Map.get(morningTaskList, thash, taskName)) {
      case (null) {
        return #err({ message = "No task found" });
      };
      case (?morningTask) {
        return #ok(morningTask);
      };
    };
  };
  public func getAfternoonTaskList(taskName : Text) : async Result.Result<Task, MessageResult> {
    switch (Map.get(morningTaskList, thash, taskName)) {
      case (null) {
        return #err({ message = "No task found" });
      };
      case (?afternoonTask) {
        return #ok(afternoonTask);
      };
    };
  };
  public func getEveningTaskList(taskName : Text) : async Result.Result<Task, MessageResult> {
    switch (Map.get(morningTaskList, thash, taskName)) {
      case (null) {
        return #err({ message = "No task found" });
      };
      case (?eveningTask) {
        return #ok(eveningTask);
      };
    };
  };

  // ACHIEVEMENTS
     
  // REWARDS

  // POST

  // POINTS
  // public func computeDailyPoints();
};
