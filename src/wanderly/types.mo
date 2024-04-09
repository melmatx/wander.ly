import Principal "mo:base/Principal";
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
    points : Nat;
  };

  public type Task = {
    title : Text;
    description : Text;
    emoji : Text;
    maxValue : Float;
    timeStart : Text;
    timeEnd : Text;
    timeOfDay : TimeOfDay;
    taskType : TaskType;
    completedAt : Text;
  };

  public type Post = {
    userId : Principal;
    taskId : Id;
    content : Text;
    place : Text;
    image : Text;
    points : Nat;
  };

  public type PostLike = {
    userId : Principal;
    postId : Id;
  };

  public type PostAward = {
    userId : Principal;
    postId : Id;
  };

  public type MessageResult = {
    message : Text;
  };

  public type UserPayload = {
    id : ?Principal;
    name : ?Text;
    country : ?Text;
  };

  public type TaskPayload = {
    title : Text;
    description : Text;
    emoji : Text;
    maxValue : Float;
    timeStart : Text;
    timeEnd : Text;
    timeOfDay : TimeOfDay;
    taskType : TaskType;
  };

  public type PostPayload = {
    taskId : Id;
    content : Text;
    place : Text;
    image : Text;
  };

  public type PostComplete = Post and {
    id : Id;
    likes : Nat;
    awards : Nat;
  };

  public type UserWithId = User and { id : Principal };

  public type TaskWithId = Task and { id : Id };

  public type PostWithId = Post and { id : Id };
};
