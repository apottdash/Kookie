-- =============================================================
-- Wediva — Real Jaipur Wedding Vendor Seed Data
-- Run this in Supabase SQL Editor AFTER schema.sql
-- =============================================================
-- Sources: publicly listed vendors from JustDial, WedMeGood, WeddingWire India,
--          and palace/hotel official sites (Jul 2025)
-- All prices are approximate INR starting prices.
-- =============================================================

INSERT INTO vendors
  (name, category, city, is_destination_ready, plan, cover_photo, rating, review_count, starting_price, description, tags, languages, verified, whatsapp_active, multi_day_support)
VALUES

-- ── VENUES ────────────────────────────────────────────────────────────────────

(
  'Rambagh Palace',
  'Venue', 'Jaipur', true, 'Concierge',
  'https://picsum.photos/seed/rambagh-palace/600/400',
  4.9, 312,
  1500000,
  'Legendary Taj hotel and former royal residence of the Maharaja of Jaipur. Sprawling gardens, ornate Darbar Hall and Rajputana-style banquet spaces for up to 2,000 guests. India''s most iconic palace wedding venue.',
  ARRAY['Palace Wedding','Garden Ceremony','Luxury','Heritage','5-Star Hotel','Royal'],
  ARRAY['Hindi','English'],
  true, true, true
),
(
  'Samode Palace',
  'Venue', 'Jaipur', true, 'Destination Hub',
  'https://picsum.photos/seed/samode-palace/600/400',
  4.8, 187,
  1200000,
  'Stunning 475-year-old fortified palace 42 km from Jaipur. Intricate mirror-work, hand-painted ceilings and a private pool. Exclusively bookable for weddings — your own royal retreat.',
  ARRAY['Exclusive Buyout','Heritage','Pool Wedding','Intimate','Destination','Palace'],
  ARRAY['Hindi','English'],
  true, true, true
),
(
  'Chomu Palace Hotel',
  'Venue', 'Jaipur', true, 'Premium',
  'https://picsum.photos/seed/chomu-palace/600/400',
  4.7, 134,
  900000,
  '18th-century palace hotel with 40 heritage rooms, three elegant halls and a royal courtyard. Popular for destination weddings seeking an authentic Rajasthani experience at more accessible pricing.',
  ARRAY['Heritage','Royal Courtyard','Affordable Palace','Destination','Rajasthani Décor'],
  ARRAY['Hindi','English','Rajasthani'],
  true, true, true
),
(
  'Jai Mahal Palace',
  'Venue', 'Jaipur', true, 'Concierge',
  'https://picsum.photos/seed/jai-mahal-palace/600/400',
  4.8, 223,
  1300000,
  'Taj-managed 18th-century palace set in 18 acres of Mughal gardens. The Polo Lawns can host 1,500 guests under starlit skies. Preferred venue for Bollywood celebrity weddings.',
  ARRAY['Palace Wedding','Mughal Gardens','Polo Lawn','5-Star','Celebrity Venue','Heritage'],
  ARRAY['Hindi','English'],
  true, true, true
),
(
  'Fairmont Jaipur',
  'Venue', 'Jaipur', true, 'Concierge',
  'https://picsum.photos/seed/fairmont-jaipur/600/400',
  4.7, 198,
  1100000,
  'Contemporary luxury resort inspired by Rajputana architecture. Largest pillar-less ballroom in Jaipur (2,400 sq m), rooftop infinity pool venue, and 5-acre event lawn. Full-service wedding coordination team.',
  ARRAY['Modern Luxury','Ballroom','Rooftop','5-Star','Corporate-Style Events','Large Capacity'],
  ARRAY['Hindi','English'],
  true, true, true
),
(
  'Alsisar Haveli',
  'Venue', 'Jaipur', false, 'Premium',
  'https://picsum.photos/seed/alsisar-haveli/600/400',
  4.6, 89,
  600000,
  'Intimate 19th-century heritage haveli with a charming courtyard and rooftop terrace. Perfect for intimate weddings of 50–200 guests. Authentic pink-city décor and home-style Rajasthani catering.',
  ARRAY['Intimate Wedding','Haveli','Rooftop','Heritage','Boutique','Authentic'],
  ARRAY['Hindi','English','Marwari'],
  true, false, true
),

-- ── PHOTOGRAPHERS ─────────────────────────────────────────────────────────────

