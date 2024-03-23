<<<<<<< HEAD
export const idlFactory = ({ IDL }) => { return IDL.Service({}); };
=======
export const idlFactory = ({ IDL }) => {
  const Task = IDL.Record({
    'id' : IDL.Opt(IDL.Text),
    'title' : IDL.Text,
    'timeStart' : IDL.Text,
    'description' : IDL.Text,
    'emoji' : IDL.Text,
    'taskType' : IDL.Variant({
      'TimeBased' : IDL.Null,
      'DistanceBased' : IDL.Null,
      'StepBased' : IDL.Null,
    }),
    'timeEnd' : IDL.Text,
    'timeOfDay' : IDL.Variant({
      'Afternoon' : IDL.Null,
      'Morning' : IDL.Null,
      'Evening' : IDL.Null,
    }),
  });
  const MessageResult = IDL.Record({ 'message' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : MessageResult, 'err' : MessageResult });
  const User = IDL.Record({
    'id' : IDL.Opt(IDL.Text),
    'nickname' : IDL.Text,
    'achievementsId' : IDL.Opt(IDL.Text),
    'points' : IDL.Opt(IDL.Float64),
  });
  const Result_3 = IDL.Variant({
    'ok' : IDL.Record({ 'id' : IDL.Text, 'message' : IDL.Text }),
    'err' : MessageResult,
  });
  const Result_2 = IDL.Variant({ 'ok' : Task, 'err' : MessageResult });
  const Result_1 = IDL.Variant({
    'ok' : IDL.Opt(IDL.Text),
    'err' : MessageResult,
  });
  return IDL.Service({
    'createTask' : IDL.Func([IDL.Text, Task], [Result], []),
    'createUser' : IDL.Func([User], [Result_3], []),
    'getAfternoonTaskList' : IDL.Func([IDL.Text], [Result_2], []),
    'getAllMorningTaskList' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, Task))],
        [],
      ),
    'getEveningTaskList' : IDL.Func([IDL.Text], [Result_2], []),
    'getMorningTaskList' : IDL.Func([IDL.Text], [Result_2], []),
    'getUser' : IDL.Func([IDL.Principal], [Result_1], []),
    'updateUserNickname' : IDL.Func([User], [Result], []),
  });
};
>>>>>>> 203fe7733cbf1d7cea5c1b9abc0418b63dbad3c7
export const init = ({ IDL }) => { return []; };
