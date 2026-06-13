# Design Brief: WedBridge — India Wedding Vendor Marketplace

## Concept
WedBridge is a trust-first wedding vendor marketplace targeting the Indian market. It eliminates chaos between couples and vendors through transparent discovery, the Vendor Basket shortlisting tool, and exclusive leads. Launched in Jaipur — India's #1 destination wedding city — with India-first features: UPI pricing, WhatsApp integration, multi-day event support, and regional language readiness.

## Tone & Differentiation
Warm, confident, culturally rooted. Celebrates the grandeur of Indian weddings without feeling overwhelming. Empowers couples to plan with clarity and vendors to showcase with pride. The purple brand identity evokes royalty, love, and the Rajasthani palace aesthetic — a natural fit for Jaipur.

## Color Palette
| Role | Light | Dark |
| --- | --- | --- |
| Primary (WedBridge Purple) | L 0.48 C 0.22 H 290 | L 0.70 C 0.25 H 290 |
| Secondary (Lavender) | L 0.70 C 0.18 H 290 | L 0.55 C 0.22 H 290 |
| Accent (Vibrant Lavender) | L 0.65 C 0.24 H 290 | L 0.75 C 0.28 H 290 |
| Muted (Soft Purple) | L 0.88 C 0.02 H 290 | L 0.26 C 0.02 H 290 |
| Destructive | L 0.55 C 0.22 H 25 | L 0.65 C 0.19 H 22 |

## Typography
- **Display**: General Sans (bold, geometric, 700 weight for headlines)
- **Body**: DM Sans (warm, readable, 400 weight for content)
- **Mono**: System monospace (metadata, principal IDs)

## Pages & Routes
| Route | Page | Purpose |
| --- | --- | --- |
| `/` | HomePage | Hero, vendor categories, how it works, featured vendors, destination hubs, community |
| `/vendors` | BrowseVendorsPage | Filter by category, destination toggle, search — full vendor grid |
| `/vendors/:id` | VendorProfilePage | Vendor profile, basket + inquiry CTAs, related vendors |
| `/destinations` | DestinationPage | Destination wedding hubs (Jaipur live, Goa/Udaipur/Rishikesh coming soon) |
| `/basket` | VendorBasketPage | Vendor Basket — compare shortlisted vendors, notes, bulk inquiry |
| `/feed` | FeedPage | Community stories — couple + vendor testimonials |
| `/feed/:postId` | PostDetailPage | Individual post with comments |
| `/profile/:principal` | ProfilePage | ICP user profile |
| `/admin` | AdminPage | Admin controls |

## Key Components
| Component | Purpose |
| --- | --- |
| `VendorCard` | Vendor listing card with basket toggle, rating, price, trust signals |
| `VendorCard (basket)` | Same card used in browse, homepage, and destination hub |
| `Navigation` | Basket item count badge on nav + mobile bottom nav |
| `Header` | WedBridge logo, search, basket icon with count, auth |
| `Layout` | Footer with couple/vendor links, sticky bottom mobile nav |
| `OnboardingModal` | City, user type (Couple/Vendor/Planner), language, WhatsApp notifications |

## Structural Zones
| Zone | Treatment |
| --- | --- |
| Header | Sticky, bg-card with border-b; WedBridge logo (W icon + wordmark); search; basket count badge; auth |
| Hero (Homepage) | Gradient bg-primary/10 → background; centered headline + CTAs + trust stats |
| Filter Bar (Browse) | Sticky top-16; category pill filters + destination toggle + search |
| Vendor Cards | Cover image (h-44) + category badge + plan badge + travel-ready badge + rating + price + basket button |
| Basket Page | Full basket list with notes textarea + summary sidebar + inquire-all CTA |
| Destination Hubs | Card per hub with header gradient, highlights pills, vendor mini-list |
| Footer | 3-col grid (about, couples, vendors) + caffeine.ai credit |

## Vendor Data Model
```
Vendor {
  id, name, category (15 types), city, isDestinationReady,
  plan (Free|Standard|Premium|Destination Hub),
  coverPhoto, rating, reviewCount,
  startingPrice (INR),
  description, tags, languages,
  verified, whatsappActive, multiDaySupport
}
```

## Vendor Basket (useBasket hook)
- localStorage-persisted across sessions
- addToBasket / removeFromBasket / isInBasket / updateNotes / clearBasket
- Item count shown in Header (desktop) and Navigation (all sizes)
- Empty state with "how it works" education cards

## India-Specific Features
- **Pricing in INR**: All prices shown in ₹, formatted as ₹45K / ₹1.5L / ₹450/plate
- **Destination toggle**: Filter for vendors willing to travel for destination weddings
- **Multi-day support**: Vendors declare support for Mehendi, Haldi, Sangeet, Wedding, Reception
- **WhatsApp active badge**: Green indicator on vendor cards for WhatsApp-responsive vendors
- **Indian vendor categories**: Mehendi Artist, Dhol Player, Pundit, Choreographer, Invitation Designer, Baraat, Bridal Wear
- **Trust signals**: GST Verified + ID Confirmed + 5+ reviews = Verified badge
- **Destination hubs**: Jaipur (live), Goa, Udaipur, Rishikesh (coming soon)
- **Language support**: Hindi + English in UI; vendor language capabilities listed on profiles

## Motion
Smooth transitions on interactive elements (0.3s cubic-bezier). Hero entrance: opacity/y animation. Vendor cards: card-lift hover (+2px + shadow). Filter changes: AnimatePresence with layout. Modal: modal-enter scale + opacity animation. No bouncy sequences.

## Responsive Design
Mobile-first: single column cards, bottom nav (Home/Browse/Basket/Destinations/Community). Tablet (md): 2-column vendor grid. Desktop (lg): 3-column vendor grid, sticky filter bar, horizontal nav. Basket: 2/3 + 1/3 grid on lg.

## Constraints
AA+ contrast maintained throughout. Purple saturation varies by depth. No rainbow palettes. Keep to purple + accent + secondary hierarchy. Basket counter badge uses primary bg. Trust signal icons: CheckCircle (primary), MessageCircle (green-600 for WhatsApp), Star (yellow-400).
