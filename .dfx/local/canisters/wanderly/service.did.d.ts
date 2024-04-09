import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

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
  'points' : bigint,
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
  'points' : bigint,
}
export type Result = { 'ok' : MessageResult } |
  { 'err' : MessageResult };
export type TaskType = { 'TimeBased' : null } |
  { 'DistanceBased' : null } |
  { 'StepBased' : null };
export interface TaskWithId {
  'id' : Id,
  'completedAt' : string,
  'title' : string,
  'timeStart' : string,
  'description' : string,
  'emoji' : string,
  'taskType' : TaskType,
  'timeEnd' : string,
  'maxValue' : number,
  'timeOfDay' : TimeOfDay,
}
export type TimeOfDay = { 'Afternoon' : null } |
  { 'Morning' : null } |
  { 'Evening' : null };
export interface UserPayload {
  'id' : [] | [Principal],
  'country' : [] | [string],
  'name' : [] | [string],
}
export interface UserWithId {
  'id' : Principal,
  'country' : [] | [string],
  'name' : [] | [string],
  'points' : bigint,
}
export interface _SERVICE {
  '_init' : ActorMethod<[], undefined>,
  'awardPost' : ActorMethod<[{ 'postId' : Id }], Result>,
  'claimAllPoints' : ActorMethod<[], Result>,
  'claimPointsByPost' : ActorMethod<[{ 'postId' : Id }], Result>,
  'createPost' : ActorMethod<[PostPayload], Result>,
  'getAllPostAwards' : ActorMethod<[], Array<[Id, PostAward]>>,
  'getAllPostLikes' : ActorMethod<[], Array<[Id, PostLike]>>,
  'getAllPosts' : ActorMethod<[], Array<[Id, PostComplete]>>,
  'getAllTasks' : ActorMethod<[], Array<[Id, TaskWithId]>>,
  'getAllUsers' : ActorMethod<[], Array<[Principal, UserWithId]>>,
  'getAwardsByPost' : ActorMethod<[{ 'postId' : Id }], Array<[Id, PostAward]>>,
  'getLikesByPost' : ActorMethod<[{ 'postId' : Id }], Array<[Id, PostLike]>>,
  'getPostById' : ActorMethod<[{ 'id' : Id }], [] | [PostWithId]>,
  'getPostsByUser' : ActorMethod<
    [{ 'userId' : [] | [Principal] }],
    Array<[Id, PostWithId]>
  >,
  'getTaskById' : ActorMethod<[{ 'id' : Id }], [] | [TaskWithId]>,
  'getUser' : ActorMethod<[{ 'id' : [] | [Principal] }], [] | [UserWithId]>,
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
