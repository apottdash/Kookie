module {
  public type Timestamp = Int;
  public type LinkId = Nat;
  public type PostId = Nat;
  public type CommentId = Nat;

  public type Platform = {
    #Netflix;
    #Viki;
    #YouTube;
    #Webtoon;
    #Tapas;
    #MangaDex;
    #Tappytoon;
    #Lezhin;
    #Bato;
    #Spotify;
    #SoundCloud;
    #Wattpad;
    #Other : Text;
  };

  public type Category = {
    #BTS_LIVE;
    #BTS_SONGS;
    #K_DRAMA;
    #MANHWA;
    #FANFICTION;
  };

  public type Genre = {
    // Music genres
    #Pop;
    #HipHop;
    #Ballad;
    #Rap;
    #EDM;
    #RnB;
    // Story/manhwa/fanfiction genres
    #Romance;
    #Action;
    #Comedy;
    #Drama;
    #Fantasy;
    #Thriller;
    #Historical;
    #Mystery;
    #AU; // Alternate Universe (fan fiction trope)
  };

  public type ContentLanguage = {
    #English;
    #French;
    #Hindi;
    #Korean;
    #Spanish;
  };
};
