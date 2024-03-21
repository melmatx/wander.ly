export const idlFactory = ({ IDL }) => {
  const User = IDL.Record({
    'id' : IDL.Opt(IDL.Text),
    'nickname' : IDL.Text,
    'achievementsId' : IDL.Opt(IDL.Text),
    'points' : IDL.Opt(IDL.Float64),
  });
  const MessageResult = IDL.Record({ 'message' : IDL.Text });
  const Result_2 = IDL.Variant({
    'ok' : IDL.Record({ 'id' : IDL.Text, 'message' : IDL.Text }),
    'err' : MessageResult,
  });
  const Result_1 = IDL.Variant({
    'ok' : IDL.Opt(IDL.Text),
    'err' : MessageResult,
  });
  const Result = IDL.Variant({ 'ok' : MessageResult, 'err' : MessageResult });
  return IDL.Service({
    'createUser' : IDL.Func([User], [Result_2], []),
    'getUser' : IDL.Func([IDL.Principal], [Result_1], []),
    'updateUserNickname' : IDL.Func([User], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
