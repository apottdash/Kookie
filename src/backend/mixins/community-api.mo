import Common "../types/common";
import CommunityTypes "../types/community";
import CommunityLib "../lib/community";
import List "mo:core/List";
import Map "mo:core/Map";
import Set "mo:core/Set";
import Time "mo:core/Time";

mixin (
  profiles : Map.Map<Principal, CommunityTypes.Profile>,
  posts : List.List<CommunityTypes.Post>,
  comments : List.List<CommunityTypes.Comment>,
  likes : Set.Set<Text>,
  postCounter : [var Nat],
  commentCounter : [var Nat],
) {
  public query func getProfile(user : Principal) : async ?CommunityTypes.ProfileView {
    CommunityLib.getProfile(profiles, user)
  };

  public shared ({ caller }) func setProfile(username : Text, bio : Text) : async () {
    CommunityLib.setProfile(profiles, caller, username, bio, Time.now())
  };

  public shared ({ caller }) func setOnboarding(
    country : ?Text,
    fandom : ?Text,
    preferredLanguage : ?Common.ContentLanguage,
    subtitlePreference : Bool,
  ) : async () {
    CommunityLib.setOnboarding(profiles, caller, country, fandom, preferredLanguage, subtitlePreference, Time.now())
  };

  public query func listPosts() : async [CommunityTypes.PostView] {
    CommunityLib.listPosts(posts)
  };

  public query func getPost(id : Common.PostId) : async ?CommunityTypes.PostView {
    CommunityLib.getPost(posts, id)
  };

  public shared ({ caller }) func createPost(content : Text, hashtags : [Text]) : async CommunityTypes.PostView {
    let id = postCounter[0];
    postCounter[0] += 1;
    CommunityLib.createPost(posts, id, caller, content, hashtags, Time.now())
  };

  public shared ({ caller }) func likePost(postId : Common.PostId) : async Bool {
    CommunityLib.likePost(likes, posts, caller, postId)
  };

  public query func getComments(postId : Common.PostId) : async [CommunityTypes.Comment] {
    CommunityLib.getComments(comments, postId)
  };

  public shared ({ caller }) func addComment(postId : Common.PostId, content : Text) : async CommunityTypes.Comment {
    let id = commentCounter[0];
    commentCounter[0] += 1;
    CommunityLib.addComment(comments, id, caller, postId, content, Time.now())
  };

  public shared ({ caller }) func flagPost(id : Common.PostId) : async Bool {
    CommunityLib.flagPost(posts, id)
  };
};
