-- =============================================================
-- WedBridge — Seed Data
-- 143 vendors across 10 Indian cities + 15 community posts
-- =============================================================

TRUNCATE TABLE posts, basket_items, reviews, bookings, inquiries, event_teams, couples, vendors RESTART IDENTITY CASCADE;

-- ===========================================================
-- VENDORS
-- ===========================================================
-- Columns: name, category, city, is_destination_ready, plan,
--          cover_photo, rating, review_count, starting_price,
--          description, tags, languages, verified, whatsapp_active,
--          multi_day_support

INSERT INTO vendors (name, category, city, is_destination_ready, plan, cover_photo, rating, review_count, starting_price, description, tags, languages, verified, whatsapp_active, multi_day_support) VALUES

-- ─────────────────────────────────────────────
-- JAIPUR (20 vendors)
-- ─────────────────────────────────────────────
('Regal Frames Photography', 'Photographer', 'Jaipur', true, 'Premium',
 'https://picsum.photos/seed/jaipur-ph1/600/400', 4.9, 312, 85000,
 'Award-winning wedding photographers capturing the grandeur of Rajasthani weddings. We blend candid storytelling with royal heritage aesthetics.',
 ARRAY['candid','royal','heritage','pre-wedding'], ARRAY['Hindi','English','Rajasthani'], true, true, true),

('Pink City Cinematic', 'Videographer', 'Jaipur', true, 'Premium',
 'https://picsum.photos/seed/jaipur-vid1/600/400', 4.8, 187, 95000,
 'Cinematic wedding films that transport you back to your most precious moments. Specialising in palace weddings and destination events.',
 ARRAY['cinematic','drone','palace','teaser'], ARRAY['Hindi','English'], true, true, true),

('Shekhawati Decorators', 'Decorator', 'Jaipur', true, 'Destination Hub',
 'https://picsum.photos/seed/jaipur-dec1/600/400', 4.9, 256, 250000,
 'Luxury floral and theme decorations inspired by Rajasthani art. From intimate mandaps to 2,000-guest banquets.',
 ARRAY['floral','luxury','rajasthani','mandap'], ARRAY['Hindi','English','Rajasthani'], true, true, true),

('Maharaja Caterers', 'Caterer', 'Jaipur', false, 'Standard',
 'https://picsum.photos/seed/jaipur-cat1/600/400', 4.7, 403, 950,
 'Authentic Rajasthani thali and multi-cuisine catering. Dal baati churma specialists. Hygiene-certified kitchen.',
 ARRAY['rajasthani','dal-baati','multi-cuisine','live-counter'], ARRAY['Hindi','Rajasthani'], true, true, true),

('Henna Palace by Sunita', 'Mehendi Artist', 'Jaipur', true, 'Premium',
 'https://picsum.photos/seed/jaipur-meh1/600/400', 4.9, 541, 18000,
 'Master mehendi artist with 15 years experience. Bridal, bridesmaid and guest packages. Arabic, Rajasthani and fusion designs.',
 ARRAY['bridal-mehendi','arabic','rajasthani','fusion'], ARRAY['Hindi','English'], true, true, false),

('DJ Rajveer Beats', 'DJ', 'Jaipur', false, 'Standard',
 'https://picsum.photos/seed/jaipur-dj1/600/400', 4.6, 198, 28000,
 'High-energy DJ for sangeet, mehndi and wedding reception. Bollywood, Bhangra and EDM setlists tailored to your crowd.',
 ARRAY['bollywood','bhangra','edm','sangeet'], ARRAY['Hindi','English'], false, true, false),

('Amer Fort View Banquets', 'Venue', 'Jaipur', true, 'Destination Hub',
 'https://picsum.photos/seed/jaipur-ven1/600/400', 4.9, 89, 800000,
 'Heritage banquet hall with panoramic views of Amer Fort. Capacity 800 guests. Full event-management support included.',
 ARRAY['heritage','palace-view','grand','8-acre'], ARRAY['Hindi','English','Rajasthani'], true, true, true),

('Glamour Studio Jaipur', 'Bridal Makeup', 'Jaipur', true, 'Premium',
 'https://picsum.photos/seed/jaipur-mup1/600/400', 4.8, 376, 22000,
 'Internationally trained makeup artists. HD, airbrush and traditional bridal looks. Trial session included.',
 ARRAY['airbrush','hd-makeup','bridal','trial-included'], ARRAY['Hindi','English'], true, true, false),

('Pandit Ramesh Joshi', 'Pundit', 'Jaipur', false, 'Free',
 'https://picsum.photos/seed/jaipur-pun1/600/400', 4.7, 214, 11000,
 'Vedic ceremonies in Sanskrit and Hindi. Experienced with multi-day Rajasthani wedding rituals. Soft-spoken and punctual.',
 ARRAY['vedic','rajasthani-rituals','multi-day','sanskrit'], ARRAY['Hindi','Sanskrit','Rajasthani'], true, false, true),

('Rhythm Dance Academy', 'Choreographer', 'Jaipur', false, 'Standard',
 'https://picsum.photos/seed/jaipur-cho1/600/400', 4.6, 128, 35000,
 'Group and solo choreography for sangeet and reception. Bollywood, classical fusion and western styles.',
 ARRAY['sangeet','bollywood','group','solo'], ARRAY['Hindi','English'], false, true, false),

('Royal Stationery Studio', 'Invitation Designer', 'Jaipur', true, 'Standard',
 'https://picsum.photos/seed/jaipur-inv1/600/400', 4.7, 167, 8000,
 'Handcrafted wedding invitations, scroll invites and digital e-invites. Rajasthani motifs and laser-cut options.',
 ARRAY['handcrafted','scroll','rajasthani','digital'], ARRAY['Hindi','English'], false, true, false),

('Lehenga Wali Didi', 'Bridal Wear', 'Jaipur', true, 'Premium',
 'https://picsum.photos/seed/jaipur-bw1/600/400', 4.8, 302, 55000,
 'Curated bridal lehengas, sarees and indo-western outfits. Rental and purchase options. In-store styling assistance.',
 ARRAY['lehenga','saree','rental','styling'], ARRAY['Hindi','English','Rajasthani'], true, true, false),

('Thakur Dhol Wala', 'Dhol Player', 'Jaipur', false, 'Free',
 'https://picsum.photos/seed/jaipur-dho1/600/400', 4.5, 93, 5000,
 'Traditional Rajasthani dhol for baraat, mehndi and pheras. Group of 2-4 players available. Brings energy to any celebration.',
 ARRAY['baraat','traditional','dhol-nagada','folk'], ARRAY['Hindi','Rajasthani'], false, true, false),

