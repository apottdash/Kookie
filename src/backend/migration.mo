import NewLinkTypes "types/links";
import NewCommon "types/common";
import CommunityTypes "types/community";
import WatchlistLib "lib/watchlist";
import List "mo:core/List";
import Map "mo:core/Map";
import Set "mo:core/Set";

module {
  // ── Old inline type definitions (from .old/src/backend/types/) ──────────────

  type OldTimestamp = Int;
  type OldLinkId = Nat;

  type OldPlatform = {
    #Netflix; #Viki; #YouTube; #Webtoon; #Tapas; #MangaDex;
    #Tappytoon; #Lezhin; #Bato; #Spotify; #SoundCloud; #Wattpad;
    #Other : Text;
  };

  type OldCategory = {
    #BTS_LIVE; #BTS_SONGS; #K_DRAMA; #MANHWA; #FANFICTION;
  };

  type OldGenre = {
    #Pop; #HipHop; #Ballad; #Rap; #EDM; #RnB;
    #Romance; #Action; #Comedy; #Drama; #Fantasy;
    #Thriller; #Historical; #Mystery; #AU;
  };

  type OldContentLanguage = {
    #English; #French; #Hindi; #Korean; #Spanish;
  };

  type OldLink = {
    id : OldLinkId;
    title : Text;
    description : Text;
    url : Text;
    platform : OldPlatform;
    category : OldCategory;
    genre : ?OldGenre;
    contentLanguage : ?OldContentLanguage;
    addedAt : OldTimestamp;
    addedBy : Principal;
  };

  // Community types are identical old vs new — reuse CommunityTypes directly
  // WatchlistEntry is also unchanged

  // ── Actor state shapes ───────────────────────────────────────────────────────

  type OldActor = {
    admins : Set.Set<Principal>;
    links : List.List<OldLink>;
    linkCounter : [var Nat];
    profiles : Map.Map<Principal, CommunityTypes.Profile>;
    posts : List.List<CommunityTypes.Post>;
    comments : List.List<CommunityTypes.Comment>;
    likes : Set.Set<Text>;
    postCounter : [var Nat];
    commentCounter : [var Nat];
    watchlistEntries : Map.Map<Principal, List.List<NewLinkTypes.WatchlistEntry>>;
    watchlistCounter : [var Nat];
    seeded : Bool;
  };

  type NewActor = {
    admins : Set.Set<Principal>;
    links : List.List<NewLinkTypes.Link>;
    linkCounter : [var Nat];
    profiles : Map.Map<Principal, CommunityTypes.Profile>;
    posts : List.List<CommunityTypes.Post>;
    comments : List.List<CommunityTypes.Comment>;
    likes : Set.Set<Text>;
    postCounter : [var Nat];
    commentCounter : [var Nat];
    watchlistEntries : Map.Map<Principal, List.List<NewLinkTypes.WatchlistEntry>>;
    watchlistCounter : [var Nat];
    seeded : Bool;
  };

  // ── Migration function ───────────────────────────────────────────────────────

  public func run(old : OldActor) : NewActor {
    // Migrate each Link: add coverPhotoUrl = null and mediaUrl = null
    let newLinks = old.links.map<OldLink, NewLinkTypes.Link>(
      func(l) {
        {
          id = l.id;
          title = l.title;
          description = l.description;
          url = l.url;
          platform = l.platform;
          category = l.category;
          genre = l.genre;
          contentLanguage = l.contentLanguage;
          coverPhotoUrl = null;
          mediaUrl = null;
          addedAt = l.addedAt;
          addedBy = l.addedBy;
        }
      }
    );

    {
      admins = old.admins;
      links = newLinks;
      linkCounter = old.linkCounter;
      profiles = old.profiles;
      posts = old.posts;
      comments = old.comments;
      likes = old.likes;
      postCounter = old.postCounter;
      commentCounter = old.commentCounter;
      watchlistEntries = old.watchlistEntries;
      watchlistCounter = old.watchlistCounter;
      seeded = old.seeded;
    };
  };
};
