export const idlFactory = ({ IDL }) => {
  const Id = IDL.Text;
  const UserAchievement = IDL.Record({
    'completedAt' : IDL.Text,
    'achievementId' : Id,
    'userId' : IDL.Principal,
    'receivedPoints' : IDL.Float64,
  });
  const MessageResult = IDL.Record({ 'message' : IDL.Text });
  const Result_3 = IDL.Variant({
    'ok' : IDL.Record({
      'userAchievement' : UserAchievement,
      'message' : IDL.Text,
    }),
    'err' : MessageResult,
  });
  const AwardType = IDL.Variant({
    'Gold' : IDL.Null,
    'Bronze' : IDL.Null,
    'Silver' : IDL.Null,
  });
  const Result = IDL.Variant({ 'ok' : MessageResult, 'err' : MessageResult });
  const UserCompletedTask = IDL.Record({
    'completedAt' : IDL.Text,
    'userId' : IDL.Principal,
    'taskId' : Id,
    'receivedPoints' : IDL.Float64,
  });
  const Result_2 = IDL.Variant({
    'ok' : IDL.Record({
      'userCompletedTask' : UserCompletedTask,
      'message' : IDL.Text,
    }),
    'err' : MessageResult,
  });
  const PostPayload = IDL.Record({
    'title' : IDL.Text,
    'content' : IDL.Text,
    'imageKey' : IDL.Text,
    'taskId' : Id,
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
  const CreateTaskPayload = IDL.Record({
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
  const AchievementResult = IDL.Record({
    'id' : Id,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'emoji' : IDL.Text,
    'userAchievement' : IDL.Opt(UserAchievement),
    'points' : IDL.Float64,
  });
  const PostAward = IDL.Record({
    'userId' : IDL.Principal,
    'receivedPoints' : IDL.Float64,
    'awardType' : AwardType,
    'postId' : Id,
  });
  const PostLike = IDL.Record({ 'userId' : IDL.Principal, 'postId' : Id });
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
  const PostResult = IDL.Record({
    'id' : Id,
    'title' : IDL.Text,
    'isLiked' : IDL.Bool,
    'content' : IDL.Text,
    'userId' : IDL.Principal,
    'task' : IDL.Opt(TaskWithId),
    'likes' : IDL.Nat,
    'isAwarded' : IDL.Bool,
    'imageKey' : IDL.Text,
    'taskId' : Id,
    'awards' : IDL.Nat,
    'points' : IDL.Float64,
  });
  const RewardWithId = IDL.Record({
    'id' : Id,
    'code' : IDL.Text,
    'name' : IDL.Text,
    'points' : IDL.Float64,
  });
  const UserWithId = IDL.Record({
    'id' : IDL.Principal,
    'country' : IDL.Opt(IDL.Text),
    'name' : IDL.Opt(IDL.Text),
    'createdAt' : IDL.Text,
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
    'title' : IDL.Text,
    'content' : IDL.Text,
    'userId' : IDL.Principal,
    'imageKey' : IDL.Text,
    'taskId' : Id,
    'points' : IDL.Float64,
  });
  const UserResult = IDL.Record({
    'id' : IDL.Principal,
    'country' : IDL.Opt(IDL.Text),
    'name' : IDL.Opt(IDL.Text),
    'createdAt' : IDL.Text,
    'achievements' : IDL.Nat,
    'points' : IDL.Float64,
  });
  const LikeType = IDL.Variant({ 'Like' : IDL.Null, 'Dislike' : IDL.Null });
  const UserPayload = IDL.Record({
    'id' : IDL.Opt(IDL.Principal),
    'country' : IDL.Opt(IDL.Text),
    'name' : IDL.Opt(IDL.Text),
  });
  const Result_1 = IDL.Variant({
    'ok' : IDL.Record({ 'user' : IDL.Opt(UserWithId), 'message' : IDL.Text }),
    'err' : MessageResult,
  });
  const UpdateTaskPayload = IDL.Record({
    'id' : Id,
    'title' : IDL.Opt(IDL.Text),
    'timeStart' : IDL.Opt(IDL.Text),
    'description' : IDL.Opt(IDL.Text),
    'emoji' : IDL.Opt(IDL.Text),
    'taskType' : IDL.Opt(TaskType),
    'difficultyFactor' : IDL.Opt(IDL.Float64),
    'timeEnd' : IDL.Opt(IDL.Text),
    'maxValue' : IDL.Opt(IDL.Float64),
    'timeOfDay' : IDL.Opt(TimeOfDay),
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
        [Result_3],
        [],
      ),
    'awardPost' : IDL.Func(
        [IDL.Record({ 'awardType' : AwardType, 'postId' : Id })],
        [Result],
        [],
      ),
    'claimAllPoints' : IDL.Func([], [Result], []),
    'claimPointsByPost' : IDL.Func(
        [IDL.Record({ 'postId' : Id })],
        [Result],
        [],
      ),
    'completeTask' : IDL.Func([IDL.Record({ 'taskId' : Id })], [Result_2], []),
    'createPost' : IDL.Func([PostPayload], [Result], []),
    'createTask' : IDL.Func([CreateTaskPayload], [Result], []),
    'deletePost' : IDL.Func([IDL.Record({ 'postId' : Id })], [Result], []),
    'getAchievementsByUser' : IDL.Func(
        [IDL.Record({ 'userId' : IDL.Opt(IDL.Principal) })],
        [IDL.Vec(UserAchievementResult)],
        [],
      ),
    'getAllAchievements' : IDL.Func([], [IDL.Vec(AchievementResult)], []),
    'getAllPostAwards' : IDL.Func([], [IDL.Vec(PostAward)], []),
    'getAllPostLikes' : IDL.Func([], [IDL.Vec(PostLike)], []),
    'getAllPosts' : IDL.Func([], [IDL.Vec(PostResult)], []),
    'getAllRewards' : IDL.Func([], [IDL.Vec(RewardWithId)], []),
    'getAllTasks' : IDL.Func([], [IDL.Vec(TaskWithId)], []),
    'getAllTasksToday' : IDL.Func([], [IDL.Vec(TaskWithId)], []),
    'getAllUserAchievements' : IDL.Func([], [IDL.Vec(UserAchievement)], []),
    'getAllUserCompletedTasks' : IDL.Func([], [IDL.Vec(UserCompletedTask)], []),
    'getAllUsers' : IDL.Func([], [IDL.Vec(UserWithId)], []),
    'getAwardsByPost' : IDL.Func(
        [IDL.Record({ 'postId' : Id })],
        [IDL.Vec(PostAward)],
        [],
      ),
    'getCompletedTasksByUser' : IDL.Func(
        [IDL.Record({ 'userId' : IDL.Opt(IDL.Principal) })],
        [IDL.Vec(UserCompletedTaskResult)],
        [],
      ),
    'getLikesByPost' : IDL.Func(
        [IDL.Record({ 'postId' : Id })],
        [IDL.Vec(PostLike)],
        [],
      ),
    'getPostAwardsByUser' : IDL.Func(
        [IDL.Record({ 'userId' : IDL.Opt(IDL.Principal) })],
        [IDL.Vec(PostResult)],
        [],
      ),
    'getPostById' : IDL.Func(
        [IDL.Record({ 'id' : Id })],
        [IDL.Opt(PostWithId)],
        [],
      ),
    'getPostLikesByUser' : IDL.Func(
        [IDL.Record({ 'userId' : IDL.Opt(IDL.Principal) })],
        [IDL.Vec(PostResult)],
        [],
      ),
    'getPostsByUser' : IDL.Func(
        [IDL.Record({ 'userId' : IDL.Opt(IDL.Principal) })],
        [IDL.Vec(PostResult)],
        [],
      ),
    'getTaskById' : IDL.Func(
        [IDL.Record({ 'id' : Id })],
        [IDL.Opt(TaskWithId)],
        [],
      ),
    'getUser' : IDL.Func(
        [IDL.Record({ 'id' : IDL.Opt(IDL.Principal) })],
        [UserResult],
        [],
      ),
    'likeOrDislikePost' : IDL.Func(
        [IDL.Record({ 'likeType' : LikeType, 'postId' : Id })],
        [Result],
        [],
      ),
    'redeemReward' : IDL.Func(
        [IDL.Record({ 'code' : IDL.Text })],
        [Result],
        [],
      ),
    'updateOrCreateUser' : IDL.Func([UserPayload], [Result_1], []),
    'updatePostContent' : IDL.Func(
        [IDL.Record({ 'content' : IDL.Text, 'postId' : Id })],
        [Result],
        [],
      ),
    'updateTask' : IDL.Func([UpdateTaskPayload], [Result], []),
    'whoami' : IDL.Func([], [IDL.Principal], []),
  });
};
export const init = ({ IDL }) => { return []; };
