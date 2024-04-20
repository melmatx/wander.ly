import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Achievement {
  'name' : string,
  'description' : string,
  'emoji' : string,
  'points' : number,
}
export interface AchievementResult {
  'id' : Id,
  'name' : string,
  'description' : string,
  'emoji' : string,
  'userAchievement' : [] | [UserAchievement],
  'points' : number,
}
export type AwardType = { 'Gold' : null } |
  { 'Bronze' : null } |
  { 'Silver' : null };
export interface CreateTaskPayload {
  'title' : string,
  'timeStart' : string,
  'description' : string,
  'emoji' : string,
  'taskType' : TaskType,
  'difficultyFactor' : number,
  'timeEnd' : string,
  'maxValue' : number,
  'timeOfDay' : TimeOfDay,
}
export type Id = string;
export type LikeType = { 'Like' : null } |
  { 'Dislike' : null };
export interface MessageResult { 'message' : string }
export interface PostAward {
  'userId' : Principal,
  'receivedPoints' : number,
  'awardType' : AwardType,
  'postId' : Id,
}
export interface PostLike { 'userId' : Principal, 'postId' : Id }
export interface PostPayload {
  'title' : string,
  'content' : string,
  'imageKey' : string,
  'taskId' : Id,
}
export interface PostResult {
  'id' : Id,
  'title' : string,
  'isLiked' : boolean,
  'content' : string,
  'userId' : Principal,
  'task' : [] | [TaskWithId],
  'likes' : bigint,
  'isAwarded' : boolean,
  'imageKey' : string,
  'taskId' : Id,
  'awards' : bigint,
  'points' : number,
}
export interface PostWithId {
  'id' : Id,
  'title' : string,
  'content' : string,
  'userId' : Principal,
  'imageKey' : string,
  'taskId' : Id,
  'points' : number,
}
export type Result = { 'ok' : MessageResult } |
  { 'err' : MessageResult };
export type Result_1 = {
    'ok' : { 'user' : [] | [UserWithId], 'message' : string }
  } |
  { 'err' : MessageResult };
export interface RewardWithId {
  'id' : Id,
  'code' : string,
  'name' : string,
  'points' : number,
}
export interface Task {
  'title' : string,
  'timeStart' : string,
  'description' : string,
  'emoji' : string,
  'taskType' : TaskType,
  'difficultyFactor' : number,
  'timeEnd' : string,
  'maxValue' : number,
  'timeOfDay' : TimeOfDay,
}
export type TaskType = { 'TimeBased' : null } |
  { 'DistanceBased' : null } |
  { 'StepBased' : null };
export interface TaskWithId {
  'id' : Id,
  'title' : string,
  'timeStart' : string,
  'description' : string,
  'emoji' : string,
  'taskType' : TaskType,
  'difficultyFactor' : number,
  'timeEnd' : string,
  'maxValue' : number,
  'timeOfDay' : TimeOfDay,
}
export type TimeOfDay = { 'Afternoon' : null } |
  { 'Morning' : null } |
  { 'Evening' : null };
