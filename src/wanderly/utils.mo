import SourceV4 "mo:uuid/async/SourceV4";
import UUID "mo:uuid/UUID";
import Principal "mo:base/Principal";

module {
  // Generate ID
  public func generateUUID() : async Text {
    let g = SourceV4.Source();
    return UUID.toText(await g.new());
  };

  // Check if user is anonymous
  public func isUserAnonymous(caller : Principal) : Bool {
    // return Principal.isAnonymous(caller);
    return false;
  };
};