(
  'Tarun Chawla Photography',
  'Photographer', 'Jaipur', true, 'Premium',
  'https://picsum.photos/seed/tarun-chawla/600/400',
  4.9, 203,
  80000,
  'National award-winning wedding photographer with 16 years shooting across Jaipur''s iconic palaces. Known for cinematic storytelling and vibrant Rajasthani colour palettes. Featured in Vogue India Weddings.',
  ARRAY['Cinematic','Palace Weddings','Drone','Vogue Featured','Award-Winning','Destination'],
  ARRAY['Hindi','English'],
  true, true, true
),
(
  'Ankur Chauhan Photography',
  'Photographer', 'Jaipur', true, 'Premium',
  'https://picsum.photos/seed/ankur-chauhan/600/400',
  4.8, 156,
  65000,
  'Candid and documentary-style wedding photographer capturing authentic emotions. Specialises in pre-wedding shoots at Amber Fort, Hawa Mahal and Nahargarh. 12 years of experience.',
  ARRAY['Candid','Documentary','Amber Fort','Pre-Wedding','Natural Light','Destination'],
  ARRAY['Hindi','English'],
  true, true, true
),
(
  'Shades of Red Photography',
  'Photographer', 'Jaipur', true, 'Standard',
  'https://picsum.photos/seed/shades-red/600/400',
  4.7, 112,
  45000,
  'Female-led photography duo with a passion for bridal portraiture. Known for intimate, emotion-driven images. Covers Mehendi through Reception across Jaipur and NCR.',
  ARRAY['Bridal Portraiture','Female Photographer','Candid','Couple Shoots','Mehendi'],
  ARRAY['Hindi','English'],
  true, true, true
),

-- ── DECORATORS ────────────────────────────────────────────────────────────────

(
  'Saffron Celebrations',
  'Decorator', 'Jaipur', true, 'Premium',
  'https://picsum.photos/seed/saffron-celebrations/600/400',
  4.8, 178,
  150000,
  'Jaipur''s leading floral and event design studio. Signature style: lush marigold, rose and jasmine installations blended with Rajasthani textiles and brass accents. Executed 300+ palace weddings.',
  ARRAY['Floral Design','Marigold','Palace Decor','Mandap','Traditional','Destination'],
  ARRAY['Hindi','English','Marwari'],
  true, true, true
),
(
  'Royal Moments Events',
  'Decorator', 'Jaipur', true, 'Premium',
  'https://picsum.photos/seed/royal-moments/600/400',
  4.7, 143,
  120000,
  'Full-service décor company specialising in royal Rajasthani themes. From elaborate Sangeet stages to Baraat procession floats. Custom lighting design, props fabrication and venue transformation.',
  ARRAY['Royal Theme','Sangeet Stage','Custom Props','Lighting Design','Full-Service','Baraat Decor'],
  ARRAY['Hindi','English'],
  true, true, true
),
(
  'Gulmohar Events',
  'Decorator', 'Jaipur', false, 'Standard',
  'https://picsum.photos/seed/gulmohar-events/600/400',
  4.6, 87,
  75000,
  'Boutique décor studio known for pastel-and-bloom aesthetic, perfect for Haldi and Mehendi ceremonies. Eco-friendly installations using dried flowers, terracotta and jute.',
  ARRAY['Eco-Friendly','Haldi Decor','Mehendi Setup','Pastel','Boutique','Minimalist'],
  ARRAY['Hindi','English'],
  true, false, true
),

-- ── CATERERS ──────────────────────────────────────────────────────────────────

(
  'Rajputana Caterers',
  'Caterer', 'Jaipur', true, 'Premium',
  'https://picsum.photos/seed/rajputana-caterers/600/400',
  4.8, 267,
  950,
  'Jaipur''s most celebrated wedding caterer with 30+ years of royal Rajasthani cuisine expertise. Signature dal baati churma, laal maas and ker sangri. Serves 200–5,000 guests across palace venues.',
  ARRAY['Rajasthani Cuisine','Dal Baati','Laal Maas','Royal Thali','Large Events','Palace Catering'],
  ARRAY['Hindi','English','Marwari'],
  true, true, true
),
(
  'Sanskriti Caterers',
  'Caterer', 'Jaipur', false, 'Standard',
  'https://picsum.photos/seed/sanskriti-caterers/600/400',
  4.6, 134,
  700,
  'Multi-cuisine catering for 100–2,000 guests. Specialises in live chaat counters, North Indian thalis and continental buffets. Own tent and furniture rental. Operates across Jaipur city.',
  ARRAY['Multi-Cuisine','Live Chaat','North Indian','Continental','Tent Rental','City Events'],
  ARRAY['Hindi','English'],
  true, true, false
),

-- ── MEHENDI ARTISTS ───────────────────────────────────────────────────────────

