export const idlFactory = ({ IDL }) => {
  const Id = IDL.Text;
  const MessageResult = IDL.Record({ 'message' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : MessageResult, 'err' : MessageResult });
  const PostPayload = IDL.Record({
    'content' : IDL.Text,
    'taskId' : Id,
    'image' : IDL.Text,
    'place' : IDL.Text,
  });
  const TaskType = IDL.Variant({
    'TimeBased' : IDL.Null,
    'DistanceBased' : IDL.Null,
    'StepBased' : IDL.Null,
  });
  const TimeOfDay = IDL.Variant({
    'Afternoon' : IDL.Null,
    'Morning' : IDL.Null,
    'Evening' : IDL.Null,
  });
  const TaskPayload = IDL.Record({
    'title' : IDL.Text,
    'timeStart' : IDL.Text,
    'description' : IDL.Text,
    'emoji' : IDL.Text,
    'taskType' : TaskType,
    'difficultyFactor' : IDL.Float64,
    'timeEnd' : IDL.Text,
    'maxValue' : IDL.Float64,
    'timeOfDay' : TimeOfDay,
  });
  const Achievement = IDL.Record({
    'name' : IDL.Text,
    'description' : IDL.Text,
    'emoji' : IDL.Text,
    'points' : IDL.Float64,
  });
  const UserAchievementResult = IDL.Record({
    'completedAt' : IDL.Text,
    'achievementId' : Id,
    'userId' : IDL.Principal,
    'achievement' : Achievement,
    'receivedPoints' : IDL.Float64,
  });
  const AchievementWithId = IDL.Record({
    'id' : Id,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'emoji' : IDL.Text,
    'points' : IDL.Float64,
  });
  const PostAward = IDL.Record({ 'userId' : IDL.Principal, 'postId' : Id });
  const PostLike = IDL.Record({ 'userId' : IDL.Principal, 'postId' : Id });
  const PostComplete = IDL.Record({
    'id' : Id,
    'content' : IDL.Text,
    'userId' : IDL.Principal,
    'likes' : IDL.Nat,
    'taskId' : Id,
    'awards' : IDL.Nat,
    'image' : IDL.Text,
    'place' : IDL.Text,
    'points' : IDL.Float64,
  });
  const RewardWithId = IDL.Record({
    'id' : Id,
    'name' : IDL.Text,
    'points' : IDL.Float64,
  });
  const TaskWithId = IDL.Record({
    'id' : Id,
    'title' : IDL.Text,
    'timeStart' : IDL.Text,
    'description' : IDL.Text,
    'emoji' : IDL.Text,
    'taskType' : TaskType,
    'difficultyFactor' : IDL.Float64,
    'timeEnd' : IDL.Text,
    'maxValue' : IDL.Float64,
    'timeOfDay' : TimeOfDay,
  });
  const UserAchievement = IDL.Record({
    'completedAt' : IDL.Text,
    'achievementId' : Id,
    'userId' : IDL.Principal,
    'receivedPoints' : IDL.Float64,
  });
  const UserCompletedTask = IDL.Record({
    'completedAt' : IDL.Text,
    'userId' : IDL.Principal,
    'taskId' : Id,
    'receivedPoints' : IDL.Float64,
  });
  const UserWithId = IDL.Record({
    'id' : IDL.Principal,
    'country' : IDL.Opt(IDL.Text),
    'name' : IDL.Opt(IDL.Text),
    'points' : IDL.Float64,
  });
  const Task = IDL.Record({
    'title' : IDL.Text,
    'timeStart' : IDL.Text,
    'description' : IDL.Text,
    'emoji' : IDL.Text,
    'taskType' : TaskType,
    'difficultyFactor' : IDL.Float64,
    'timeEnd' : IDL.Text,
    'maxValue' : IDL.Float64,
    'timeOfDay' : TimeOfDay,
  });
  const UserCompletedTaskResult = IDL.Record({
    'completedAt' : IDL.Text,
    'userId' : IDL.Principal,
    'task' : Task,
    'taskId' : Id,
    'receivedPoints' : IDL.Float64,
  });
  const PostWithId = IDL.Record({
    'id' : Id,
    'content' : IDL.Text,
    'userId' : IDL.Principal,
    'taskId' : Id,
    'image' : IDL.Text,
    'place' : IDL.Text,
    'points' : IDL.Float64,
  });
  const UserPayload = IDL.Record({
    'id' : IDL.Opt(IDL.Principal),
    'country' : IDL.Opt(IDL.Text),
    'name' : IDL.Opt(IDL.Text),
  });
  return IDL.Service({
    '_init' : IDL.Func([], [], []),
    'addAchievementToUser' : IDL.Func(
        [
          IDL.Record({
            'achievementId' : Id,
            'userId' : IDL.Opt(IDL.Principal),
          }),
        ],
        [Result],
        [],
      ),
    'awardPost' : IDL.Func([IDL.Record({ 'postId' : Id })], [Result], []),
    'claimAllPoints' : IDL.Func([], [Result], []),
    'claimPointsByPost' : IDL.Func(
        [IDL.Record({ 'postId' : Id })],
        [Result],
        [],
      ),
    'completeTask' : IDL.Func([IDL.Record({ 'taskId' : Id })], [Result], []),
    'createPost' : IDL.Func([PostPayload], [Result], []),
    'createTask' : IDL.Func([TaskPayload], [Result], []),
    'getAchievementsByUser' : IDL.Func(
        [IDL.Record({ 'userId' : IDL.Opt(IDL.Principal) })],
        [IDL.Vec(IDL.Tuple(Id, UserAchievementResult))],
        [],
      ),
    'getAllAchievements' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(Id, AchievementWithId))],
        [],
      ),
    'getAllPostAwards' : IDL.Func([], [IDL.Vec(IDL.Tuple(Id, PostAward))], []),
    'getAllPostLikes' : IDL.Func([], [IDL.Vec(IDL.Tuple(Id, PostLike))], []),
    'getAllPosts' : IDL.Func([], [IDL.Vec(IDL.Tuple(Id, PostComplete))], []),
    'getAllRewards' : IDL.Func([], [IDL.Vec(IDL.Tuple(Id, RewardWithId))], []),
    'getAllTasks' : IDL.Func([], [IDL.Vec(IDL.Tuple(Id, TaskWithId))], []),
    'getAllUserAchievements' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(Id, UserAchievement))],
        [],
      ),
    'getAllUserCompletedTasks' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(Id, UserCompletedTask))],
        [],
      ),
    'getAllUsers' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, UserWithId))],
        [],
      ),
    'getAwardsByPost' : IDL.Func(
        [IDL.Record({ 'postId' : Id })],
        [IDL.Vec(IDL.Tuple(Id, PostAward))],
        [],
      ),
    'getCompletedTasksByUser' : IDL.Func(
        [IDL.Record({ 'userId' : IDL.Opt(IDL.Principal) })],
        [IDL.Vec(IDL.Tuple(Id, UserCompletedTaskResult))],
        [],
      ),
    'getLikesByPost' : IDL.Func(
        [IDL.Record({ 'postId' : Id })],
        [IDL.Vec(IDL.Tuple(Id, PostLike))],
        [],
      ),
    'getPostById' : IDL.Func(
        [IDL.Record({ 'id' : Id })],
        [IDL.Opt(PostWithId)],
        [],
      ),
    'getPostsByUser' : IDL.Func(
        [IDL.Record({ 'userId' : IDL.Opt(IDL.Principal) })],
        [IDL.Vec(IDL.Tuple(Id, PostWithId))],
        [],
      ),
    'getTaskById' : IDL.Func(
        [IDL.Record({ 'id' : Id })],
        [IDL.Opt(TaskWithId)],
        [],
      ),
    'getUser' : IDL.Func(
        [IDL.Record({ 'id' : IDL.Opt(IDL.Principal) })],
        [UserWithId],
        [],
      ),
    'likeOrDislikePost' : IDL.Func(
        [IDL.Record({ 'postId' : Id })],
        [Result],
        [],
      ),
    'updateOrCreateUser' : IDL.Func([UserPayload], [Result], []),
    'updatePostContent' : IDL.Func(
        [IDL.Record({ 'content' : IDL.Text, 'postId' : Id })],
        [Result],
        [],
      ),
    'whoami' : IDL.Func([], [IDL.Principal], []),
  });
};
export const init = ({ IDL }) => { return []; };
