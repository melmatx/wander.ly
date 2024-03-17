import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Attendance {
  'studentId' : string,
  'serialized' : string,
  'hashed' : string,
}
export interface CreateStudentPayload {
  'id' : [] | [string],
  'departmentCode' : string,
  'birthDate' : string,
  'sectionCode' : string,
  'middleName' : [] | [string],
  'address' : string,
  'gender' : string,
  'programCode' : string,
  'branchName' : string,
  'parentsEmail' : string,
  'lastName' : string,
  'firstName' : string,
}
export interface CreateTeacherPayload {
  'id' : [] | [string],
  'departmentCode' : string,
  'birthDate' : string,
  'middleName' : [] | [string],
  'address' : string,
  'gender' : string,
  'branchName' : string,
  'lastName' : string,
  'firstName' : string,
}
export interface MessageResult { 'message' : string }
export type Result = { 'ok' : Teacher } |
  { 'err' : MessageResult };
export type Result_1 = { 'ok' : Student } |
  { 'err' : MessageResult };
export type Result_2 = { 'ok' : { 'role' : string, 'profile' : Teacher } } |
  { 'err' : MessageResult };
export type Result_3 = { 'ok' : { 'id' : string, 'message' : string } } |
  { 'err' : MessageResult };
export type Result_4 = { 'ok' : MessageResult } |
  { 'err' : MessageResult };
export interface Student {
  'id' : string,
  'departmentCode' : string,
  'birthDate' : string,
  'sectionCode' : string,
  'middleName' : [] | [string],
  'address' : string,
  'gender' : string,
  'programCode' : string,
  'branchName' : string,
  'parentsEmail' : string,
  'lastName' : string,
  'points' : number,
  'firstName' : string,
}
export interface Teacher {
  'id' : string,
  'departmentCode' : string,
  'birthDate' : string,
  'middleName' : [] | [string],
  'address' : string,
  'gender' : string,
  'branchName' : string,
  'lastName' : string,
  'firstName' : string,
}
export interface _SERVICE {
  'createAttendance' : ActorMethod<[Attendance], Result_4>,
  'createStudent' : ActorMethod<[CreateStudentPayload], Result_3>,
  'createTeacher' : ActorMethod<[CreateTeacherPayload], Result_3>,
  'getRoleAndProfile' : ActorMethod<[], Result_2>,
  'getStudent' : ActorMethod<[Principal], Result_1>,
  'getTeacher' : ActorMethod<[Principal], Result>,
  'whoami' : ActorMethod<[], Principal>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
