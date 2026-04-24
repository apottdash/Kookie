import type { backendInterface, Category, Platform, Link, PostView, Comment, ProfileView, WatchlistEntryView } from "../backend";
import { Principal } from "@icp-sdk/core/principal";

const now = BigInt(Date.now()) * BigInt(1_000_000);

const samplePrincipal = Principal.fromText("2vxsx-fae");

const sampleLinks: Link[] = [
  {
    id: BigInt(0),
    title: "BTS Permission to Dance on Stage - Seoul",
    description: "Watch BTS live concert Permission to Dance on Stage in Seoul on Weverse",
    url: "https://weverse.io/bts/live",
    platform: { __kind__: "YouTube", YouTube: null },
    category: "BTS_LIVE" as unknown as Category,
    addedAt: now,
    addedBy: samplePrincipal,
  },
  {
    id: BigInt(1),
    title: "BTS Yet To Come - The Most Beautiful Moment Live",
    description: "BTS Yet To Come concert live performance stream on YouTube",
    url: "https://www.youtube.com/watch?v=bZ_C-AVo5OA",
    platform: { __kind__: "YouTube", YouTube: null },
    category: "BTS_LIVE" as unknown as Category,
    addedAt: now,
    addedBy: samplePrincipal,
  },
  {
    id: BigInt(2),
    title: "Crash Landing on You",
    description: "Romantic drama starring Hyun Bin and Son Ye-jin — available on Netflix",
    url: "https://www.netflix.com/title/81159258",
    platform: { __kind__: "Netflix", Netflix: null },
    category: "K_DRAMA" as unknown as Category,
    addedAt: now,
    addedBy: samplePrincipal,
  },
  {
    id: BigInt(3),
    title: "Goblin (Guardian: The Lonely and Great God)",
    description: "Fantasy romance K-drama starring Gong Yoo — available on Viki",
    url: "https://www.viki.com/tv/32014c-goblin",
    platform: { __kind__: "Viki", Viki: null },
    category: "K_DRAMA" as unknown as Category,
    addedAt: now,
    addedBy: samplePrincipal,
  },
  {
    id: BigInt(4),
    title: "Tower of God",
    description: "Epic fantasy manhwa following Twenty-Fifth Bam — read on Webtoon",
    url: "https://www.webtoons.com/en/fantasy/tower-of-god/list?title_no=95",
    platform: { __kind__: "Webtoon", Webtoon: null },
    category: "MANHWA" as unknown as Category,
    addedAt: now,
    addedBy: samplePrincipal,
  },
  {
    id: BigInt(5),
    title: "Omniscient Reader's Viewpoint",
    description: "A man who read the world's most obscure novel finds himself living inside it — on Tapas",
    url: "https://tapas.io/series/omniscient-readers-viewpoint/info",
    platform: { __kind__: "Tapas", Tapas: null },
    category: "MANHWA" as unknown as Category,
    addedAt: now,
    addedBy: samplePrincipal,
  },
  {
    id: BigInt(6),
    title: "The Remarried Empress",
    description: "An empress faces betrayal and rebuilds her life — stunning royal drama on Tappytoon",
    url: "https://www.tappytoon.com/en/comics/remarried-empress",
    platform: { __kind__: "Tappytoon", Tappytoon: null },
    category: "MANHWA" as unknown as Category,
    addedAt: now,
    addedBy: samplePrincipal,
  },
  {
    id: BigInt(7),
    title: "Doctor Elise: The Royal Lady with the Lamp",
    description: "A surgeon reincarnated as a princess uses modern medicine in a fantasy world — on Lezhin",
    url: "https://www.lezhinus.com/en/comic/doctor_elise",
    platform: { __kind__: "Lezhin", Lezhin: null },
    category: "MANHWA" as unknown as Category,
    addedAt: now,
    addedBy: samplePrincipal,
  },
  {
    id: BigInt(8),
    title: "A Good Day to be a Dog",
    description: "A girl cursed to turn into a dog must break the spell by morning — read on Bato",
    url: "https://bato.to/series/93718",
    platform: { __kind__: "Bato", Bato: null },
    category: "MANHWA" as unknown as Category,
    addedAt: now,
    addedBy: samplePrincipal,
  },
  {
    id: BigInt(9),
    title: "Noblesse",
    description: "A noble vampire awakens after 820 years and navigates modern society — on MangaDex",
    url: "https://mangadex.org/title/8cfd0d11-82cc-4d68-ab05-ad9a48c03a67/noblesse",
    platform: { __kind__: "MangaDex", MangaDex: null },
    category: "MANHWA" as unknown as Category,
    addedAt: now,
    addedBy: samplePrincipal,
  },
];

