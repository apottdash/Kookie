import type { backendInterface, Category, Platform, Link, PostView, Comment, ProfileView, WatchlistEntryView } from "../backend";
import { Principal } from "@icp-sdk/core/principal";

const now = BigInt(Date.now()) * BigInt(1_000_000);

const samplePrincipal = Principal.fromText("2vxsx-fae");

const sampleLinks: Link[] = [
  {
    id: BigInt(0),
    title: "Real Wedding: Priya & Rohan — Jaipur Palace",
    description: "A stunning royal wedding at the City Palace, Jaipur — full video on YouTube",
    url: "https://www.youtube.com",
    platform: { __kind__: "YouTube", YouTube: null },
    category: "BTS_LIVE" as unknown as Category,
    addedAt: now,
    addedBy: samplePrincipal,
  },
  {
    id: BigInt(1),
    title: "Real Wedding: Anjali & Karan — Udaipur Lakeside",
    description: "Breathtaking destination wedding at Udaipur's Lake Pichola — cinematic highlights",
    url: "https://www.youtube.com",
    platform: { __kind__: "YouTube", YouTube: null },
    category: "BTS_LIVE" as unknown as Category,
    addedAt: now,
    addedBy: samplePrincipal,
  },
  {
    id: BigInt(2),
    title: "Top 10 Wedding Venues in Delhi NCR 2025",
    description: "A curated guide to the best banquet halls and farmhouses for Delhi weddings",
    url: "https://www.youtube.com",
    platform: { __kind__: "YouTube", YouTube: null },
    category: "K_DRAMA" as unknown as Category,
    addedAt: now,
    addedBy: samplePrincipal,
  },
  {
    id: BigInt(3),
    title: "How to Plan a Destination Wedding in Goa",
    description: "Step-by-step guide to planning a beachside wedding in Goa on any budget",
    url: "https://www.youtube.com",
    platform: { __kind__: "YouTube", YouTube: null },
    category: "K_DRAMA" as unknown as Category,
    addedAt: now,
    addedBy: samplePrincipal,
  },
  {
    id: BigInt(4),
    title: "Bridal Lehenga Trends 2025 — Sabyasachi, Manish Malhotra & More",
    description: "This season's most-loved bridal wear designs across India's top designers",
    url: "https://www.youtube.com",
    platform: { __kind__: "YouTube", YouTube: null },
    category: "MANHWA" as unknown as Category,
    addedAt: now,
    addedBy: samplePrincipal,
  },
  {
    id: BigInt(5),
    title: "Mehendi Designs for Modern Brides — 2025 Edition",
    description: "Contemporary mehendi patterns from minimalist to traditional full-hand designs",
    url: "https://www.youtube.com",
    platform: { __kind__: "YouTube", YouTube: null },
    category: "MANHWA" as unknown as Category,
    addedAt: now,
    addedBy: samplePrincipal,
  },
  {
    id: BigInt(6),
    title: "Vendor Spotlight: Ravi Photography — Jaipur",
    description: "Meet WedBridge verified photographer Ravi Sharma — portfolio highlights & packages",
    url: "https://www.youtube.com",
    platform: { __kind__: "YouTube", YouTube: null },
    category: "FANFICTION" as unknown as Category,
    addedAt: now,
    addedBy: samplePrincipal,
  },
  {
    id: BigInt(7),
    title: "Vendor Spotlight: Divine Catering — Delhi NCR",
    description: "Authentic Indian cuisine for 100–2000 guests, all dietary needs catered for",
    url: "https://www.youtube.com",
    platform: { __kind__: "YouTube", YouTube: null },
    category: "FANFICTION" as unknown as Category,
    addedAt: now,
    addedBy: samplePrincipal,
  },
  {
    id: BigInt(8),
    title: "Indian Wedding Sangeet Playlist 2025",
    description: "The ultimate Sangeet night playlist — Bollywood hits, folk classics, and new favourites",
    url: "https://www.youtube.com",
    platform: { __kind__: "YouTube", YouTube: null },
    category: "BTS_SONGS" as unknown as Category,
    addedAt: now,
    addedBy: samplePrincipal,
  },
  {
    id: BigInt(9),
    title: "Baraat Dhol Playlist — Top Tracks 2025",
    description: "High-energy dhol and shehnai tracks perfect for a Baraat procession",
    url: "https://www.youtube.com",
    platform: { __kind__: "YouTube", YouTube: null },
    category: "BTS_SONGS" as unknown as Category,
    addedAt: now,
    addedBy: samplePrincipal,
  },
];

const samplePosts: PostView[] = [
  {
    id: BigInt(0),
    content: "Just finalised our photographer for our Jaipur wedding and couldn't be happier! Found them through WedBridge and the whole process was so smooth. Highly recommend! 🌸 #WedBridge #JaipurWedding",
    hashtags: ["WedBridge", "JaipurWedding"],
    createdAt: now,
    author: samplePrincipal,
    likesCount: BigInt(142),
    flagged: false,
  },
  {
    id: BigInt(1),
    content: "Destination wedding at Udaipur Lake Pichola is now officially on our list! Any vendor recommendations? The WedBridge vendor basket is making shortlisting so much easier 💍 #UdaipurWedding #DestinationWedding",
    hashtags: ["UdaipurWedding", "DestinationWedding"],
    createdAt: now - BigInt(3600_000_000_000),
    author: samplePrincipal,
    likesCount: BigInt(87),
    flagged: false,
  },
  {
    id: BigInt(2),
    content: "Pro tip for couples: always compare at least 3 vendors before confirming! WedBridge's vendor basket lets you do exactly that — side-by-side pricing, no pressure. 🙌 #WeddingTips #WedBridge",
    hashtags: ["WeddingTips", "WedBridge"],
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
    bio: "Planning our dream wedding with WedBridge 💍",
    principal: samplePrincipal,
    username: "WedBridgeMember",
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
