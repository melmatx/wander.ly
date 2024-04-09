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
    'points' : IDL.Nat,
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
  const TaskWithId = IDL.Record({
    'id' : Id,
    'completedAt' : IDL.Text,
    'title' : IDL.Text,
    'timeStart' : IDL.Text,
    'description' : IDL.Text,
    'emoji' : IDL.Text,
    'taskType' : TaskType,
    'timeEnd' : IDL.Text,
    'maxValue' : IDL.Float64,
    'timeOfDay' : TimeOfDay,
  });
  const UserWithId = IDL.Record({
    'id' : IDL.Principal,
    'country' : IDL.Opt(IDL.Text),
    'name' : IDL.Opt(IDL.Text),
    'points' : IDL.Nat,
  });
  const PostWithId = IDL.Record({
    'id' : Id,
    'content' : IDL.Text,
    'userId' : IDL.Principal,
    'taskId' : Id,
    'image' : IDL.Text,
    'place' : IDL.Text,
    'points' : IDL.Nat,
  });
  const UserPayload = IDL.Record({
    'id' : IDL.Opt(IDL.Principal),
    'country' : IDL.Opt(IDL.Text),
    'name' : IDL.Opt(IDL.Text),
  });
  return IDL.Service({
    '_init' : IDL.Func([], [], []),
    'awardPost' : IDL.Func([IDL.Record({ 'postId' : Id })], [Result], []),
    'claimAllPoints' : IDL.Func([], [Result], []),
    'claimPointsByPost' : IDL.Func(
        [IDL.Record({ 'postId' : Id })],
        [Result],
        [],
      ),
    'createPost' : IDL.Func([PostPayload], [Result], []),
    'getAllPostAwards' : IDL.Func([], [IDL.Vec(IDL.Tuple(Id, PostAward))], []),
    'getAllPostLikes' : IDL.Func([], [IDL.Vec(IDL.Tuple(Id, PostLike))], []),
    'getAllPosts' : IDL.Func([], [IDL.Vec(IDL.Tuple(Id, PostComplete))], []),
    'getAllTasks' : IDL.Func([], [IDL.Vec(IDL.Tuple(Id, TaskWithId))], []),
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
        [IDL.Opt(UserWithId)],
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