('Ghodi Baraat Services', 'Baraat', 'Jaipur', false, 'Standard',
 'https://picsum.photos/seed/jaipur-bar1/600/400', 4.6, 77, 15000,
 'Decorated mare, vintage car and buggy options for baraat processions. LED-lit carriages and floral decoration included.',
 ARRAY['ghodi','vintage-car','decorated','led'], ARRAY['Hindi','Rajasthani'], false, true, false),

('Sugar & Spice Cakes', 'Cake', 'Jaipur', false, 'Standard',
 'https://picsum.photos/seed/jaipur-cak1/600/400', 4.7, 145, 7500,
 'Bespoke multi-tier wedding cakes with eggless options. Photo cakes, fondant art and traditional mithai towers.',
 ARRAY['fondant','eggless','multi-tier','mithai-tower'], ARRAY['Hindi','English'], false, true, false),

('Snapshot Stories', 'Photographer', 'Jaipur', false, 'Standard',
 'https://picsum.photos/seed/jaipur-ph2/600/400', 4.5, 189, 32000,
 'Candid and traditional wedding photography. Budget-friendly packages for smaller ceremonies and intimate celebrations.',
 ARRAY['candid','traditional','budget','intimate'], ARRAY['Hindi','English'], false, true, false),

('CineCraft Films', 'Videographer', 'Jaipur', false, 'Standard',
 'https://picsum.photos/seed/jaipur-vid2/600/400', 4.6, 112, 45000,
 'Wedding films with drone aerials and creative reels for social media. Fast turnaround — highlights ready in 7 days.',
 ARRAY['drone','reels','fast-delivery','social-media'], ARRAY['Hindi','English'], false, true, false),

('Maa Sheetal Caterers', 'Caterer', 'Jaipur', false, 'Agent Managed',
 'https://picsum.photos/seed/jaipur-cat2/600/400', 4.5, 88, 650,
 'Home-style Rajasthani and Punjabi catering. Family-run kitchen. WedBridge agent assists with digital bookings on their behalf.',
 ARRAY['home-style','rajasthani','punjabi','agent-managed'], ARRAY['Hindi','Rajasthani'], false, false, false),

('Suresh Wedding Clicks', 'Photographer', 'Jaipur', false, 'Agent Managed',
 'https://picsum.photos/seed/jaipur-ph3/600/400', 4.3, 56, 18000,
 'Local photographer with 12 years experience. Covers religious ceremonies with sensitivity. WedBridge agent handles all inquiries.',
 ARRAY['local','traditional','religious','agent-managed'], ARRAY['Hindi','Rajasthani'], false, false, false),

('Haveli Lights & Decor', 'Decorator', 'Jaipur', true, 'Destination Hub',
 'https://picsum.photos/seed/jaipur-dec2/600/400', 4.8, 143, 180000,
 'Specialised in haveli and fort venue transformations. Fairy lights, drapes, marigold and mogra floral installations.',
 ARRAY['haveli','fairy-lights','marigold','fort'], ARRAY['Hindi','English'], true, true, true),

-- ─────────────────────────────────────────────
-- DELHI NCR (15 vendors)
-- ─────────────────────────────────────────────
('Capital Lens Studio', 'Photographer', 'Delhi NCR', true, 'Premium',
 'https://picsum.photos/seed/delhi-ph1/600/400', 4.9, 487, 90000,
 'Delhi''s most sought-after wedding photographers. Vogue-style editorial shoots combined with heartfelt candid moments.',
 ARRAY['editorial','candid','luxury','vogue'], ARRAY['Hindi','English','Punjabi'], true, true, true),

('Dilli Weds Films', 'Videographer', 'Delhi NCR', true, 'Premium',
 'https://picsum.photos/seed/delhi-vid1/600/400', 4.8, 234, 110000,
 'High-end wedding cinematography. 4K, drone and red-carpet style coverage. International standard editing.',
 ARRAY['4k','drone','red-carpet','international'], ARRAY['Hindi','English'], true, true, true),

('Blooms & Grandeur Delhi', 'Decorator', 'Delhi NCR', true, 'Destination Hub',
 'https://picsum.photos/seed/delhi-dec1/600/400', 4.9, 312, 350000,
 'Luxury 5-star hotel event decoration specialists. Exclusive floral imports, draping and lighting design.',
 ARRAY['5-star','luxury','imported-florals','lighting-design'], ARRAY['Hindi','English'], true, true, true),

('Delhi Darbar Caterers', 'Caterer', 'Delhi NCR', false, 'Premium',
 'https://picsum.photos/seed/delhi-cat1/600/400', 4.8, 523, 1200,
 'Delhi''s premier event caterer. Mughlai, North Indian, Continental and live-counter buffets. FSSAI certified.',
 ARRAY['mughlai','north-indian','continental','fssai'], ARRAY['Hindi','English','Punjabi'], true, true, true),

('Mehendi Magic by Priya', 'Mehendi Artist', 'Delhi NCR', true, 'Premium',
 'https://picsum.photos/seed/delhi-meh1/600/400', 4.9, 612, 20000,
 'Celebrity mehendi artist. 18 years experience. Intricate bridal designs with hidden groom''s name. Team of 4 artists.',
 ARRAY['bridal','intricate','hidden-name','team'], ARRAY['Hindi','English','Punjabi'], true, true, false),

('Bass Drop DJ Events', 'DJ', 'Delhi NCR', false, 'Standard',
 'https://picsum.photos/seed/delhi-dj1/600/400', 4.7, 289, 38000,
 'Professional DJ with 10 years experience. Custom playlists, lighting effects and fog machines. Crowd-reading expert.',
 ARRAY['crowd-reading','lighting','fog-machine','custom-playlist'], ARRAY['Hindi','English','Punjabi'], true, true, false),

('The Grand Ballroom NCR', 'Venue', 'Delhi NCR', false, 'Destination Hub',
 'https://picsum.photos/seed/delhi-ven1/600/400', 4.8, 178, 1500000,
 'Premium banquet hall in South Delhi. 1,200 guest capacity, in-house catering, valet parking. 3 hall configurations.',
 ARRAY['5-star','south-delhi','1200-capacity','valet'], ARRAY['Hindi','English'], true, true, true),