export interface UpdateTaskPayload {
  'id' : Id,
  'title' : [] | [string],
  'timeStart' : [] | [string],
  'description' : [] | [string],
  'emoji' : [] | [string],
  'taskType' : [] | [TaskType],
  'difficultyFactor' : [] | [number],
  'timeEnd' : [] | [string],
  'maxValue' : [] | [number],
  'timeOfDay' : [] | [TimeOfDay],
}
export interface UserAchievement {
  'completedAt' : string,
  'achievementId' : Id,
  'userId' : Principal,
  'receivedPoints' : number,
}
export interface UserAchievementResult {
  'completedAt' : string,
  'achievementId' : Id,
  'userId' : Principal,
  'achievement' : Achievement,
  'receivedPoints' : number,
}
export interface UserCompletedTask {
  'completedAt' : string,
  'userId' : Principal,
  'taskId' : Id,
  'receivedPoints' : number,
}
export interface UserCompletedTaskResult {
  'completedAt' : string,
  'userId' : Principal,
  'task' : Task,
  'taskId' : Id,
  'receivedPoints' : number,
}
export interface UserPayload {
  'id' : [] | [Principal],
  'country' : [] | [string],
  'name' : [] | [string],
}
export interface UserResult {
  'id' : Principal,
  'country' : [] | [string],
  'name' : [] | [string],
  'createdAt' : string,
  'achievements' : bigint,
  'points' : number,
}
export interface UserWithId {
  'id' : Principal,
  'country' : [] | [string],
  'name' : [] | [string],
  'createdAt' : string,
  'points' : number,
}
export interface _SERVICE {
  '_init' : ActorMethod<[], undefined>,
  'addAchievementToUser' : ActorMethod<
    [{ 'achievementId' : Id, 'userId' : [] | [Principal] }],
    Result
  >,
  'awardPost' : ActorMethod<
    [{ 'awardType' : AwardType, 'postId' : Id }],
    Result
  >,
  'claimAllPoints' : ActorMethod<[], Result>,
  'claimPointsByPost' : ActorMethod<[{ 'postId' : Id }], Result>,
  'completeTask' : ActorMethod<[{ 'taskId' : Id }], Result>,
  'createPost' : ActorMethod<[PostPayload], Result>,
  'createTask' : ActorMethod<[CreateTaskPayload], Result>,
  'deletePost' : ActorMethod<[{ 'postId' : Id }], Result>,
  'getAchievementsByUser' : ActorMethod<
    [{ 'userId' : [] | [Principal] }],
    Array<UserAchievementResult>
  >,
  'getAllAchievements' : ActorMethod<[], Array<AchievementResult>>,
  'getAllPostAwards' : ActorMethod<[], Array<PostAward>>,
  'getAllPostLikes' : ActorMethod<[], Array<PostLike>>,
  'getAllPosts' : ActorMethod<[], Array<PostResult>>,
  'getAllRewards' : ActorMethod<[], Array<RewardWithId>>,
  'getAllTasks' : ActorMethod<[], Array<TaskWithId>>,
  'getAllTasksToday' : ActorMethod<[], Array<TaskWithId>>,
  'getAllUserAchievements' : ActorMethod<[], Array<UserAchievement>>,
  'getAllUserCompletedTasks' : ActorMethod<[], Array<UserCompletedTask>>,
  'getAllUsers' : ActorMethod<[], Array<UserWithId>>,
  'getAwardsByPost' : ActorMethod<[{ 'postId' : Id }], Array<PostAward>>,
  'getCompletedTasksByUser' : ActorMethod<
    [{ 'userId' : [] | [Principal] }],
    Array<UserCompletedTaskResult>
  >,
  'getLikesByPost' : ActorMethod<[{ 'postId' : Id }], Array<PostLike>>,
  'getPostAwardsByUser' : ActorMethod<
    [{ 'userId' : [] | [Principal] }],
    Array<PostResult>
  >,
  'getPostById' : ActorMethod<[{ 'id' : Id }], [] | [PostWithId]>,
  'getPostLikesByUser' : ActorMethod<
    [{ 'userId' : [] | [Principal] }],
    Array<PostResult>
  >,
  'getPostsByUser' : ActorMethod<
    [{ 'userId' : [] | [Principal] }],
    Array<PostResult>
  >,
  'getTaskById' : ActorMethod<[{ 'id' : Id }], [] | [TaskWithId]>,
  'getUser' : ActorMethod<[{ 'id' : [] | [Principal] }], UserResult>,
  'likeOrDislikePost' : ActorMethod<
    [{ 'likeType' : LikeType, 'postId' : Id }],
    Result
  >,
  'redeemReward' : ActorMethod<[{ 'code' : string }], Result>,
  'updateOrCreateUser' : ActorMethod<[UserPayload], Result_1>,
  'updatePostContent' : ActorMethod<
    [{ 'content' : string, 'postId' : Id }],
    Result
  >,
  'updateTask' : ActorMethod<[UpdateTaskPayload], Result>,
  'whoami' : ActorMethod<[], Principal>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
