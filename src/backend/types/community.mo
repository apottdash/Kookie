import Common "common";

module {
  public type Profile = {
    principal : Principal;
    var username : Text;
    var bio : Text;
    joinedAt : Common.Timestamp;
    var country : ?Text;
    var fandom : ?Text;
    var preferredLanguage : ?Common.ContentLanguage;
    var subtitlePreference : Bool;
    var profileCompleted : Bool;
  };

  public type ProfileView = {
    principal : Principal;
    username : Text;
    bio : Text;
    joinedAt : Common.Timestamp;
    country : ?Text;
    fandom : ?Text;
    preferredLanguage : ?Common.ContentLanguage;
    subtitlePreference : Bool;
    profileCompleted : Bool;
  };

  public type Post = {
    id : Common.PostId;
    author : Principal;
    var content : Text;
    hashtags : [Text];
    createdAt : Common.Timestamp;
    var likesCount : Nat;
    var flagged : Bool;
  };

  public type PostView = {
    id : Common.PostId;
    author : Principal;
    content : Text;
    hashtags : [Text];
    createdAt : Common.Timestamp;
    likesCount : Nat;
    flagged : Bool;
  };

  public type Comment = {
    id : Common.CommentId;
    postId : Common.PostId;
    author : Principal;
    content : Text;
    createdAt : Common.Timestamp;
  };
};
