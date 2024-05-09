import Debug "mo:base/Debug";
import SourceV4 "mo:uuid/async/SourceV4";
import UUID "mo:uuid/UUID";
import Principal "mo:base/Principal";
import DateTime "mo:datetime/DateTime";
import LocalDateTime "mo:datetime/LocalDateTime";

module {
  // Generate ID
  public func generateUUID() : async Text {
    let g = SourceV4.Source();
    return UUID.toText(await g.new());
  };

  // Check if user is anonymous
  public func isUserAnonymous(caller : Principal) : Bool {
    return Principal.isAnonymous(caller);
    // return false;
  };

  // Removes time from DateTime
  public func clearTime(oldDate : DateTime.DateTime) : DateTime.DateTime {
    let oldComponents = oldDate.toComponents();

    DateTime.fromComponents({
      oldComponents with
      hour = 0;
      minute = 0;
      nanosecond = 0;
    });
  };

  // Removes time from LocalDateTime
  public func clearLocalTime(oldDate : LocalDateTime.LocalDateTime) : LocalDateTime.LocalDateTime {
    let oldComponents = oldDate.toComponents();

    switch (LocalDateTime.fromComponents({ oldComponents with hour = 0; minute = 0; nanosecond = 0 }, oldDate.timeZone)) {
      case (null) {
        Debug.trap("Failed to clear time for local date!");
      };
      case (?newDate) {
        newDate;
      };
    };
  };

  // Get local time in DateTime object
  // public func getCurrentTime(timeZone : LocalDateTime.TimeZone) : DateTime.DateTime {
  //   return DateTime.fromComponents(LocalDateTime.now(timeZone).toComponents());
  // };
};