const samplePosts: PostView[] = [
  {
    id: BigInt(0),
    content: "Just watched BTS Permission to Dance on Stage and I'm still crying 😭💜 The boys really outdid themselves! #BTS #PTD #ARMY",
    hashtags: ["BTS", "PTD", "ARMY"],
    createdAt: now,
    author: samplePrincipal,
    likesCount: BigInt(142),
    flagged: false,
  },
  {
    id: BigInt(1),
    content: "Crash Landing on You has me absolutely wrecked 😭 Episode 12 was everything. If you haven't watched it yet, what are you waiting for? 💜 #KDrama #CLOY",
    hashtags: ["KDrama", "CLOY"],
    createdAt: now - BigInt(3600_000_000_000),
    author: samplePrincipal,
    likesCount: BigInt(87),
    flagged: false,
  },
  {
    id: BigInt(2),
    content: "Tower of God chapter drop today!! 🙌 The art just keeps getting better. Bam's glow-up is unreal 🔥 #Manhwa #TowerOfGod #Webtoon",
    hashtags: ["Manhwa", "TowerOfGod", "Webtoon"],
    createdAt: now - BigInt(7200_000_000_000),
    author: samplePrincipal,
    likesCount: BigInt(56),
    flagged: false,
  },
];

// In-memory watchlist store for mock
const mockWatchlistStore: WatchlistEntryView[] = [];
let mockEntryCounter = 100;

export const mockBackend: backendInterface = {
  addComment: async (postId, content) => ({
    id: BigInt(99),
    content,
    createdAt: now,
    author: samplePrincipal,
    postId,
  }),
  addLink: async (title, description, url, platform, category) => ({
    id: BigInt(99),
    title,
    description,
    url,
    platform,
    category,
    addedAt: now,
    addedBy: samplePrincipal,
  }),
  addToWatchlist: async (input) => {
    const existing = mockWatchlistStore.find(e => e.linkId === String(input.linkId));
    if (existing) {
      return { __kind__: "ok", ok: existing };
    }
    const entry: WatchlistEntryView = {
      id: String(mockEntryCounter++),
      owner: samplePrincipal.toText(),
      addedAt: BigInt(Date.now()),
      linkId: String(input.linkId),
    };
    mockWatchlistStore.push(entry);
    return { __kind__: "ok", ok: entry };
  },
  createPost: async (content, hashtags) => ({
    id: BigInt(99),
    content,
    hashtags,
    createdAt: now,
    author: samplePrincipal,
    likesCount: BigInt(0),
    flagged: false,
  }),
  deleteLink: async () => true,
  editLink: async () => true,
  flagPost: async () => true,
  getComments: async () => [],
  getLinks: async (category) => {
    if (category === null) return sampleLinks;
    return sampleLinks.filter(l => l.category === category);
  },
  getPost: async (id) => samplePosts.find(p => p.id === id) ?? null,
  getProfile: async () => ({
    bio: "A proud ARMY since 2013 💜",
    principal: samplePrincipal,
    username: "PurpleARMY",
    joinedAt: now - BigInt(86400_000_000_000 * 30),
    subtitlePreference: false,
    profileCompleted: true,
  }),
  getWatchlist: async () => [...mockWatchlistStore],
  isInWatchlist: async (linkId) => mockWatchlistStore.some(e => e.linkId === linkId),
  likePost: async () => true,
  listPosts: async () => samplePosts,
  removeFromWatchlist: async (entryId) => {
    const idx = mockWatchlistStore.findIndex(e => e.id === entryId);
    if (idx !== -1) {
      mockWatchlistStore.splice(idx, 1);
      return true;
    }
    return false;
  },
  searchLinks: async (keyword) =>
    sampleLinks.filter(l =>
      l.title.toLowerCase().includes(keyword.toLowerCase()) ||
      l.description.toLowerCase().includes(keyword.toLowerCase())
    ),
  searchByGenre: async (genre) =>
    sampleLinks.filter(l => l.genre === genre),
  searchByLanguage: async (language) =>
    sampleLinks.filter(l => l.contentLanguage === language),
  setOnboarding: async () => undefined,
  setProfile: async () => undefined,
};