('Makeup by Meera', 'Bridal Makeup', 'Delhi NCR', true, 'Premium',
 'https://picsum.photos/seed/delhi-mup1/600/400', 4.9, 445, 28000,
 'Bollywood-style bridal makeup artist. Works with MAC, NARS and Charlotte Tilbury. Destination bookings available.',
 ARRAY['bollywood','mac','airbrush','trial'], ARRAY['Hindi','English'], true, true, false),

('Vedic Vivah Pundit', 'Pundit', 'Delhi NCR', true, 'Standard',
 'https://picsum.photos/seed/delhi-pun1/600/400', 4.7, 198, 13000,
 'Bilingual pandit conducting ceremonies in Hindi and English. Comfortable with NRI couples and intercultural weddings.',
 ARRAY['bilingual','nri','intercultural','multi-faith'], ARRAY['Hindi','English','Sanskrit'], true, false, true),

('Groove Factory Choreography', 'Choreographer', 'Delhi NCR', false, 'Standard',
 'https://picsum.photos/seed/delhi-cho1/600/400', 4.7, 167, 45000,
 'Sangeet choreography specialists. Works with families and wedding parties. From 1 week to 3 months of rehearsal packages.',
 ARRAY['sangeet','family','parties','bollywood'], ARRAY['Hindi','English','Punjabi'], false, true, false),

('Paper & Petals Invitations', 'Invitation Designer', 'Delhi NCR', true, 'Standard',
 'https://picsum.photos/seed/delhi-inv1/600/400', 4.8, 234, 12000,
 'Luxury wedding stationery studio. Foil printing, letterpress and digital suite. Ships worldwide for NRI couples.',
 ARRAY['foil','letterpress','worldwide-shipping','nri'], ARRAY['Hindi','English'], true, true, false),

('Rohit Bridal Wear', 'Bridal Wear', 'Delhi NCR', true, 'Destination Hub',
 'https://picsum.photos/seed/delhi-bw1/600/400', 4.8, 367, 75000,
 'Designer bridal collection from top Indian labels. Shyamal & Bhumika, Manish Malhotra replicas and originals.',
 ARRAY['designer','manish-malhotra','lehenga','silk'], ARRAY['Hindi','English','Punjabi'], true, true, false),

('Zafar''s Biryani & Events', 'Caterer', 'Delhi NCR', false, 'Standard',
 'https://picsum.photos/seed/delhi-cat2/600/400', 4.6, 312, 800,
 'Old Delhi style biryani and kebab specialists. Dum biryani cooked on-site. Wazwan and nihari packages available.',
 ARRAY['biryani','kebab','old-delhi','wazwan'], ARRAY['Hindi','Urdu','English'], false, true, false),

('Horizon Moments Photography', 'Photographer', 'Delhi NCR', false, 'Standard',
 'https://picsum.photos/seed/delhi-ph2/600/400', 4.6, 203, 42000,
 'Wedding photography with a focus on honest emotions. Documentary style merged with traditional portraits.',
 ARRAY['documentary','candid','portraits','honest'], ARRAY['Hindi','English'], false, true, false),

('NCR Beat Factory', 'DJ', 'Delhi NCR', false, 'Standard',
 'https://picsum.photos/seed/delhi-dj2/600/400', 4.5, 145, 25000,
 'DJ services for sangeet, cocktail and reception. Bilingual MC services available. Haryanvi, Punjabi and Bollywood mixes.',
 ARRAY['mc-services','haryanvi','punjabi','cocktail'], ARRAY['Hindi','English','Punjabi','Haryanvi'], false, true, false),

-- ─────────────────────────────────────────────
-- MUMBAI (10 vendors)
-- ─────────────────────────────────────────────
('Bollywood Candids', 'Photographer', 'Mumbai', true, 'Destination Hub',
 'https://picsum.photos/seed/mumbai-ph1/600/400', 4.9, 398, 95000,
 'Cinematic storytelling photography loved by Mumbai''s film and business elite. Pre-wedding shoots at iconic Mumbai locations.',
 ARRAY['cinematic','luxury','film-industry','pre-wedding'], ARRAY['Hindi','English','Marathi'], true, true, true),

('Sea View Films', 'Videographer', 'Mumbai', true, 'Premium',
 'https://picsum.photos/seed/mumbai-vid1/600/400', 4.8, 221, 120000,
 'Luxury wedding films for destination and city weddings. Aerial drone over Marine Drive, drone at Bandra and Juhu.',
 ARRAY['aerial','marine-drive','drone','luxury'], ARRAY['Hindi','English'], true, true, true),

('Matunga Mandap Decorators', 'Decorator', 'Mumbai', false, 'Standard',
 'https://picsum.photos/seed/mumbai-dec1/600/400', 4.7, 178, 120000,
 'Traditional South Indian and Maharashtrian mandap decorations. Banana leaf, jasmine and marigold installations.',
 ARRAY['south-indian','maharashtrian','jasmine','banana-leaf'], ARRAY['Hindi','Marathi','Tamil','English'], true, true, true),

('Coastal Caterers Mumbai', 'Caterer', 'Mumbai', false, 'Premium',
 'https://picsum.photos/seed/mumbai-cat1/600/400', 4.8, 456, 1100,
 'Mumbai''s leading wedding caterer. Coastal seafood, Punjabi, South Indian and Continental menus. FSSAI gold certified.',
 ARRAY['seafood','coastal','south-indian','fssai-gold'], ARRAY['Hindi','Marathi','English'], true, true, true),

('Henna House Mumbai', 'Mehendi Artist', 'Mumbai', true, 'Standard',
 'https://picsum.photos/seed/mumbai-meh1/600/400', 4.7, 289, 16000,
 'Bridal and bridesmaid mehendi packages. Arabic, Marwari and contemporary geometric patterns.',
 ARRAY['arabic','marwari','geometric','bridesmaid'], ARRAY['Hindi','Marathi','English'], false, true, false),

('Juhu Beach Weddings', 'Venue', 'Mumbai', true, 'Destination Hub',
 'https://picsum.photos/seed/mumbai-ven1/600/400', 4.8, 123, 600000,
 'Exclusive beach wedding venue at Juhu. Sunset ceremonies, marquee setup and catering coordination. 400 guest capacity.',
 ARRAY['beach','sunset','marquee','400-capacity'], ARRAY['Hindi','English','Marathi'], true, true, true),

