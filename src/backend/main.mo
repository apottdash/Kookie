import CommonTypes "types/common";
import LinkTypes "types/links";
import CommunityTypes "types/community";
import LinksApi "mixins/links-api";
import CommunityApi "mixins/community-api";
import WatchlistApi "mixins/watchlist-api";
import WatchlistLib "lib/watchlist";
import Migration "migration";

import List "mo:core/List";
import Map "mo:core/Map";
import Set "mo:core/Set";
import Time "mo:core/Time";
import Principal "mo:core/Principal";



(with migration = Migration.run)
actor {
  // Admin state
  let admins = Set.empty<Principal>();

  // Links state — shared mutable counter via [var Nat]
  let links = List.empty<LinkTypes.Link>();
  let linkCounter : [var Nat] = [var 0];

  // Community state
  let profiles = Map.empty<Principal, CommunityTypes.Profile>();
  let posts = List.empty<CommunityTypes.Post>();
  let comments = List.empty<CommunityTypes.Comment>();
  // Likes stored as "principal:postId" text keys for simple set membership
  let likes = Set.empty<Text>();
  let postCounter : [var Nat] = [var 0];
  let commentCounter : [var Nat] = [var 0];

  // Watchlist state
  let watchlistEntries = Map.empty<Principal, List.List<LinkTypes.WatchlistEntry>>();
  let watchlistCounter : [var Nat] = [var 0];
  let watchlistState : WatchlistLib.WatchlistState = {
    entries = watchlistEntries;
    counter = watchlistCounter;
  };

  // Seed flag — ensures sample data is only added on first deploy
  var seeded : Bool = false;

  // Seed sample links covering BTS_LIVE, K_DRAMA, MANHWA categories
  func seedLinks() {
    if (seeded) return;
    seeded := true;

    let seedAdmin = Principal.fromText("2vxsx-fae");
    let now = Time.now();

    let seedData : [(Text, Text, Text, CommonTypes.Platform, CommonTypes.Category, ?CommonTypes.Genre, ?CommonTypes.ContentLanguage, ?Text, ?Text)] = [
      (
        "BTS Permission to Dance on Stage - Seoul",
        "Watch BTS live concert Permission to Dance on Stage in Seoul on Weverse",
        "https://weverse.io/bts/live",
        #YouTube,
        #BTS_LIVE,
        null,
        ?#Korean,
        ?"https://img.youtube.com/vi/ArmDp-zijuc/maxresdefault.jpg",
        ?"ArmDp-zijuc",
      ),
      (
        "BTS Yet To Come - The Most Beautiful Moment Live",
        "BTS Yet To Come concert live performance stream on YouTube",
        "https://www.youtube.com/watch?v=bZ_C-AVo5OA",
        #YouTube,
        #BTS_LIVE,
        null,
        ?#Korean,
        ?"https://img.youtube.com/vi/bZ_C-AVo5OA/maxresdefault.jpg",
        ?"bZ_C-AVo5OA",
      ),
      (
        "Crash Landing on You",
        "Romantic drama starring Hyun Bin and Son Ye-jin — available on Netflix",
        "https://www.netflix.com/title/81159258",
        #Netflix,
        #K_DRAMA,
        ?#Romance,
        ?#Korean,
        ?"https://picsum.photos/seed/crash-landing/400/225",
        null,
      ),
      (
        "Goblin (Guardian: The Lonely and Great God)",
        "Fantasy romance K-drama starring Gong Yoo — available on Viki",
        "https://www.viki.com/tv/32014c-goblin",
        #Viki,
        #K_DRAMA,
        ?#Fantasy,
        ?#Korean,
        ?"https://picsum.photos/seed/goblin-kdrama/400/225",
        null,
      ),
      (
        "Tower of God",
        "Epic fantasy manhwa following Twenty-Fifth Bam — read on Webtoon",
        "https://www.webtoons.com/en/fantasy/tower-of-god/list?title_no=95",
        #Webtoon,
        #MANHWA,
        ?#Fantasy,
        ?#English,
        ?"https://picsum.photos/seed/tower-of-god/400/225",
        null,
      ),
      (
        "Noblesse",
        "A powerful noble awakens after 820 years — action manhwa on Webtoon",
        "https://www.webtoons.com/en/action/noblesse/list?title_no=87",
        #Webtoon,
        #MANHWA,
        ?#Action,
        ?#Korean,
        ?"https://picsum.photos/seed/noblesse/400/225",
        null,
      ),
      (
        "Omniscient Reader",
        "A reader becomes part of the story he knows by heart — read on Tapas",
        "https://tapas.io/series/omniscient-reader",
        #Tapas,
        #MANHWA,
        ?#Fantasy,
        ?#English,
        ?"https://picsum.photos/seed/omniscient-reader/400/225",
        null,
      ),
      (
        "Eleceed",
        "A secret agent with supernatural cat powers — action manhwa on Webtoon",
        "https://www.webtoons.com/en/action/eleceed/list?title_no=1571",
        #Webtoon,
        #MANHWA,
        ?#Action,
        ?#Korean,
        ?"https://picsum.photos/seed/eleceed/400/225",
        null,
      ),
      (
        "The God of High School",
        "High school martial arts tournament with divine powers — read on Webtoon",
        "https://www.webtoons.com/en/action/the-god-of-high-school/list?title_no=66",
        #Webtoon,
        #MANHWA,
        ?#Action,
        ?#English,
        ?"https://picsum.photos/seed/god-of-highschool/400/225",
        null,
      ),
      (
        "A Good Day to be a Dog",
        "A woman cursed to turn into a dog at night — romantic comedy on MangaDex",
        "https://mangadex.org/title/a-good-day-to-be-a-dog",
        #MangaDex,
        #MANHWA,
        ?#Romance,
        ?#English,
        ?"https://picsum.photos/seed/good-day-dog/400/225",
        null,
      ),
      (
        "Remarried Empress",
        "An empress navigates political intrigue and a second chance at love — on Tappytoon",
        "https://tappytoon.com/comics/remarried-empress",
        #Tappytoon,
        #MANHWA,
        ?#Romance,
        ?#French,
        ?"https://picsum.photos/seed/remarried-empress/400/225",
        null,
      ),
      (
        "Doctor Elise",
        "A doctor reincarnates as a princess with medical knowledge — read on Lezhin",
        "https://www.lezhin.com/en/comic/dr_elise",
        #Lezhin,
        #MANHWA,
        ?#Romance,
        ?#Hindi,
        ?"https://picsum.photos/seed/doctor-elise/400/225",
        null,
      ),
      (
        "Surviving Romance",
        "A romance novel heroine must survive her own story — read on Tapas",
        "https://tapas.io/series/surviving-romance",
        #Tapas,
        #MANHWA,
        ?#Romance,
        ?#English,
        ?"https://picsum.photos/seed/surviving-romance/400/225",
        null,
      ),
      (
        "Cheese in the Trap",
        "Campus romance with psychological twists — read on MangaDex",
        "https://mangadex.org/title/cheese-in-the-trap",
        #MangaDex,
        #MANHWA,
        ?#Romance,
        ?#French,
        ?"https://picsum.photos/seed/cheese-in-trap/400/225",
        null,
      ),
      // BTS Songs
      (
        "Dynamite",
        "BTS chart-topping disco-pop hit — stream on Spotify",
        "https://open.spotify.com/track/5QDLhrAOvtfqwvFrWBioRn",
        #Spotify,
        #BTS_SONGS,
        ?#Pop,
        ?#English,
        ?"https://img.youtube.com/vi/gdZLi9oWNZg/maxresdefault.jpg",
        ?"gdZLi9oWNZg",
      ),
      (
        "Boy With Luv (feat. Halsey)",
        "Upbeat BTS pop anthem featuring Halsey — stream on Spotify",
        "https://open.spotify.com/track/5KawlOMHjWeUjQtnuRs22c",
        #Spotify,
        #BTS_SONGS,
        ?#Pop,
        ?#Korean,
        ?"https://img.youtube.com/vi/XsX3ATc3FbA/maxresdefault.jpg",
        ?"XsX3ATc3FbA",
      ),
      (
        "Spring Day",
        "Emotional ballad about missing a friend — official MV on YouTube",
        "https://www.youtube.com/watch?v=xEeFrLSkMm8",
        #YouTube,
        #BTS_SONGS,
        ?#Ballad,
        ?#Korean,
        ?"https://img.youtube.com/vi/xEeFrLSkMm8/maxresdefault.jpg",
        ?"xEeFrLSkMm8",
      ),
      (
        "IDOL",
        "High-energy track celebrating BTS identity and culture — stream on Spotify",
        "https://open.spotify.com/track/5Nf7Elqr0JjbJbBOKHv2vv",
        #Spotify,
        #BTS_SONGS,
        ?#HipHop,
        ?#Korean,
        ?"https://img.youtube.com/vi/pBuZEGYXA6E/maxresdefault.jpg",
        ?"pBuZEGYXA6E",
      ),
      (
        "Blood Sweat & Tears",
        "Artistic K-pop track with stunning choreography — official MV on YouTube",
        "https://www.youtube.com/watch?v=hmE9f-TEutc",
        #YouTube,
        #BTS_SONGS,
        ?#EDM,
        ?#Korean,
        ?"https://img.youtube.com/vi/hmE9f-TEutc/maxresdefault.jpg",
        ?"hmE9f-TEutc",
      ),
      // BTS Fan Fictions
      (
        "Love Me Back - BTS Fan Fiction",
        "A heartfelt BTS romance fan fiction — read on Wattpad",
        "https://www.wattpad.com/story/love-me-back-bts",
        #Wattpad,
        #FANFICTION,
        ?#Romance,
        ?#English,
        ?"https://picsum.photos/seed/love-me-back/400/225",
        null,
      ),
      (
        "Parallel Universe - BTS AU",
        "BTS alternate universe where the boys meet their fans — read on Wattpad",
        "https://www.wattpad.com/story/parallel-universe-bts-au",
        #Wattpad,
        #FANFICTION,
        ?#AU,
        ?#English,
        ?"https://picsum.photos/seed/parallel-universe-bts/400/225",
        null,
      ),
      (
        "The Detective's Heart",
        "Jungkook as a detective solving mysteries alongside the reader — on Wattpad",
        "https://www.wattpad.com/story/the-detectives-heart-bts",
        #Wattpad,
        #FANFICTION,
        ?#Mystery,
        ?#English,
        ?"https://picsum.photos/seed/detectives-heart/400/225",
        null,
      ),
      (
        "Starlight Stories - BTS Fan Film",
        "Fan-made dramatic BTS storyline video series on YouTube",
        "https://www.youtube.com/playlist?list=bts-starlight-stories",
        #YouTube,
        #FANFICTION,
        ?#Drama,
        ?#English,
        ?"https://img.youtube.com/vi/XgkOKbFzNEo/maxresdefault.jpg",
        ?"XgkOKbFzNEo",
      ),
      (
        "The Last Letter - BTS Angst",
        "A bittersweet BTS fan fiction about unspoken feelings — read on Wattpad",
        "https://www.wattpad.com/story/the-last-letter-bts-angst",
        #Wattpad,
        #FANFICTION,
        ?#Romance,
        ?#English,
        ?"https://picsum.photos/seed/last-letter-bts/400/225",
        null,
      ),
    ];

    for ((title, desc, url, platform, category, genre, contentLanguage, coverPhotoUrl, mediaUrl) in seedData.vals()) {
      let id = linkCounter[0];
      linkCounter[0] += 1;
      let link : LinkTypes.Link = {
        id;
        title;
        description = desc;
        url;
        platform;
        category;
        genre;
        contentLanguage;
        coverPhotoUrl;
        mediaUrl;
        addedAt = now;
        addedBy = seedAdmin;
      };
      links.add(link);
    };
  };

  seedLinks();

  include LinksApi(links, admins, linkCounter);
  include CommunityApi(profiles, posts, comments, likes, postCounter, commentCounter);
  include WatchlistApi(watchlistState);
};
