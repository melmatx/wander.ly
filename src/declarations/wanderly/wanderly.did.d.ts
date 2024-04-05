import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface MessageResult { 'message' : string }
export type Result = { 'ok' : MessageResult } |
  { 'err' : MessageResult };
export type Result_1 = { 'ok' : [] | [string] } |
  { 'err' : MessageResult };
export type Result_2 = { 'ok' : Task } |
  { 'err' : MessageResult };
export type Result_3 = { 'ok' : { 'id' : string, 'message' : string } } |
  { 'err' : MessageResult };
export interface Task {
  'id' : [] | [string],
  'title' : string,
  'timeStart' : string,
  'description' : string,
  'emoji' : string,
  'taskType' : { 'TimeBased' : null } |
    { 'DistanceBased' : null } |
    { 'StepBased' : null },
  'timeEnd' : string,
  'timeOfDay' : { 'Afternoon' : null } |
    { 'Morning' : null } |
    { 'Evening' : null },
}
export interface User {
  'id' : [] | [string],
  'nickname' : string,
  'achievementsId' : [] | [string],
  'points' : [] | [number],
}
export interface _SERVICE {
  'createTask' : ActorMethod<[string, Task], Result>,
  'createUser' : ActorMethod<[User], Result_3>,
  'getAfternoonTaskList' : ActorMethod<[string], Result_2>,
  'getAllAfternoonTasks' : ActorMethod<[], Array<[string, Task]>>,
  'getAllEveningTasks' : ActorMethod<[], Array<[string, Task]>>,
  'getAllMorningTasks' : ActorMethod<[], Array<[string, Task]>>,
  'getEveningTaskList' : ActorMethod<[string], Result_2>,
  'getMorningTaskList' : ActorMethod<[string], Result_2>,
  'getUser' : ActorMethod<[Principal], Result_1>,
  'updateUserNickname' : ActorMethod<[User], Result>,
  'whoami' : ActorMethod<[], Principal>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
