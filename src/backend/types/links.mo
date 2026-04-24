import Common "common";

module {
  public type Link = {
    id : Common.LinkId;
    title : Text;
    description : Text;
    url : Text;
    platform : Common.Platform;
    category : Common.Category;
    genre : ?Common.Genre;
    contentLanguage : ?Common.ContentLanguage;
    coverPhotoUrl : ?Text;
    mediaUrl : ?Text;
    addedAt : Common.Timestamp;
    addedBy : Principal;
  };

  public type WatchlistEntry = {
    id : Nat;
    linkId : Common.LinkId;
    addedAt : Common.Timestamp;
    owner : Principal;
  };

  public type WatchlistInput = {
    linkId : Common.LinkId;
  };

  public type WatchlistEntryView = {
    id : Text;
    linkId : Text;
    addedAt : Common.Timestamp;
    owner : Text;
  };
};
