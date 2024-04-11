module {
  public type Id = Text; // UUID

  public type TimeOfDay = {
    #Morning;
    #Afternoon;
    #Evening;
  };

  public type TaskType = {
    #DistanceBased;
    #StepBased;
    #TimeBased;
  };

  public type User = {
    name : ?Text;
    country : ?Text;
    points : Float;
  };

  public type Task = {
    title : Text;
    description : Text;
    emoji : Text;
    maxValue : Float;
    difficultyFactor : Float;
    timeStart : Text;
    timeEnd : Text;
    timeOfDay : TimeOfDay;
    taskType : TaskType;
  };

  public type Achievement = {
    name : Text;
    description : Text;
    emoji : Text;
    points : Float;
  };

  public type Reward = {
    id : Id;
    name : Text;
    points : Float;
  };

  public type Post = {
    userId : Principal;
    taskId : Id;
    content : Text;
    place : Text;
    image : Text;
    points : Float;
  };

  public type PostLike = {
    userId : Principal;
    postId : Id;
  };

  public type PostAward = {
    userId : Principal;
    postId : Id;
  };

  public type UserCompletedTask = {
    userId : Principal;
    taskId : Id;
    completedAt : Text;
    receivedPoints : Float;
  };

  public type UserAchievement = {
    userId : Principal;
    achievementId : Id;
    completedAt : Text;
    receivedPoints : Float;
  };

  public type MessageResult = {
    message : Text;
  };

  public type UserPayload = {
    id : ?Principal;
    name : ?Text;
    country : ?Text;
  };

  public type CreateTaskPayload = {
    title : Text;
    description : Text;
    emoji : Text;
    maxValue : Float;
    difficultyFactor : Float;
    timeStart : Text;
    timeEnd : Text;
    timeOfDay : TimeOfDay;
    taskType : TaskType;
  };

  public type UpdateTaskPayload = {
    id : Id;
    title : ?Text;
    description : ?Text;
    emoji : ?Text;
    maxValue : ?Float;
    difficultyFactor : ?Float;
    timeStart : ?Text;
    timeEnd : ?Text;
    timeOfDay : ?TimeOfDay;
    taskType : ?TaskType;
  };

  public type PostPayload = {
    taskId : Id;
    content : Text;
    place : Text;
    image : Text;
  };

  public type UserCompletedTaskResult = UserCompletedTask and {
    task : Task;
  };

  public type UserAchievementResult = UserAchievement and {
    achievement : Achievement;
  };

  public type UserWithId = User and { id : Principal };

  public type TaskWithId = Task and { id : Id };

  public type AchievementWithId = Achievement and { id : Id };

  public type RewardWithId = Reward and { id : Id };

  public type PostWithId = Post and { id : Id };

  public type PostComplete = PostWithId and {
    likes : Nat;
    awards : Nat;
  };
};
