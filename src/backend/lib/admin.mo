import Set "mo:core/Set";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

module {
  // Hardcoded admin principals — replace with real admin principal IDs
  let ADMIN_PRINCIPALS : [Text] = [
    "2vxsx-fae", // placeholder — add real admin principals here
  ];

  public func isAdmin(admins : Set.Set<Principal>, caller : Principal) : Bool {
    let callerText = caller.toText();
    for (p in ADMIN_PRINCIPALS.vals()) {
      if (p == callerText) return true;
    };
    admins.contains(caller)
  };

  public func requireAdmin(admins : Set.Set<Principal>, caller : Principal) : () {
    if (not isAdmin(admins, caller)) {
      Runtime.trap("Unauthorized: admin access required");
    };
  };
};
