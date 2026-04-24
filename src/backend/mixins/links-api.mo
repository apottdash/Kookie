import Common "../types/common";
import LinkTypes "../types/links";
import LinksLib "../lib/links";
import AdminLib "../lib/admin";
import List "mo:core/List";
import Set "mo:core/Set";
import Time "mo:core/Time";

mixin (
  links : List.List<LinkTypes.Link>,
  admins : Set.Set<Principal>,
  counter : [var Nat],
) {
  public query func getLinks(category : ?Common.Category) : async [LinkTypes.Link] {
    switch (category) {
      case (?cat) LinksLib.getByCategory(links, cat);
      case null LinksLib.getAll(links);
    }
  };

  public query func searchLinks(keyword : Text) : async [LinkTypes.Link] {
    LinksLib.search(links, keyword)
  };

  public query func searchByGenre(genre : Common.Genre) : async [LinkTypes.Link] {
    LinksLib.searchByGenre(links, genre)
  };

  public query func searchByLanguage(language : Common.ContentLanguage) : async [LinkTypes.Link] {
    LinksLib.searchByLanguage(links, language)
  };

  public shared ({ caller }) func addLink(
    title : Text,
    description : Text,
    url : Text,
    platform : Common.Platform,
    category : Common.Category,
    genre : ?Common.Genre,
    contentLanguage : ?Common.ContentLanguage,
    coverPhotoUrl : ?Text,
    mediaUrl : ?Text,
  ) : async LinkTypes.Link {
    AdminLib.requireAdmin(admins, caller);
    let id = counter[0];
    counter[0] += 1;
    LinksLib.add(links, id, title, description, url, platform, category, genre, contentLanguage, coverPhotoUrl, mediaUrl, caller, Time.now())
  };

  public shared ({ caller }) func editLink(
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
  ) : async Bool {
    AdminLib.requireAdmin(admins, caller);
    LinksLib.edit(links, id, title, description, url, platform, category, genre, contentLanguage, coverPhotoUrl, mediaUrl)
  };

  public shared ({ caller }) func deleteLink(id : Common.LinkId) : async Bool {
    AdminLib.requireAdmin(admins, caller);
    LinksLib.remove(links, id)
  };
};
