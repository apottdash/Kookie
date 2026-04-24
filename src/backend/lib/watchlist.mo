import Common "../types/common";
import Types "../types/links";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public type WatchlistState = {
    entries : Map.Map<Principal, List.List<Types.WatchlistEntry>>;
    counter : [var Nat];
  };

  func getOrCreateList(state : WatchlistState, owner : Principal) : List.List<Types.WatchlistEntry> {
    switch (state.entries.get(owner)) {
      case (?list) list;
      case null {
        let list = List.empty<Types.WatchlistEntry>();
        state.entries.add(owner, list);
        list;
      };
    };
  };

  public func addEntry(state : WatchlistState, owner : Principal, linkId : Common.LinkId) : { #ok : Types.WatchlistEntry; #alreadyExists } {
    let list = getOrCreateList(state, owner);
    if (list.any(func(e) { e.linkId == linkId })) {
      return #alreadyExists;
    };
    let entry : Types.WatchlistEntry = {
      id = state.counter[0];
      linkId;
      addedAt = Time.now();
      owner;
    };
    state.counter[0] += 1;
    list.add(entry);
    #ok(entry)
  };

  public func removeEntry(state : WatchlistState, owner : Principal, entryId : Nat) : Bool {
    switch (state.entries.get(owner)) {
      case null false;
      case (?list) {
        let sizeBefore = list.size();
        let filtered = list.filter(func(e) { e.id != entryId });
        list.clear();
        list.append(filtered);
        list.size() < sizeBefore;
      };
    };
  };

  public func getEntries(state : WatchlistState, owner : Principal) : [Types.WatchlistEntry] {
    switch (state.entries.get(owner)) {
      case null [];
      case (?list) list.toArray();
    };
  };

  public func hasEntry(state : WatchlistState, owner : Principal, linkId : Common.LinkId) : Bool {
    switch (state.entries.get(owner)) {
      case null false;
      case (?list) list.any(func(e) { e.linkId == linkId });
    };
  };
};