('Bollywood Bride Makeup', 'Bridal Makeup', 'Mumbai', true, 'Premium',
 'https://picsum.photos/seed/mumbai-mup1/600/400', 4.9, 512, 32000,
 'Bollywood-inspired bridal and bridesmaid looks. Airbrush foundation, HD contouring. Works across India.',
 ARRAY['bollywood','airbrush','hd','bridesmaid-packages'], ARRAY['Hindi','Marathi','English'], true, true, false),

('DJ Zeus Mumbai', 'DJ', 'Mumbai', false, 'Premium',
 'https://picsum.photos/seed/mumbai-dj1/600/400', 4.8, 267, 55000,
 'High-end DJ for luxury Mumbai weddings. Dolby sound systems, LED walls and live percussion add-ons.',
 ARRAY['dolby','led-wall','live-percussion','luxury'], ARRAY['Hindi','English','Marathi'], true, true, false),

('Andheri Cake Atelier', 'Cake', 'Mumbai', false, 'Standard',
 'https://picsum.photos/seed/mumbai-cak1/600/400', 4.7, 198, 9500,
 'Custom wedding cakes with Bollywood, Mughal and modern themes. Vegan and eggless options. Delivery across Mumbai.',
 ARRAY['vegan','eggless','bollywood-theme','custom'], ARRAY['Hindi','Marathi','English'], false, true, false),

('Mumbai Moments Photography', 'Photographer', 'Mumbai', false, 'Standard',
 'https://picsum.photos/seed/mumbai-ph2/600/400', 4.6, 178, 45000,
 'Documentary wedding photography. Natural light specialist. Captures the joy and chaos of big fat Indian weddings.',
 ARRAY['documentary','natural-light','candid','emotional'], ARRAY['Hindi','Marathi','English'], false, true, false),

-- ─────────────────────────────────────────────
-- GOA (8 vendors)
-- ─────────────────────────────────────────────
('Golden Hour Goa Photography', 'Photographer', 'Goa', true, 'Destination Hub',
 'https://picsum.photos/seed/goa-ph1/600/400', 4.9, 312, 110000,
 'Destination wedding photography specialists in Goa. Beach sunsets, heritage villas and resort venues. Also available for overseas weddings.',
 ARRAY['beach','golden-hour','destination','villa'], ARRAY['Hindi','English','Konkani'], true, true, true),

('Coastal Blooms Goa', 'Decorator', 'Goa', true, 'Destination Hub',
 'https://picsum.photos/seed/goa-dec1/600/400', 4.9, 198, 200000,
 'Beach and resort wedding decoration. Tropical florals, driftwood arches, fairy lights and sustainable decor options.',
 ARRAY['beach','tropical','driftwood','sustainable'], ARRAY['Hindi','English','Konkani','Portuguese'], true, true, true),

('Spice Route Caterers', 'Caterer', 'Goa', false, 'Premium',
 'https://picsum.photos/seed/goa-cat1/600/400', 4.8, 234, 1300,
 'Goan, North Indian and Continental fusion catering. Fresh seafood, bebinca dessert and feni cocktail service.',
 ARRAY['goan','seafood','bebinca','feni'], ARRAY['Hindi','English','Konkani'], true, true, false),

('Goa Beach Weddings Venue', 'Venue', 'Goa', true, 'Destination Hub',
 'https://picsum.photos/seed/goa-ven1/600/400', 4.9, 167, 1200000,
 'Private beach resort with wedding ceremony and reception packages. Sunrise and sunset slot available. 300-guest capacity.',
 ARRAY['private-beach','resort','sunrise','300-capacity'], ARRAY['Hindi','English','Konkani'], true, true, true),

('DJ Tropics Goa', 'DJ', 'Goa', true, 'Standard',
 'https://picsum.photos/seed/goa-dj1/600/400', 4.7, 189, 48000,
 'Beach party and wedding DJ. Tropical house, Bollywood and international setlists. Outdoor waterproof sound systems.',
 ARRAY['tropical-house','beach-party','outdoor','waterproof'], ARRAY['Hindi','English','Konkani'], false, true, false),

('Papaya Bridal Goa', 'Bridal Makeup', 'Goa', true, 'Premium',
 'https://picsum.photos/seed/goa-mup1/600/400', 4.8, 267, 25000,
 'Boho, beach and traditional bridal makeup. Works with international brides and destination weddings. Airbrush specialist.',
 ARRAY['boho','beach-bride','international','airbrush'], ARRAY['Hindi','English','Konkani'], true, true, false),

('Goa Frames Cinematic', 'Videographer', 'Goa', true, 'Destination Hub',
 'https://picsum.photos/seed/goa-vid1/600/400', 4.8, 145, 130000,
 'Award-winning destination wedding films. Drone footage of Goa beaches, spice farms and heritage churches.',
 ARRAY['award-winning','drone','heritage-church','destination'], ARRAY['Hindi','English'], true, true, true),

('The Bougainvillea Resort', 'Venue', 'Goa', true, 'Destination Hub',
 'https://picsum.photos/seed/goa-ven2/600/400', 4.9, 112, 1800000,
 'Luxury 5-star resort wedding venue. Portuguese-style architecture, gardens and private beach. 500-guest capacity.',
 ARRAY['5-star','portuguese','garden','500-capacity'], ARRAY['Hindi','English','Portuguese','Konkani'], true, true, true),

-- ─────────────────────────────────────────────
-- UDAIPUR (7 vendors)
-- ─────────────────────────────────────────────
('Lake City Shutters', 'Photographer', 'Udaipur', true, 'Destination Hub',
 'https://picsum.photos/seed/udaipur-ph1/600/400', 4.9, 267, 100000,
 'Royal wedding photography by the lakes of Udaipur. Boat ceremonies, palace backdrops and golden-hour portraits.',
 ARRAY['lake','palace','royal','boat-ceremony'], ARRAY['Hindi','English','Rajasthani'], true, true, true),

('Palace Blooms Udaipur', 'Decorator', 'Udaipur', true, 'Destination Hub',
 'https://picsum.photos/seed/udaipur-dec1/600/400', 4.9, 198, 300000,
 'Spectacular palace and lakeside decoration for destination weddings. Rose petal pathways, floating candles and chandelier draping.',
 ARRAY['palace','lakeside','floating-candles','chandeliers'], ARRAY['Hindi','English'], true, true, true),

('Udaipur Heritage Venues', 'Venue', 'Udaipur', true, 'Destination Hub',
 'https://picsum.photos/seed/udaipur-ven1/600/400', 5.0, 89, 2500000,
 'Historic palace and havelis for royal weddings. Lake Pichola views, curated vendor networks and full event management.',
 ARRAY['palace','lake-pichola','royal','full-event'], ARRAY['Hindi','English','Rajasthani'], true, true, true),

