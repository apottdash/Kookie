import Types "../types/links";
import WatchlistLib "../lib/watchlist";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";

mixin (watchlistState : WatchlistLib.WatchlistState) {
  func requireAuth(caller : Principal) {
    if (caller == Principal.fromText("2vxsx-fae")) {
      Runtime.trap("Authentication required");
    };
  };

  func toView(entry : Types.WatchlistEntry) : Types.WatchlistEntryView {
    {
      id = entry.id.toText();
      linkId = entry.linkId.toText();
      addedAt = entry.addedAt;
      owner = entry.owner.toText();
    }
  };

  public query ({ caller }) func getWatchlist() : async [Types.WatchlistEntryView] {
    requireAuth(caller);
    let raw = WatchlistLib.getEntries(watchlistState, caller);
    raw.map<Types.WatchlistEntry, Types.WatchlistEntryView>(toView)
  };

  public shared ({ caller }) func addToWatchlist(input : Types.WatchlistInput) : async { #ok : Types.WatchlistEntryView; #err : Text } {
    requireAuth(caller);
    switch (WatchlistLib.addEntry(watchlistState, caller, input.linkId)) {
      case (#ok entry) #ok(toView(entry));
      case (#alreadyExists) #err("Link already in watchlist");
    };
  };

  public shared ({ caller }) func removeFromWatchlist(entryId : Text) : async Bool {
    requireAuth(caller);
    switch (Nat.fromText(entryId)) {
      case null false;
      case (?id) WatchlistLib.removeEntry(watchlistState, caller, id);
    };
  };

  public query ({ caller }) func isInWatchlist(linkId : Text) : async Bool {
    requireAuth(caller);
    switch (Nat.fromText(linkId)) {
      case null false;
      case (?id) WatchlistLib.hasEntry(watchlistState, caller, id);
    };
  };
};
