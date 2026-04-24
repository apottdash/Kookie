# Design Brief: ARMY Purple Social Hub — Expanded

## Tone & Differentiation
Fan-forward, passionate community hub. Celebrates BTS brand through bold purple tonality. Feed-first social discovery platform masking link curation as grassroots community conversation. Multilingual, accessible, inclusive global ARMY experience.

## Color Palette
| Role | Light | Dark |
| --- | --- | --- |
| Primary (BTS Purple) | L 0.48 C 0.22 H 290 | L 0.70 C 0.25 H 290 |
| Secondary (Lavender) | L 0.70 C 0.18 H 290 | L 0.55 C 0.22 H 290 |
| Accent (Vibrant Lavender) | L 0.65 C 0.24 H 290 | L 0.75 C 0.28 H 290 |
| Muted (Soft Purple) | L 0.88 C 0.02 H 290 | L 0.26 C 0.02 H 290 |
| Destructive | L 0.55 C 0.22 H 25 | L 0.65 C 0.19 H 22 |

## Typography
- **Display**: General Sans (bold, geometric, 700 weight for headlines)
- **Body**: DM Sans (warm, readable, 400 weight for content)
- **Mono**: System monospace (code/metadata)

## Content Types & Pages
| Page | Content | Key UI Pattern |
| --- | --- | --- |
| BTS Songs | Spotify, SoundCloud links with genre tags (Pop, Hip-Hop, Ballad, Rap, EDM, R&B) | Genre pill filters, artist metadata |
| Fan Fiction | Wattpad links with genre tags (Romance, Action, Mystery, Comedy, Drama, AU) | Genre filters, fandom badges |
| K-Drama | Netflix, Viki, etc. with genre (Drama, Comedy, Romance, Thriller, Fantasy, Historical) | Genre filters, rating badges |
| Manhwa | Multilingual (EN, FR, HI, KO, ES) with platform tags (Webtoon, Tapas, MangaDex, etc.) | Language badges, platform labels |
| Community Feed | Public read-only for non-users; like/comment/share for authenticated users | Post cards with author profile, engagement counters |
| My Watchlist | Personalized saved links organized by content type | Add/remove buttons, filter by type/genre |

## Structural Zones
| Zone | Treatment |
| --- | --- |
| Header | Sticky, elevated bg-primary with white foreground; navigation breadcrumbs, login/profile button |
| Onboarding Modal | Centered overlay; smooth fade-in; fields for country, fandom, language, subtitle preference |
| Filter Bar | Horizontal pill buttons (filter-pill class); active = bg-primary, inactive = bg-muted |
| Genre Badges | Inline accent-colored pills (badge-genre) on content cards; sparingly for highlights |
| Language Badges | Secondary-colored labels (badge-language) on multilingual content top-right |
| Subtitle Badge | Small primary-colored indicator (badge-subtitle) on card when user has subtitles enabled |
| Content Cards | Card-based with shadow-subtle, hover shadow-card; genre tags inline; external link badge |
| Community Feed | Light background with alternating card surfaces; post cards have card-lift on hover |
| Footer | Muted background with border-top; BTS brand lockup + links + language selector |

## Spacing & Rhythm
Dense mobile (12px gaps), moderate desktop (24px gaps). Cards use 16px padding. Content sections separated by 32px vertical rhythm. Filter pill gap: 8px. Badge gap: 4px.

## Component Patterns
**Badges**: Genre (accent-colored), Language (secondary-colored), Subtitle (primary-colored). **Filters**: Horizontal pill layout; first active by default (ALL); click toggles state. **Cards**: Avatar + title + metadata + genre tags + external link badge. **Modal**: Centered, semi-transparent backdrop, smooth fade-in animation. **Public Feed**: Read-only state with visual indicator overlay on hover.

## Motion
Smooth transitions on interactive elements (0.3s cubic-bezier). Modal entrance: scale(0.95) → scale(1) + opacity 0 → 1. Card hover: +2px lift + shadow-card. Filter pill active: instant bg-primary transition. No bouncy sequences.

## Responsive Design
Mobile-first: single column for cards, stacked genre filters. Tablet (md): 2-column grid. Desktop (lg): 3-column grid for content, horizontal filter bar. Onboarding modal: full width on mobile (with padding), max-w-md on desktop.

## Constraints
Maintain AA+ contrast. No full-page gradients. Purple saturation varies by depth. Purple badges on secondary; accent badges for highlights only. Language labels use secondary color to distinguish from genre. Subtitle badges use primary to match brand. Avoid rainbow palettes; let purple + accent + secondary carry all hierarchy.
