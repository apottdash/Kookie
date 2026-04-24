import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export type CommentId = bigint;
export interface WatchlistInput {
    linkId: LinkId;
}
export interface WatchlistEntryView {
    id: string;
    owner: string;
    addedAt: Timestamp;
    linkId: string;
}
export type PostId = bigint;
export interface PostView {
    id: PostId;
    content: string;
    hashtags: Array<string>;
    createdAt: Timestamp;
    author: Principal;
    likesCount: bigint;
    flagged: boolean;
}
export interface Comment {
    id: CommentId;
    content: string;
    createdAt: Timestamp;
    author: Principal;
    postId: PostId;
}
export type Platform = {
    __kind__: "Wattpad";
    Wattpad: null;
} | {
    __kind__: "Netflix";
    Netflix: null;
} | {
    __kind__: "Bato";
    Bato: null;
} | {
    __kind__: "Viki";
    Viki: null;
} | {
    __kind__: "Webtoon";
    Webtoon: null;
} | {
    __kind__: "YouTube";
    YouTube: null;
} | {
    __kind__: "Spotify";
    Spotify: null;
} | {
    __kind__: "MangaDex";
    MangaDex: null;
} | {
    __kind__: "Tapas";
    Tapas: null;
} | {
    __kind__: "SoundCloud";
    SoundCloud: null;
} | {
    __kind__: "Other";
    Other: string;
} | {
    __kind__: "Tappytoon";
    Tappytoon: null;
} | {
    __kind__: "Lezhin";
    Lezhin: null;
};
export interface ProfileView {
    bio: string;
    principal: Principal;
    preferredLanguage?: ContentLanguage;
    country?: string;
    username: string;
    joinedAt: Timestamp;
    subtitlePreference: boolean;
    profileCompleted: boolean;
    fandom?: string;
}
export type LinkId = bigint;
export interface Link {
    id: LinkId;
    url: string;
    title: string;
    contentLanguage?: ContentLanguage;
    description: string;
    platform: Platform;
    mediaUrl?: string;
    genre?: Genre;
    addedAt: Timestamp;
    addedBy: Principal;
    category: Category;
    coverPhotoUrl?: string;
}
export enum Category {
    MANHWA = "MANHWA",
    BTS_LIVE = "BTS_LIVE",
    K_DRAMA = "K_DRAMA",
    BTS_SONGS = "BTS_SONGS",
    FANFICTION = "FANFICTION"
}
export enum ContentLanguage {
    Korean = "Korean",
    Spanish = "Spanish",
    Hindi = "Hindi",
    English = "English",
    French = "French"
}
export enum Genre {
    AU = "AU",
    EDM = "EDM",
    Pop = "Pop",
    Rap = "Rap",
    RnB = "RnB",
    Action = "Action",
    Mystery = "Mystery",
    Historical = "Historical",
    Drama = "Drama",
    Ballad = "Ballad",
    HipHop = "HipHop",
    Romance = "Romance",
    Fantasy = "Fantasy",
    Thriller = "Thriller",
    Comedy = "Comedy"
}
export interface backendInterface {
    addComment(postId: PostId, content: string): Promise<Comment>;
    addLink(title: string, description: string, url: string, platform: Platform, category: Category, genre: Genre | null, contentLanguage: ContentLanguage | null, coverPhotoUrl: string | null, mediaUrl: string | null): Promise<Link>;
    addToWatchlist(input: WatchlistInput): Promise<{
        __kind__: "ok";
        ok: WatchlistEntryView;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createPost(content: string, hashtags: Array<string>): Promise<PostView>;
    deleteLink(id: LinkId): Promise<boolean>;
    editLink(id: LinkId, title: string, description: string, url: string, platform: Platform, category: Category, genre: Genre | null, contentLanguage: ContentLanguage | null, coverPhotoUrl: string | null, mediaUrl: string | null): Promise<boolean>;
    flagPost(id: PostId): Promise<boolean>;
    getComments(postId: PostId): Promise<Array<Comment>>;
    getLinks(category: Category | null): Promise<Array<Link>>;
    getPost(id: PostId): Promise<PostView | null>;
    getProfile(user: Principal): Promise<ProfileView | null>;
    getWatchlist(): Promise<Array<WatchlistEntryView>>;
    isInWatchlist(linkId: string): Promise<boolean>;
    likePost(postId: PostId): Promise<boolean>;
    listPosts(): Promise<Array<PostView>>;
    removeFromWatchlist(entryId: string): Promise<boolean>;
    searchByGenre(genre: Genre): Promise<Array<Link>>;
    searchByLanguage(language: ContentLanguage): Promise<Array<Link>>;
    searchLinks(keyword: string): Promise<Array<Link>>;
    setOnboarding(country: string | null, fandom: string | null, preferredLanguage: ContentLanguage | null, subtitlePreference: boolean): Promise<void>;
    setProfile(username: string, bio: string): Promise<void>;
}