('Maharani Mehendi', 'Mehendi Artist', 'Udaipur', true, 'Premium',
 'https://picsum.photos/seed/udaipur-meh1/600/400', 4.9, 312, 22000,
 'Royal Rajputana mehendi art. Intricate palace motifs, peacock and elephant designs. Available for destination events.',
 ARRAY['royal','peacock','elephant','rajputana'], ARRAY['Hindi','English','Rajasthani'], true, true, false),

('Blue City Films', 'Videographer', 'Udaipur', true, 'Destination Hub',
 'https://picsum.photos/seed/udaipur-vid1/600/400', 4.8, 143, 135000,
 'Destination wedding films set against Udaipur''s lakes and palaces. Available for international destination weddings.',
 ARRAY['lakes','palaces','international','aerial'], ARRAY['Hindi','English'], true, true, true),

('Rajwada Caterers', 'Caterer', 'Udaipur', false, 'Standard',
 'https://picsum.photos/seed/udaipur-cat1/600/400', 4.7, 178, 1000,
 'Authentic Mewari cuisine and royal thali service. Speciality panchkuta, ker-sangri and Rajasthani sweets.',
 ARRAY['mewari','panchkuta','ker-sangri','royal-thali'], ARRAY['Hindi','Rajasthani'], false, true, true),

('Udaipur Bridal Studio', 'Bridal Makeup', 'Udaipur', true, 'Premium',
 'https://picsum.photos/seed/udaipur-mup1/600/400', 4.8, 223, 24000,
 'Bridal makeup for destination weddings. Understands royal Rajput bridal look. Available across Rajasthan.',
 ARRAY['rajput-bridal','destination','royal','traditional'], ARRAY['Hindi','English','Rajasthani'], true, true, false),

-- ─────────────────────────────────────────────
-- CHANDIGARH (8 vendors)
-- ─────────────────────────────────────────────
('Rose Garden Photography', 'Photographer', 'Chandigarh', true, 'Premium',
 'https://picsum.photos/seed/chd-ph1/600/400', 4.8, 289, 65000,
 'Award-winning Punjabi wedding photographers. High-fashion portraits, emotional candids and family formals.',
 ARRAY['punjabi','high-fashion','candid','family-formals'], ARRAY['Hindi','Punjabi','English'], true, true, true),

('Punjab Da Dhol', 'Dhol Player', 'Chandigarh', false, 'Standard',
 'https://picsum.photos/seed/chd-dho1/600/400', 4.8, 312, 8000,
 'The most energetic dhol party in Chandigarh. Group of 6 players. Bhangra dhol for baraat, tilak and mehendi.',
 ARRAY['bhangra','baraat','6-player','high-energy'], ARRAY['Hindi','Punjabi'], false, true, false),

('Chandigarh Event Decorators', 'Decorator', 'Chandigarh', false, 'Premium',
 'https://picsum.photos/seed/chd-dec1/600/400', 4.7, 198, 150000,
 'Modern Punjabi wedding decor. Contemporary floral, neon signs, hashtag frames and photobooths.',
 ARRAY['modern','neon','hashtag-frame','photobooth'], ARRAY['Hindi','Punjabi','English'], false, true, false),

('Amritsari Caterers Chandigarh', 'Caterer', 'Chandigarh', false, 'Standard',
 'https://picsum.photos/seed/chd-cat1/600/400', 4.8, 456, 900,
 'Authentic Punjabi wedding food. Tandoori, dal makhani, butter chicken and sarson-da-saag. Jain menu available.',
 ARRAY['punjabi','tandoori','dal-makhani','jain-menu'], ARRAY['Hindi','Punjabi'], true, true, true),

('Bride''s Canvas Chandigarh', 'Bridal Makeup', 'Chandigarh', false, 'Premium',
 'https://picsum.photos/seed/chd-mup1/600/400', 4.8, 278, 20000,
 'Punjabi bridal specialist. Heavy bridal, cocktail and mehendi makeup packages. Bridal trial included.',
 ARRAY['heavy-bridal','cocktail','mehendi-makeup','trial'], ARRAY['Hindi','Punjabi','English'], true, true, false),

('Bass Culture DJ Chandigarh', 'DJ', 'Chandigarh', false, 'Standard',
 'https://picsum.photos/seed/chd-dj1/600/400', 4.7, 223, 30000,
 'Bhangra, Bollywood and EDM DJ services. LED dance floor hire, truss lighting and smoke effects.',
 ARRAY['bhangra','led-floor','truss','smoke-effects'], ARRAY['Hindi','Punjabi','English'], false, true, false),

('Sector 17 Banquets', 'Venue', 'Chandigarh', false, 'Standard',
 'https://picsum.photos/seed/chd-ven1/600/400', 4.6, 145, 250000,
 'Central Chandigarh banquet hall. 600-guest capacity. Rooftop terrace and garden lawn available.',
 ARRAY['central','rooftop','garden','600-capacity'], ARRAY['Hindi','Punjabi','English'], true, true, true),

('Anand Vivah Pundit', 'Pundit', 'Chandigarh', false, 'Free',
 'https://picsum.photos/seed/chd-pun1/600/400', 4.6, 134, 9000,
 'Experienced pandit for Anand Karaj and Hindu ceremonies. Comfortable with inter-caste and NRI couples.',
 ARRAY['anand-karaj','hindu','nri-friendly','inter-caste'], ARRAY['Hindi','Punjabi','Sanskrit'], false, false, true),

-- ─────────────────────────────────────────────
-- PUNE (8 vendors)
-- ─────────────────────────────────────────────
('Pune Portraits Studio', 'Photographer', 'Pune', false, 'Standard',
 'https://picsum.photos/seed/pune-ph1/600/400', 4.7, 198, 48000,
 'Candid and cinematic wedding photography for Maharashtrian and intercultural weddings.',
 ARRAY['candid','cinematic','maharashtrian','intercultural'], ARRAY['Hindi','Marathi','English'], false, true, false),

('Deccan Decorators', 'Decorator', 'Pune', false, 'Premium',
 'https://picsum.photos/seed/pune-dec1/600/400', 4.7, 167, 130000,
 'Traditional Maharashtrian and modern fusion decorations. Kesariya floral, paithani silk drapes and terracotta elements.',
 ARRAY['maharashtrian','paithani','terracotta','kesariya'], ARRAY['Hindi','Marathi','English'], false, true, true),

