import Common "../types/common";
import Types "../types/links";
import List "mo:core/List";
import Text "mo:core/Text";

module {
  public func getAll(links : List.List<Types.Link>) : [Types.Link] {
    links.toArray()
  };

  public func getByCategory(links : List.List<Types.Link>, category : Common.Category) : [Types.Link] {
    links.filter(func(l) { l.category == category }).toArray()
  };

  public func search(links : List.List<Types.Link>, keyword : Text) : [Types.Link] {
    let lower = keyword.toLower();
    links.filter(func(l) {
      l.title.toLower().contains(#text lower) or
      l.description.toLower().contains(#text lower)
    }).toArray()
  };

  public func searchByGenre(links : List.List<Types.Link>, genre : Common.Genre) : [Types.Link] {
    links.filter(func(l) {
      switch (l.genre) {
        case (?g) g == genre;
        case null false;
      }
    }).toArray()
  };

  public func searchByLanguage(links : List.List<Types.Link>, language : Common.ContentLanguage) : [Types.Link] {
    links.filter(func(l) {
      switch (l.contentLanguage) {
        case (?lang) lang == language;
        case null false;
      }
    }).toArray()
  };

  public func getById(links : List.List<Types.Link>, id : Common.LinkId) : ?Types.Link {
    links.find(func(l) { l.id == id })
  };

  public func add(
    links : List.List<Types.Link>,
    nextId : Nat,
    title : Text,
    description : Text,
    url : Text,
    platform : Common.Platform,
    category : Common.Category,
    genre : ?Common.Genre,
    contentLanguage : ?Common.ContentLanguage,
    coverPhotoUrl : ?Text,
    mediaUrl : ?Text,
    caller : Principal,
    now : Common.Timestamp,
  ) : Types.Link {
    let link : Types.Link = {
      id = nextId;
      title;
      description;
      url;
      platform;
      category;
      genre;
      contentLanguage;
      coverPhotoUrl;
      mediaUrl;
      addedAt = now;
      addedBy = caller;
    };
    links.add(link);
    link
  };

  public func edit(
    links : List.List<Types.Link>,
    id : Common.LinkId,
    title : Text,
    description : Text,
    url : Text,
    platform : Common.Platform,
    category : Common.Category,
    genre : ?Common.Genre,
    contentLanguage : ?Common.ContentLanguage,
    coverPhotoUrl : ?Text,
    mediaUrl : ?Text,
  ) : Bool {
    var found = false;
    links.mapInPlace(func(l) {
      if (l.id == id) {
        found := true;
        { l with title; description; url; platform; category; genre; contentLanguage; coverPhotoUrl; mediaUrl }
      } else { l }
    });
    found
  };

  public func remove(links : List.List<Types.Link>, id : Common.LinkId) : Bool {
    let sizeBefore = links.size();
    let filtered = links.filter(func(l) { l.id != id });
    links.clear();
    links.append(filtered);
    links.size() < sizeBefore
  };
};
