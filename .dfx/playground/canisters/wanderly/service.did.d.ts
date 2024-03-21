import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface MessageResult { 'message' : string }
export type Result = { 'ok' : MessageResult } |
  { 'err' : MessageResult };
export type Result_1 = { 'ok' : [] | [string] } |
  { 'err' : MessageResult };
export type Result_2 = { 'ok' : { 'id' : string, 'message' : string } } |
  { 'err' : MessageResult };
export interface User {
  'id' : [] | [string],
  'nickname' : string,
  'achievementsId' : [] | [string],
  'points' : [] | [number],
}
export interface _SERVICE {
  'createUser' : ActorMethod<[User], Result_2>,
  'getUser' : ActorMethod<[Principal], Result_1>,
  'updateUserNickname' : ActorMethod<[User], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