('Pune Spice Caterers', 'Caterer', 'Pune', false, 'Standard',
 'https://picsum.photos/seed/pune-cat1/600/400', 4.7, 312, 850,
 'Maharashtrian, North Indian and South Indian wedding catering. Puranpoli, shrikhand and modak desserts.',
 ARRAY['maharashtrian','puranpoli','shrikhand','modak'], ARRAY['Hindi','Marathi','English'], true, true, false),

('Henna Trails Pune', 'Mehendi Artist', 'Pune', false, 'Standard',
 'https://picsum.photos/seed/pune-meh1/600/400', 4.7, 189, 13000,
 'Bridal and bridesmaid mehendi. Contemporary Maharashtrian patterns and Arabic fusion designs.',
 ARRAY['maharashtrian-patterns','arabic-fusion','bridesmaid','bridal'], ARRAY['Hindi','Marathi','English'], false, true, false),

('DJ Peshwa Pune', 'DJ', 'Pune', false, 'Standard',
 'https://picsum.photos/seed/pune-dj1/600/400', 4.6, 178, 27000,
 'Pune''s energetic DJ for sangeet and reception. Marathi, Bollywood and Punjabi mixes. Outdoor setup available.',
 ARRAY['marathi','bollywood','outdoor','sangeet'], ARRAY['Hindi','Marathi','English'], false, true, false),

('Sinhagad Banquets', 'Venue', 'Pune', false, 'Standard',
 'https://picsum.photos/seed/pune-ven1/600/400', 4.6, 112, 200000,
 'Hilltop wedding venue overlooking Pune city. Sunset ceremony deck and indoor hall. 500-guest capacity.',
 ARRAY['hilltop','sunset-deck','panoramic','500-capacity'], ARRAY['Hindi','Marathi','English'], true, true, true),

('Glow Bridal Pune', 'Bridal Makeup', 'Pune', false, 'Standard',
 'https://picsum.photos/seed/pune-mup1/600/400', 4.7, 223, 16000,
 'Natural-glow and HD bridal makeup. Maharashtrian and modern bridal looks. Home visits available.',
 ARRAY['natural-glow','hd','maharashtrian','home-visit'], ARRAY['Hindi','Marathi','English'], false, true, false),

('Sweet Moments Bakery Pune', 'Cake', 'Pune', false, 'Free',
 'https://picsum.photos/seed/pune-cak1/600/400', 4.5, 134, 6000,
 'Custom wedding cakes with Maharashtrian and fusion themes. Eggless options. Modak-inspired designs.',
 ARRAY['eggless','modak-inspired','custom','budget'], ARRAY['Hindi','Marathi','English'], false, true, false),

-- ─────────────────────────────────────────────
-- HYDERABAD (8 vendors)
-- ─────────────────────────────────────────────
('Nawab Photography Hyderabad', 'Photographer', 'Hyderabad', true, 'Premium',
 'https://picsum.photos/seed/hyd-ph1/600/400', 4.8, 267, 70000,
 'Hyderabad''s leading wedding photographers. Specialist in Telangana Hindu and Muslim wedding coverage.',
 ARRAY['telangana','muslim-weddings','candid','royal'], ARRAY['Hindi','Telugu','Urdu','English'], true, true, true),

('Golconda Decors', 'Decorator', 'Hyderabad', false, 'Premium',
 'https://picsum.photos/seed/hyd-dec1/600/400', 4.8, 189, 160000,
 'Nizam-inspired luxury wedding decoration. Pearl motifs, antique gold frames and Hyderabadi floral traditions.',
 ARRAY['nizam','pearl-motifs','gold-frames','hyderabadi'], ARRAY['Hindi','Telugu','Urdu','English'], true, true, true),

('Dum Biryani Caterers', 'Caterer', 'Hyderabad', false, 'Premium',
 'https://picsum.photos/seed/hyd-cat1/600/400', 4.9, 534, 1000,
 'Authentic Hyderabadi biryani and haleem for weddings. 2000+ plates daily capacity. Wazwan packages for Muslim weddings.',
 ARRAY['hyderabadi-biryani','haleem','wazwan','2000-capacity'], ARRAY['Hindi','Telugu','Urdu','English'], true, true, true),

('Kalamkari Mehendi Art', 'Mehendi Artist', 'Hyderabad', false, 'Standard',
 'https://picsum.photos/seed/hyd-meh1/600/400', 4.8, 256, 15000,
 'Traditional and modern mehendi designs. Kalamkari-inspired patterns and Arabic geometric fusion.',
 ARRAY['kalamkari','arabic','geometric','traditional'], ARRAY['Hindi','Telugu','Urdu'], false, true, false),

('Hyderabad DJ Events', 'DJ', 'Hyderabad', false, 'Standard',
 'https://picsum.photos/seed/hyd-dj1/600/400', 4.6, 189, 32000,
 'DJ for Telugu and North Indian weddings. Telangana folk, Bollywood and Arabic mashups.',
 ARRAY['telangana-folk','bollywood','arabic','mashup'], ARRAY['Hindi','Telugu','English'], false, true, false),

('Falaknuma Banquets', 'Venue', 'Hyderabad', true, 'Destination Hub',
 'https://picsum.photos/seed/hyd-ven1/600/400', 4.9, 134, 2000000,
 'Heritage palace venue in the style of Falaknuma. Nizam-era architecture, 1000 capacity and full event management.',
 ARRAY['nizam-heritage','palace','1000-capacity','full-event'], ARRAY['Hindi','Telugu','Urdu','English'], true, true, true),

('Pearl Bridal Studio', 'Bridal Makeup', 'Hyderabad', false, 'Standard',
 'https://picsum.photos/seed/hyd-mup1/600/400', 4.7, 212, 18000,
 'Hyderabadi and South Indian bridal makeup. Pearls and kundan jewellery styling consultations.',
 ARRAY['hyderabadi','south-indian','kundan','pearls'], ARRAY['Hindi','Telugu','Urdu','English'], false, true, false),

('Chai & Cake Hyderabad', 'Cake', 'Hyderabad', false, 'Free',
 'https://picsum.photos/seed/hyd-cak1/600/400', 4.5, 98, 7000,
 'Wedding cakes with Hyderabadi fusion themes. Badam halwa cake, dry fruit tiers. Eggless options.',
 ARRAY['hyderabadi-fusion','badam-halwa','dry-fruit','eggless'], ARRAY['Hindi','Telugu','Urdu','English'], false, true, false),

