import Common "../types/common";
import Types "../types/community";
import List "mo:core/List";
import Map "mo:core/Map";
import Set "mo:core/Set";
import Principal "mo:core/Principal";

module {
  // Helper: convert mutable Profile to immutable ProfileView
  func toProfileView(p : Types.Profile) : Types.ProfileView {
    {
      principal = p.principal;
      username = p.username;
      bio = p.bio;
      joinedAt = p.joinedAt;
      country = p.country;
      fandom = p.fandom;
      preferredLanguage = p.preferredLanguage;
      subtitlePreference = p.subtitlePreference;
      profileCompleted = p.profileCompleted;
    }
  };

  // Helper: convert mutable Post to immutable PostView
  func toPostView(p : Types.Post) : Types.PostView {
    { id = p.id; author = p.author; content = p.content; hashtags = p.hashtags; createdAt = p.createdAt; likesCount = p.likesCount; flagged = p.flagged }
  };

  // Build the unique like key: "principalText:postId"
  func likeKey(user : Principal, postId : Common.PostId) : Text {
    user.toText() # ":" # postId.toText()
  };

  // --- Profiles ---
  public func getProfile(profiles : Map.Map<Principal, Types.Profile>, user : Principal) : ?Types.ProfileView {
    switch (profiles.get(user)) {
      case (?p) ?toProfileView(p);
      case null null;
    }
  };

  public func setProfile(
    profiles : Map.Map<Principal, Types.Profile>,
    caller : Principal,
    username : Text,
    bio : Text,
    now : Common.Timestamp,
  ) : () {
    switch (profiles.get(caller)) {
      case (?p) {
        p.username := username;
        p.bio := bio;
      };
      case null {
        let profile : Types.Profile = {
          principal = caller;
          var username = username;
          var bio = bio;
          joinedAt = now;
          var country = null;
          var fandom = null;
          var preferredLanguage = null;
          var subtitlePreference = false;
          var profileCompleted = false;
        };
        profiles.add(caller, profile);
      };
    };
  };

  public func setOnboarding(
    profiles : Map.Map<Principal, Types.Profile>,
    caller : Principal,
    country : ?Text,
    fandom : ?Text,
    preferredLanguage : ?Common.ContentLanguage,
    subtitlePreference : Bool,
    now : Common.Timestamp,
  ) : () {
    switch (profiles.get(caller)) {
      case (?p) {
        p.country := country;
        p.fandom := fandom;
        p.preferredLanguage := preferredLanguage;
        p.subtitlePreference := subtitlePreference;
        p.profileCompleted := true;
      };
      case null {
        let profile : Types.Profile = {
          principal = caller;
          var username = "";
          var bio = "";
          joinedAt = now;
          var country = country;
          var fandom = fandom;
          var preferredLanguage = preferredLanguage;
          var subtitlePreference = subtitlePreference;
          var profileCompleted = true;
        };
        profiles.add(caller, profile);
      };
    };
  };

  // --- Posts ---
  public func listPosts(posts : List.List<Types.Post>) : [Types.PostView] {
    posts.map<Types.Post, Types.PostView>(func(p : Types.Post) : Types.PostView { toPostView(p) }).toArray()
  };

  public func getPost(posts : List.List<Types.Post>, id : Common.PostId) : ?Types.PostView {
    switch (posts.find(func(p : Types.Post) : Bool { p.id == id })) {
      case (?p) ?toPostView(p);
      case null null;
    }
  };

  public func createPost(
    posts : List.List<Types.Post>,
    nextId : Nat,
    caller : Principal,
    content : Text,
    hashtags : [Text],
    now : Common.Timestamp,
  ) : Types.PostView {
    let post : Types.Post = {
      id = nextId;
      author = caller;
      var content = content;
      hashtags;
      createdAt = now;
      var likesCount = 0;
      var flagged = false;
    };
    posts.add(post);
    toPostView(post)
  };

  public func flagPost(posts : List.List<Types.Post>, id : Common.PostId) : Bool {
    var found = false;
    posts.mapInPlace(func(p : Types.Post) : Types.Post {
      if (p.id == id) {
        found := true;
        p.flagged := true;
        p
      } else { p }
    });
    found
  };

  // --- Likes ---
  // Returns true if liked, false if unliked (toggle)
  public func likePost(
    likes : Set.Set<Text>,
    posts : List.List<Types.Post>,
    caller : Principal,
    postId : Common.PostId,
  ) : Bool {
    let key = likeKey(caller, postId);
    let textCmp = func(a : Text, b : Text) : { #less; #equal; #greater } { a.compare(b) };
    if (likes.contains(textCmp, key)) {
      // Unlike
      likes.remove(textCmp, key);
      posts.mapInPlace(func(p : Types.Post) : Types.Post {
        if (p.id == postId and p.likesCount > 0) {
          p.likesCount -= 1;
          p
        } else { p }
      });
      false
    } else {
      // Like
      likes.add(textCmp, key);
      posts.mapInPlace(func(p : Types.Post) : Types.Post {
        if (p.id == postId) {
          p.likesCount += 1;
          p
        } else { p }
      });
      true
    }
  };

  // --- Comments ---
  public func getComments(comments : List.List<Types.Comment>, postId : Common.PostId) : [Types.Comment] {
    comments.filter(func(c : Types.Comment) : Bool { c.postId == postId }).toArray()
  };

  public func addComment(
    comments : List.List<Types.Comment>,
    nextId : Nat,
    caller : Principal,
    postId : Common.PostId,
    content : Text,
    now : Common.Timestamp,
  ) : Types.Comment {
    let comment : Types.Comment = {
      id = nextId;
      postId;
      author = caller;
      content;
      createdAt = now;
    };
    comments.add(comment);
    comment
  };
};
