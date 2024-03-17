export const idlFactory = ({ IDL }) => {
  const Attendance = IDL.Record({
    'studentId' : IDL.Text,
    'serialized' : IDL.Text,
    'hashed' : IDL.Text,
  });
  const MessageResult = IDL.Record({ 'message' : IDL.Text });
  const Result_4 = IDL.Variant({ 'ok' : MessageResult, 'err' : MessageResult });
  const CreateStudentPayload = IDL.Record({
    'id' : IDL.Opt(IDL.Text),
    'departmentCode' : IDL.Text,
    'birthDate' : IDL.Text,
    'sectionCode' : IDL.Text,
    'middleName' : IDL.Opt(IDL.Text),
    'address' : IDL.Text,
    'gender' : IDL.Text,
    'programCode' : IDL.Text,
    'branchName' : IDL.Text,
    'parentsEmail' : IDL.Text,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const Result_3 = IDL.Variant({
    'ok' : IDL.Record({ 'id' : IDL.Text, 'message' : IDL.Text }),
    'err' : MessageResult,
  });
  const CreateTeacherPayload = IDL.Record({
    'id' : IDL.Opt(IDL.Text),
    'departmentCode' : IDL.Text,
    'birthDate' : IDL.Text,
    'middleName' : IDL.Opt(IDL.Text),
    'address' : IDL.Text,
    'gender' : IDL.Text,
    'branchName' : IDL.Text,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const Teacher = IDL.Record({
    'id' : IDL.Text,
    'departmentCode' : IDL.Text,
    'birthDate' : IDL.Text,
    'middleName' : IDL.Opt(IDL.Text),
    'address' : IDL.Text,
    'gender' : IDL.Text,
    'branchName' : IDL.Text,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const Result_2 = IDL.Variant({
    'ok' : IDL.Record({ 'role' : IDL.Text, 'profile' : Teacher }),
    'err' : MessageResult,
  });
  const Student = IDL.Record({
    'id' : IDL.Text,
    'departmentCode' : IDL.Text,
    'birthDate' : IDL.Text,
    'sectionCode' : IDL.Text,
    'middleName' : IDL.Opt(IDL.Text),
    'address' : IDL.Text,
    'gender' : IDL.Text,
    'programCode' : IDL.Text,
    'branchName' : IDL.Text,
    'parentsEmail' : IDL.Text,
    'lastName' : IDL.Text,
    'points' : IDL.Float64,
    'firstName' : IDL.Text,
  });
  const Result_1 = IDL.Variant({ 'ok' : Student, 'err' : MessageResult });
  const Result = IDL.Variant({ 'ok' : Teacher, 'err' : MessageResult });
  return IDL.Service({
    'createAttendance' : IDL.Func([Attendance], [Result_4], []),
    'createStudent' : IDL.Func([CreateStudentPayload], [Result_3], []),
    'createTeacher' : IDL.Func([CreateTeacherPayload], [Result_3], []),
    'getRoleAndProfile' : IDL.Func([], [Result_2], []),
    'getStudent' : IDL.Func([IDL.Principal], [Result_1], []),
    'getTeacher' : IDL.Func([IDL.Principal], [Result], []),
    'whoami' : IDL.Func([], [IDL.Principal], []),
  });
};
export const init = ({ IDL }) => { return []; };