-- ─────────────────────────────────────────────
-- BENGALURU (8 vendors)
-- ─────────────────────────────────────────────
('Garden City Frames', 'Photographer', 'Bengaluru', true, 'Premium',
 'https://picsum.photos/seed/blr-ph1/600/400', 4.8, 312, 72000,
 'South Indian and intercultural wedding photography. Specialist in outdoor garden and resort venues.',
 ARRAY['south-indian','garden','outdoor','resort'], ARRAY['Hindi','Kannada','Tamil','English'], true, true, true),

('Namma Decors', 'Decorator', 'Bengaluru', false, 'Standard',
 'https://picsum.photos/seed/blr-dec1/600/400', 4.7, 178, 120000,
 'Kannada and Tamil wedding decorations. Jasmine, marigold and banana-leaf traditional setups.',
 ARRAY['kannada','tamil','jasmine','banana-leaf'], ARRAY['Hindi','Kannada','Tamil','English'], true, true, true),

('Saraswati Caterers', 'Caterer', 'Bengaluru', false, 'Standard',
 'https://picsum.photos/seed/blr-cat1/600/400', 4.7, 389, 900,
 'Udupi and North Indian wedding catering. Leaf meals, payasam and rasam-rice traditional menus.',
 ARRAY['udupi','leaf-meal','payasam','north-indian'], ARRAY['Hindi','Kannada','Tamil','English'], true, true, false),

('Jasmines Bridal Bengaluru', 'Bridal Makeup', 'Bengaluru', false, 'Premium',
 'https://picsum.photos/seed/blr-mup1/600/400', 4.8, 289, 22000,
 'South Indian bridal makeup specialist. Kanjeevaram saree draping and traditional Bharatanatyam-inspired looks.',
 ARRAY['south-indian','kanjeevaram','bharatanatyam','traditional'], ARRAY['Hindi','Kannada','Tamil','English'], true, true, false),

('Bengaluru Beats DJ', 'DJ', 'Bengaluru', false, 'Standard',
 'https://picsum.photos/seed/blr-dj1/600/400', 4.6, 167, 30000,
 'Kannada, Tamil, Telugu and Bollywood DJ. Outdoor terrace and garden setup specialists.',
 ARRAY['kannada','tamil','telugu','garden-setup'], ARRAY['Hindi','Kannada','Tamil','English'], false, true, false),

('Lalbagh Garden Weddings', 'Venue', 'Bengaluru', false, 'Premium',
 'https://picsum.photos/seed/blr-ven1/600/400', 4.8, 134, 500000,
 'Garden wedding venue near Lalbagh. Open-air ceremonies, pergola and enclosed reception hall. 600-guest capacity.',
 ARRAY['garden','pergola','open-air','600-capacity'], ARRAY['Hindi','Kannada','Tamil','English'], true, true, true),

('IT City Photography', 'Photographer', 'Bengaluru', false, 'Standard',
 'https://picsum.photos/seed/blr-ph2/600/400', 4.6, 189, 40000,
 'Modern wedding photography for Bengaluru''s cosmopolitan couples. Registry, court and traditional ceremonies covered.',
 ARRAY['cosmopolitan','registry','court','modern'], ARRAY['Hindi','Kannada','English'], false, true, false),

('Silk City Bridal Wear', 'Bridal Wear', 'Bengaluru', true, 'Premium',
 'https://picsum.photos/seed/blr-bw1/600/400', 4.8, 267, 65000,
 'Authentic Kanjeevaram, Mysore silk and contemporary fusion bridal wear. Saree draping artists included.',
 ARRAY['kanjeevaram','mysore-silk','fusion','draping-artist'], ARRAY['Hindi','Kannada','Tamil','English'], true, true, false),

-- ─────────────────────────────────────────────
-- KOLKATA (8 vendors)
-- ─────────────────────────────────────────────
('Bong Wedding Stories', 'Photographer', 'Kolkata', false, 'Premium',
 'https://picsum.photos/seed/kol-ph1/600/400', 4.8, 267, 60000,
 'Specialist in traditional Bengali wedding photography. Sindoor khela, shubho drishti and bou bhaat ceremonies.',
 ARRAY['bengali','sindoor-khela','shubho-drishti','traditional'], ARRAY['Hindi','Bengali','English'], true, true, true),

('Puja Decorators Kolkata', 'Decorator', 'Kolkata', false, 'Standard',
 'https://picsum.photos/seed/kol-dec1/600/400', 4.7, 189, 100000,
 'Traditional Bengali and modern wedding decorations. Shola art, alpona and yellow marigold mandap creations.',
 ARRAY['bengali','shola-art','alpona','marigold'], ARRAY['Hindi','Bengali','English'], false, true, true),

('Kolkata Kitchen Caterers', 'Caterer', 'Kolkata', false, 'Standard',
 'https://picsum.photos/seed/kol-cat1/600/400', 4.8, 423, 850,
 'Traditional Bengali wedding catering. Kosha mangsho, chingri malai curry, mishti doi and rasgulla.',
 ARRAY['bengali','kosha-mangsho','mishti-doi','rasgulla'], ARRAY['Hindi','Bengali','English'], true, true, false),

('Henna by Amara Kolkata', 'Mehendi Artist', 'Kolkata', false, 'Standard',
 'https://picsum.photos/seed/kol-meh1/600/400', 4.7, 198, 12000,
 'Bengali bridal mehendi with traditional lotus and fish motifs. Arabic and Rajasthani patterns also available.',
 ARRAY['bengali','lotus','fish-motif','arabic'], ARRAY['Hindi','Bengali','English'], false, true, false),

('Park Street Banquets', 'Venue', 'Kolkata', false, 'Premium',
 'https://picsum.photos/seed/kol-ven1/600/400', 4.7, 145, 400000,
 'Heritage venue on Kolkata''s iconic Park Street. 700 guests, rooftop ceremony area and colonial-era architecture.',
 ARRAY['heritage','park-street','colonial','700-capacity'], ARRAY['Hindi','Bengali','English'], true, true, true),

('Esplanade Films', 'Videographer', 'Kolkata', false, 'Standard',
 'https://picsum.photos/seed/kol-vid1/600/400', 4.7, 134, 55000,
 'Bengali wedding videography. Emotional ceremonies, bou bhaat and reception coverage. Social media highlights.',
 ARRAY['bengali','bou-bhaat','emotional','social-media'], ARRAY['Hindi','Bengali','English'], false, true, false),