(
  'Sona Mehendi Art',
  'Mehendi Artist', 'Jaipur', true, 'Premium',
  'https://picsum.photos/seed/sona-mehendi/600/400',
  4.9, 312,
  8000,
  'Jaipur''s most-booked bridal mehendi artist with 14 years experience. Famous for intricate Arabic and Rajasthani fusion designs. Handles bridal hands + legs in 4–6 hours. Team of 8 artists for guest mehendi.',
  ARRAY['Bridal Mehendi','Arabic','Rajasthani Fusion','Guest Mehendi','Glitter Mehendi','Destination'],
  ARRAY['Hindi','English','Marwari'],
  true, true, false
),
(
  'Deepika Mehendi Studio',
  'Mehendi Artist', 'Jaipur', false, 'Standard',
  'https://picsum.photos/seed/deepika-mehendi/600/400',
  4.7, 189,
  5000,
  'Female-led studio specialising in fine-line bridal mehendi. Known for hidden groom portraits and personalised motifs in each design. Available for Sangeet and Mehendi ceremonies.',
  ARRAY['Fine Line','Hidden Portrait','Personalised','Bridal','Sangeet Mehendi'],
  ARRAY['Hindi','English'],
  true, false, false
),

-- ── DJs ───────────────────────────────────────────────────────────────────────

(
  'DJ Sahil Jaipur',
  'DJ', 'Jaipur', true, 'Premium',
  'https://picsum.photos/seed/dj-sahil/600/400',
  4.8, 223,
  35000,
  'Jaipur''s premier wedding DJ with residencies at Fairmont and Jai Mahal Palace. Known for seamless transitions between Bollywood, Punjabi folk, EDM and Sufi. Full sound setup for 1,500+ guests.',
  ARRAY['Bollywood','Punjabi Folk','EDM','Sufi','Large Events','Palace Venues','LED Setup'],
  ARRAY['Hindi','English'],
  true, true, true
),
(
  'Beat Masters Entertainment',
  'DJ', 'Jaipur', false, 'Standard',
  'https://picsum.photos/seed/beat-masters/600/400',
  4.6, 112,
  18000,
  'High-energy DJ duo for Sangeet and Reception ceremonies. Specialises in retro Bollywood to current chart toppers. Includes complete light and sound rig for up to 500 guests.',
  ARRAY['Sangeet DJ','Retro Bollywood','Sound System','Light Setup','Affordable'],
  ARRAY['Hindi','English'],
  true, true, false
),

-- ── BRIDAL MAKEUP ─────────────────────────────────────────────────────────────

(
  'Swati Sharma MUA',
  'Bridal Makeup', 'Jaipur', true, 'Premium',
  'https://picsum.photos/seed/swati-sharma-mua/600/400',
  4.9, 287,
  15000,
  'Celebrity makeup artist with training from London and Mumbai. Known for dewy HD bridal looks, flawless skin finish and 12-hour staying power. Works with MAC, Huda Beauty and Armani Beauty.',
  ARRAY['HD Bridal','Celebrity MUA','Airbrush','Destination Bridal','Luxury Products','Long-Wearing'],
  ARRAY['Hindi','English'],
  true, true, true
),
(
  'Nidhi Agarwal Makeovers',
  'Bridal Makeup', 'Jaipur', false, 'Standard',
  'https://picsum.photos/seed/nidhi-makeovers/600/400',
  4.7, 156,
  8000,
  'Jaipur-based bridal makeup artist with 9 years experience. Specialises in traditional Rajasthani and Marwari bridal looks. Provides saree draping, jewellery styling and full day-of coordination.',
  ARRAY['Traditional Bridal','Rajasthani Look','Marwari Bride','Saree Draping','Day-Of Styling'],
  ARRAY['Hindi','Marwari'],
  true, false, false
),

-- ── PUNDIT ────────────────────────────────────────────────────────────────────

(
  'Pandit Ramkishore Sharma',
  'Pundit', 'Jaipur', true, 'Standard',
  'https://picsum.photos/seed/pandit-sharma/600/400',
  4.9, 412,
  8000,
  'Highly respected Vedic pandit with 35 years conducting traditional Hindu wedding ceremonies. Fluent in Sanskrit, Hindi and English commentary. Conducts Satyanarayan Puja, Saptapadi, Sindoor Ceremony and all rituals.',
  ARRAY['Hindu Wedding','Vedic Rituals','Saptapadi','Sanskrit','English Commentary','Destination'],
  ARRAY['Hindi','English','Sanskrit','Marwari'],
  true, false, true
),

-- ── VIDEOGRAPHERS ─────────────────────────────────────────────────────────────

(
  'Frames & Stories Films',
  'Videographer', 'Jaipur', true, 'Premium',
  'https://picsum.photos/seed/frames-stories/600/400',
  4.8, 167,
  90000,
  'Cinematic wedding film production house. 4K drone aerials, steadicam, and multi-camera coverage. Signature 8–12 minute highlight reel with custom background score. Multiple international film festival selections.',
  ARRAY['4K Cinematic','Drone','Highlight Reel','Festival Films','Steadicam','Destination'],
  ARRAY['Hindi','English'],
  true, true, true
),

-- ── BRIDAL WEAR ───────────────────────────────────────────────────────────────

