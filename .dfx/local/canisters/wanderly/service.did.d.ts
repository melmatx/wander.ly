import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Achievement {
  'name' : string,
  'description' : string,
  'emoji' : string,
  'points' : number,
}
export interface AchievementWithId {
  'id' : Id,
  'name' : string,
  'description' : string,
  'emoji' : string,
  'points' : number,
}
export type Id = string;
export interface MessageResult { 'message' : string }
export interface PostAward { 'userId' : Principal, 'postId' : Id }
export interface PostComplete {
  'id' : Id,
  'content' : string,
  'userId' : Principal,
  'likes' : bigint,
  'taskId' : Id,
  'awards' : bigint,
  'image' : string,
  'place' : string,
  'points' : number,
}
export interface PostLike { 'userId' : Principal, 'postId' : Id }
export interface PostPayload {
  'content' : string,
  'taskId' : Id,
  'image' : string,
  'place' : string,
}
export interface PostWithId {
  'id' : Id,
  'content' : string,
  'userId' : Principal,
  'taskId' : Id,
  'image' : string,
  'place' : string,
  'points' : number,
}
export type Result = { 'ok' : MessageResult } |
  { 'err' : MessageResult };
export interface RewardWithId { 'id' : Id, 'name' : string, 'points' : number }
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
export interface TaskPayload {
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
export interface UserWithId {
  'id' : Principal,
  'country' : [] | [string],
  'name' : [] | [string],
  'points' : number,
}
export interface _SERVICE {
  '_init' : ActorMethod<[], undefined>,
  'addAchievementToUser' : ActorMethod<
    [{ 'achievementId' : Id, 'userId' : [] | [Principal] }],
    Result
  >,
  'awardPost' : ActorMethod<[{ 'postId' : Id }], Result>,
  'claimAllPoints' : ActorMethod<[], Result>,
  'claimPointsByPost' : ActorMethod<[{ 'postId' : Id }], Result>,
  'completeTask' : ActorMethod<[{ 'taskId' : Id }], Result>,
  'createPost' : ActorMethod<[PostPayload], Result>,
  'createTask' : ActorMethod<[TaskPayload], Result>,
  'getAchievementsByUser' : ActorMethod<
    [{ 'userId' : [] | [Principal] }],
    Array<[Id, UserAchievementResult]>
  >,
  'getAllAchievements' : ActorMethod<[], Array<[Id, AchievementWithId]>>,
  'getAllPostAwards' : ActorMethod<[], Array<[Id, PostAward]>>,
  'getAllPostLikes' : ActorMethod<[], Array<[Id, PostLike]>>,
  'getAllPosts' : ActorMethod<[], Array<[Id, PostComplete]>>,
  'getAllRewards' : ActorMethod<[], Array<[Id, RewardWithId]>>,
  'getAllTasks' : ActorMethod<[], Array<[Id, TaskWithId]>>,
  'getAllUserAchievements' : ActorMethod<[], Array<[Id, UserAchievement]>>,
  'getAllUserCompletedTasks' : ActorMethod<[], Array<[Id, UserCompletedTask]>>,
  'getAllUsers' : ActorMethod<[], Array<[Principal, UserWithId]>>,
  'getAwardsByPost' : ActorMethod<[{ 'postId' : Id }], Array<[Id, PostAward]>>,
  'getCompletedTasksByUser' : ActorMethod<
    [{ 'userId' : [] | [Principal] }],
    Array<[Id, UserCompletedTaskResult]>
  >,
  'getLikesByPost' : ActorMethod<[{ 'postId' : Id }], Array<[Id, PostLike]>>,
  'getPostById' : ActorMethod<[{ 'id' : Id }], [] | [PostWithId]>,
  'getPostsByUser' : ActorMethod<
    [{ 'userId' : [] | [Principal] }],
    Array<[Id, PostWithId]>
  >,
  'getTaskById' : ActorMethod<[{ 'id' : Id }], [] | [TaskWithId]>,
  'getUser' : ActorMethod<[{ 'id' : [] | [Principal] }], UserWithId>,
  'likeOrDislikePost' : ActorMethod<[{ 'postId' : Id }], Result>,
  'updateOrCreateUser' : ActorMethod<[UserPayload], Result>,
  'updatePostContent' : ActorMethod<
    [{ 'content' : string, 'postId' : Id }],
    Result
  >,
  'whoami' : ActorMethod<[], Principal>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