('Durga Bridal Studio', 'Bridal Makeup', 'Kolkata', false, 'Standard',
 'https://picsum.photos/seed/kol-mup1/600/400', 4.7, 212, 17000,
 'Traditional Bengali bridal makeup. Sandalwood paste, red and white sari draping assistance.',
 ARRAY['bengali-bridal','sandalwood','red-white','draping'], ARRAY['Hindi','Bengali','English'], false, true, false),

('Sweet Bengal Cakes', 'Cake', 'Kolkata', false, 'Free',
 'https://picsum.photos/seed/kol-cak1/600/400', 4.6, 112, 6500,
 'Wedding cakes inspired by Bengali sweets. Sandesh-flavoured tiers, rasgulla cake pops and mishti doi mousse.',
 ARRAY['bengali-sweets','sandesh','rasgulla','mishti-doi'], ARRAY['Hindi','Bengali','English'], false, true, false);


-- ===========================================================
-- COMMUNITY POSTS
-- ===========================================================
INSERT INTO posts (vendor_id, couple_id, content, media_url, tags) VALUES

(NULL, NULL,
 'Just booked Shekhawati Decorators for our Jaipur palace wedding! The floral installation mock-up they sent is absolutely breathtaking. Loving the WedBridge experience — all the vendors are clearly verified and professional.',
 'https://picsum.photos/seed/post1/600/400',
 ARRAY['jaipur','decor','palace-wedding']),

(NULL, NULL,
 'NRI couple here — planning our destination wedding from Toronto to Udaipur. WedBridge has been a lifesaver! Found Palace Blooms and Lake City Shutters through the platform. The pandit speaks English too which is such a relief.',
 'https://picsum.photos/seed/post2/600/400',
 ARRAY['nri','udaipur','destination-wedding']),

(NULL, NULL,
 'Pro tip: add vendors to your Vendor Basket and compare them side by side before sending an inquiry. I compared 4 photographers and found the perfect one in Jaipur. No one called me until I actually made a decision!',
 'https://picsum.photos/seed/post3/600/400',
 ARRAY['tip','photography','jaipur']),

(NULL, NULL,
 'Maa Sheetal Caterers in Jaipur were AMAZING. The WedBridge agent helped us communicate with them since they don''t use apps much. The food was unbelievably authentic — guests are still talking about the dal baati churma!',
 'https://picsum.photos/seed/post4/600/400',
 ARRAY['caterer','jaipur','agent-managed','authentic']),

(NULL, NULL,
 'Goa beach wedding goals achieved! Coastal Blooms set up the most stunning driftwood arch and the DJ Tropics kept the dance floor going till sunrise. Highly recommend WedBridge for destination weddings.',
 'https://picsum.photos/seed/post5/600/400',
 ARRAY['goa','beach-wedding','dj','decor']),

(NULL, NULL,
 'Quick reminder: WedBridge does NOT share your phone number or personal details with vendors until the deal is confirmed. I felt so much safer booking through here vs direct WhatsApp approach. Total peace of mind.',
 'https://picsum.photos/seed/post6/600/400',
 ARRAY['privacy','safety','tip']),

(NULL, NULL,
 'Our WedBridge Event Team feature post-booking was INCREDIBLE. The photographer, decorator and caterer had a group call coordinated by WedBridge — no confusion on the day at all. Every vendor knew exactly where to be.',
 'https://picsum.photos/seed/post7/600/400',
 ARRAY['event-team','coordination','tip','success']),

(NULL, NULL,
 'Mehendi Magic by Priya in Delhi is worth every rupee. Her team of 4 artists did the full family in 3 hours! She''s on WedBridge Premium so you can trust the quality. Already referred her to 3 friends.',
 'https://picsum.photos/seed/post8/600/400',
 ARRAY['delhi','mehendi','premium','referral']),

(NULL, NULL,
 'Planning an intercultural wedding (Hindu + Christian) in Mumbai. Found Vedic Vivah Pundit through WedBridge — he''s done dozens of interfaith ceremonies and put us completely at ease. Platform makes finding niche vendors so easy.',
 'https://picsum.photos/seed/post9/600/400',
 ARRAY['interfaith','mumbai','pandit','intercultural']),

(NULL, NULL,
 'The WedBridge Agent Managed plan is perfect for vendors like my Uncle who has been doing dhol for 25 years but doesn''t use smartphones. The WedBridge agent listed him and now he gets bookings through the platform without any confusion!',
 'https://picsum.photos/seed/post10/600/400',
 ARRAY['agent-managed','dhol','small-vendor','chandigarh']),

(NULL, NULL,
 'Kolkata brides — Durga Bridal Studio is exceptional. Traditional Bengali bridal look, fresh sandalwood paste, gorgeous draping. No heavy filters needed because the real look was already perfect.',
 'https://picsum.photos/seed/post11/600/400',
 ARRAY['kolkata','bridal-makeup','bengali','traditional']),

(NULL, NULL,
 'Hyderabad wedding inspo: Falaknuma-style banquet + Golconda Decors pearl motif setup + Dum Biryani Caterers authentic haleem. Found all three through WedBridge in one afternoon. The search filters are genuinely useful.',
 'https://picsum.photos/seed/post12/600/400',
 ARRAY['hyderabad','venue','decor','biryani']),

(NULL, NULL,
 'For Bengaluru couples — Lalbagh Garden Weddings is stunning for an outdoor ceremony. The pergola is Instagram gold. Used WedBridge''s city filter to shortlist Bengaluru venues in minutes. Highly recommend the platform.',
 'https://picsum.photos/seed/post13/600/400',
 ARRAY['bengaluru','venue','outdoor','garden']),

(NULL, NULL,
 'WedBridge reminder: the 2% commission keeps this platform alive and pays for the verification, privacy protection and Event Team coordination. Always complete deals through WedBridge — it protects YOU as a couple too.',
 'https://picsum.photos/seed/post14/600/400',
 ARRAY['platform','commission','tip','transparency']),

(NULL, NULL,
 'Just had our sangeet in Chandigarh — Bass Culture DJ had the whole crowd going crazy with the bhangra set. Used WedBridge basket to compare 3 DJs before picking them. Best decision ever. Our parents were dancing!',
 'https://picsum.photos/seed/post15/600/400',
 ARRAY['chandigarh','dj','sangeet','bhangra']);
