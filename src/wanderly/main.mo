import Map "mo:map/Map";
import { phash } "mo:map/Map";
import { thash } "mo:map/Map";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Source "mo:uuid/async/SourceV4";
import UUID "mo:uuid/UUID";

actor Wanderly {
  type Id = Text;

  type MessageResult = {
    message : Text;
  };

  type User = {
    id : Text;
    firstName : Text;
    middleName : ?Text;
    lastName : Text;
    gender : Text;
    birthDate : Text;
    address : Text;
    departmentCode : Text;
    branchName : Text;
  };

  type Teacher = User;

  type Student = User and {
    sectionCode : Text;
    programCode : Text;
    parentsEmail : Text;
    points : Float;
  };

  type Section = {
    id : Text;
    teacherId : Text;
    name : Text;
  };

  type Subject = {
    id : Text;
    teacherId : Text;
    name : Text;
  };

  type CreateStudentPayload = {
    id : ?Text;
    firstName : Text;
    middleName : ?Text;
    lastName : Text;
    gender : Text;
    birthDate : Text;
    address : Text;
    parentsEmail : Text;
    sectionCode : Text;
    programCode : Text;
    departmentCode : Text;
    branchName : Text;
  };

  type CreateTeacherPayload = {
    id : ?Text;
    firstName : Text;
    middleName : ?Text;
    lastName : Text;
    gender : Text;
    birthDate : Text;
    address : Text;
    departmentCode : Text;
    branchName : Text;
  };

  type Attendance = {
    studentId : Text;
    serialized : Text;
    hashed : Text;
  };

  stable let students = Map.new<Principal, Student>();
  stable let teachers = Map.new<Principal, Teacher>();
  stable let teacherStudents = Map.new<Principal, [Student]>();
  stable var attendances : [Attendance] = [];

  func isStudent(caller : Principal) : Bool {
    switch (Map.contains(students, phash, caller)) {
      case (null) {
        return false;
      };
      case (?student) {
        return true;
      };
    };
  };

  func isTeacher(caller : Principal) : Bool {
    switch (Map.contains(teachers, phash, caller)) {
      case (null) {
        return false;
      };
      case (?teacher) {
        return true;
      };
    };
  };

  func generateUUID() : async Text {
    let g = Source.Source();
    return UUID.toText(await g.new());
  };

  public shared (msg) func whoami() : async Principal {
    msg.caller;
  };

  public shared ({ caller }) func getRoleAndProfile() : async Result.Result<{ role : Text; profile : Teacher or Student }, MessageResult> {
    if (isStudent(caller)) {
      switch (Map.get(students, phash, caller)) {
        case (null) {};
        case (?student) {
          return #ok({ role = "STUDENT"; profile = student });
        };
      };
    };

    if (isTeacher(caller)) {
      switch (Map.get(teachers, phash, caller)) {
        case (null) {};
        case (?teacher) {
          return #ok({ role = "TEACHER"; profile = teacher });
        };
      };
    };

    return #err({ message = "No role found!" });
  };

  public shared ({ caller }) func createStudent(payload : CreateStudentPayload) : async Result.Result<MessageResult and { id : Text }, MessageResult> {
    if (Principal.isAnonymous(caller)) {
      return #err({ message = "Anonymous identity found!" });
    };

    // Generate student id
    let studentId : Text = do {
      switch (payload.id) {
        case (null) {
          await generateUUID();
        };
        case (?id) {
          id;
        };
      };
    };

    let newStudent : Student = {
      id = studentId;
      firstName = payload.firstName;
      middleName = payload.middleName;
      lastName = payload.lastName;
      gender = payload.gender;
      birthDate = payload.birthDate;
      address = payload.address;
      departmentCode = payload.departmentCode;
      branchName = payload.branchName;
      sectionCode = payload.sectionCode;
      programCode = payload.programCode;
      parentsEmail = payload.parentsEmail;
      points = 0.0;
    };

    // Create new student
    switch (Map.add(students, phash, caller, newStudent)) {
      case (null) {
        return #ok({
          message = "Student account created successfully!";
          id = studentId;
        });
      };
      case (?student) {
        return #err({ message = "Student already exists!" });
      };
    };
  };

  public shared ({ caller }) func createTeacher(payload : CreateTeacherPayload) : async Result.Result<MessageResult and { id : Text }, MessageResult> {
    // if (Principal.isAnonymous(caller)) {
    //   return #err({ message = "Anonymous identity found!" });
    // };

    // Generate teacher id
    let teacherId : Text = do {
      switch (payload.id) {
        case (null) {
          await generateUUID();
        };
        case (?id) {
          id;
        };
      };
    };

    let newTeacher : Teacher = {
      id = teacherId;
      firstName = payload.firstName;
      middleName = payload.middleName;
      lastName = payload.lastName;
      gender = payload.gender;
      birthDate = payload.birthDate;
      address = payload.address;
      departmentCode = payload.departmentCode;
      branchName = payload.branchName;
    };

    // Add new teacher
    switch (Map.add(teachers, phash, caller, newTeacher)) {
      case (null) {
        return #ok({
          message = "Teacher account created successfully!";
          id = teacherId;
        });
      };
      case (?teacher) {
        return #err({ message = "Teacher already exists!" });
      };
    };
  };

  public shared ({ caller }) func createAttendance(payload : Attendance) : async Result.Result<MessageResult, MessageResult> {
    if (not isTeacher(caller)) {
      return #err({ message = "You need to be a teacher to do this!" });
    };

    let newAttendance = {
      studentId = payload.studentId;
      serialized = payload.serialized;
      hashed = payload.hashed;
    };

    let attendanceBuffer = Buffer.fromArray<Attendance>(attendances);
    attendanceBuffer.add(newAttendance);
    attendances := Buffer.toArray<Attendance>(attendanceBuffer);

    return #ok({ message = "Attendance created successfully!" });
  };

  public func getStudent(principal : Principal) : async Result.Result<Student, MessageResult> {
    switch (Map.get(students, phash, principal)) {
      case (null) {
        return #err({ message = "No student found" });
      };
      case (?student) {
        return #ok(student);
      };
    };
  };

  public func getTeacher(principal : Principal) : async Result.Result<Teacher, MessageResult> {
    switch (Map.get(teachers, phash, principal)) {
      case (null) {
        return #err({ message = "No teacher found" });
      };
      case (?teacher) {
        return #ok(teacher);
      };
    };
  };
};