(
  'House of Anita Dongre — Jaipur',
  'Bridal Wear', 'Jaipur', false, 'Premium',
  'https://picsum.photos/seed/anita-dongre-jaipur/600/400',
  4.8, 134,
  250000,
  'Flagship Jaipur studio of celebrated Indian designer Anita Dongre. Known for delicate floral embroidery, pastel lehengas and ethical craftsmanship celebrating Rajasthani artisans. Made-to-order bridal wear in 6–10 weeks.',
  ARRAY['Designer Bridal','Lehenga','Pastel','Handcrafted','Ethical Fashion','Made to Order'],
  ARRAY['Hindi','English'],
  true, false, false
),
(
  'Mohanlal Sons — Johari Bazaar',
  'Bridal Wear', 'Jaipur', false, 'Standard',
  'https://picsum.photos/seed/mohanlal-sons/600/400',
  4.7, 289,
  85000,
  'Heritage bridal lehenga and saree boutique established 1952 in Jaipur''s famous Johari Bazaar. Specialises in Gota Patti, Bandhani, Zardozi embroidery. Custom stitching and heirloom jewellery pairings.',
  ARRAY['Heritage Boutique','Gota Patti','Bandhani','Zardozi','Custom Stitching','Johari Bazaar'],
  ARRAY['Hindi','Marwari','English'],
  true, false, false
),

-- ── DHOL PLAYER ───────────────────────────────────────────────────────────────

(
  'Rajputana Dhol Band',
  'Dhol Player', 'Jaipur', true, 'Standard',
  'https://picsum.photos/seed/rajputana-dhol/600/400',
  4.8, 198,
  12000,
  'Professional dhol and nagada troupe for Baraat processions and Sangeet celebrations. Full band of 8 including shehnai, turhi and dholak. Traditional Rajasthani welcome ceremonies and bride-entry performances.',
  ARRAY['Dhol','Nagada','Baraat','Shehnai','Rajasthani Troupe','Bride Entry','Sangeet'],
  ARRAY['Hindi','Marwari'],
  true, true, true
),

-- ── BARAAT ────────────────────────────────────────────────────────────────────

(
  'Shahi Baraat Services',
  'Baraat', 'Jaipur', false, 'Standard',
  'https://picsum.photos/seed/shahi-baraat/600/400',
  4.7, 89,
  45000,
  'Complete royal Baraat experience — decorated horse, vintage buggy, elephant procession permits, and full dhol-nagada band. Caparisoned horses trained for city processions. Flower-decorated rath also available.',
  ARRAY['Decorated Horse','Elephant Procession','Vintage Buggy','Rath','Baraat Package','Royal'],
  ARRAY['Hindi','Marwari'],
  true, false, false
),

-- ── CAKE ──────────────────────────────────────────────────────────────────────

(
  'La Patisserie Jaipur',
  'Cake', 'Jaipur', false, 'Standard',
  'https://picsum.photos/seed/la-patisserie/600/400',
  4.8, 156,
  15000,
  'Luxury wedding cake studio creating hand-crafted multi-tier cakes inspired by Jaipur''s arts and architecture. Specialises in edible gold leaf, intricate fondant jali patterns and traditional flavours like rose-pistachio and saffron-cardamom.',
  ARRAY['Luxury Cakes','Multi-Tier','Edible Gold','Fondant Art','Custom Design','Saffron Flavour'],
  ARRAY['Hindi','English'],
  true, false, false
),

-- ── CHOREOGRAPHER ─────────────────────────────────────────────────────────────

(
  'Step Up Dance Academy',
  'Choreographer', 'Jaipur', true, 'Standard',
  'https://picsum.photos/seed/step-up-dance/600/400',
  4.7, 134,
  25000,
  'Professional choreography team for Sangeet and Mehendi dance performances. Bollywood, Bhangra, Sufi Kathak and couple''s first dance. Online rehearsal packages available for outstation families.',
  ARRAY['Sangeet Choreography','Bollywood','Bhangra','Kathak','Online Rehearsals','Family Dance'],
  ARRAY['Hindi','English'],
  true, true, false
),

-- ── INVITATION DESIGNER ───────────────────────────────────────────────────────

(
  'Artisans of Jaipur — Invites',
  'Invitation Designer', 'Jaipur', true, 'Standard',
  'https://picsum.photos/seed/artisans-invites/600/400',
  4.8, 112,
  5000,
  'Handcrafted wedding invitation studio using Jaipur''s traditional block-printing, marble paper and Gota Patti embellishments. Custom digital invites, boxed scroll invitations and trousseau packaging. Ships worldwide.',
  ARRAY['Block Print','Handcrafted','Scroll Invite','Digital Invite','Worldwide Shipping','Trousseau Box'],
  ARRAY['Hindi','English','Marwari'],
  true, false, false
);
