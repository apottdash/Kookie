-- =============================================================
-- WedBridge — Additional Vendors (run after seed.sql)
-- Adds 47 more vendors across 10 cities to reach 147 total
-- Does NOT truncate — safe to run on top of existing data
-- =============================================================

INSERT INTO vendors (name, category, city, is_destination_ready, plan, cover_photo, rating, review_count, starting_price, description, tags, languages, verified, whatsapp_active, multi_day_support) VALUES

-- ─────────────────────────────────────────────
-- JAIPUR (+5 = 25 total)
-- ─────────────────────────────────────────────
('Jaipur Bridal Choreography', 'Choreographer', 'Jaipur', false, 'Standard',
 'https://picsum.photos/seed/jaipur-cho2/600/400', 4.6, 89, 32000,
 'Sangeet choreography for Rajasthani and Marwari weddings. Family group dances, solo performances and couple entry choreography.',
 ARRAY['sangeet','rajasthani','family-dance','couple-entry'], ARRAY['Hindi','Rajasthani'], false, true, false),

('Pink City Baraat Co.', 'Baraat', 'Jaipur', false, 'Standard',
 'https://picsum.photos/seed/jaipur-bar2/600/400', 4.5, 67, 18000,
 'Royal baraat arrangements with decorated elephants, camels and vintage cars. Authentic Rajasthani procession experience.',
 ARRAY['elephant','camel','vintage-car','royal'], ARRAY['Hindi','Rajasthani'], false, true, false),

('Gulabi Nagar Pundit', 'Pundit', 'Jaipur', false, 'Free',
 'https://picsum.photos/seed/jaipur-pun2/600/400', 4.5, 98, 8000,
 'Traditional Rajasthani pandit for all Hindu ceremonies. Specialises in Marwari wedding rituals and satpadi.',
 ARRAY['marwari','satpadi','traditional','rajasthani-rituals'], ARRAY['Hindi','Sanskrit','Rajasthani'], false, false, true),

('Studio Lehenga Jaipur', 'Bridal Wear', 'Jaipur', false, 'Standard',
 'https://picsum.photos/seed/jaipur-bw2/600/400', 4.6, 134, 35000,
 'Affordable bridal lehenga rental and purchase. Rajasthani gota patti work, mirror embroidery and bandhej prints.',
 ARRAY['gota-patti','mirror-work','bandhej','affordable'], ARRAY['Hindi','English','Rajasthani'], false, true, false),

('Sweet Mithai Cakes Jaipur', 'Cake', 'Jaipur', false, 'Free',
 'https://picsum.photos/seed/jaipur-cak2/600/400', 4.4, 76, 5500,
 'Wedding cakes with Rajasthani motifs. Blue pottery inspired designs, eggless tiers and traditional ghewar fusion cakes.',
 ARRAY['ghewar-fusion','blue-pottery','eggless','rajasthani'], ARRAY['Hindi','Rajasthani'], false, true, false),

-- ─────────────────────────────────────────────
-- DELHI NCR (+5 = 20 total)
-- ─────────────────────────────────────────────
('Delhi Dhol Masters', 'Dhol Player', 'Delhi NCR', false, 'Standard',
 'https://picsum.photos/seed/delhi-dho1/600/400', 4.7, 198, 9000,
 'Delhi''s top dhol party for baraat and sangeet. 4 players, LED dhols available. Punjabi and Haryanvi beats.',
 ARRAY['led-dhol','baraat','punjabi','haryanvi'], ARRAY['Hindi','Punjabi','English'], false, true, false),

('Capital Choreography Studio', 'Choreographer', 'Delhi NCR', false, 'Premium',
 'https://picsum.photos/seed/delhi-cho2/600/400', 4.8, 223, 55000,
 'Delhi''s premier sangeet choreography studio. Bollywood, classical and western fusion. Celebrity choreographer tie-ups.',
 ARRAY['bollywood','classical','western-fusion','celebrity'], ARRAY['Hindi','English','Punjabi'], true, true, false),

('Delhi Wedding Cakes', 'Cake', 'Delhi NCR', false, 'Standard',
 'https://picsum.photos/seed/delhi-cak1/600/400', 4.7, 167, 11000,
 'Designer multi-tier wedding cakes. Fondant, buttercream and mirror glaze finishes. Eggless options. Same-day delivery in NCR.',
 ARRAY['fondant','mirror-glaze','eggless','same-day'], ARRAY['Hindi','English'], false, true, false),

('Nawabi Baraat Delhi', 'Baraat', 'Delhi NCR', false, 'Standard',
 'https://picsum.photos/seed/delhi-bar1/600/400', 4.6, 112, 20000,
 'Vintage car, buggy and horse baraat packages. Flower-decorated vehicles, DJ on truck and LED lighting.',
 ARRAY['vintage-car','horse','led','dj-on-truck'], ARRAY['Hindi','Punjabi','English'], false, true, false),

('Delhi Pundit Services', 'Pundit', 'Delhi NCR', false, 'Standard',
 'https://picsum.photos/seed/delhi-pun2/600/400', 4.6, 145, 15000,
 'Experienced pandits for North Indian Hindu weddings. Available for destination events. English explanations for NRI families.',
 ARRAY['north-indian','nri-friendly','english-explanations','destination'], ARRAY['Hindi','English','Sanskrit'], true, false, true),

-- ─────────────────────────────────────────────
-- MUMBAI (+5 = 15 total)
-- ─────────────────────────────────────────────
('Mumbai Mehendi Masters', 'Mehendi Artist', 'Mumbai', false, 'Standard',
 'https://picsum.photos/seed/mumbai-meh2/600/400', 4.6, 178, 14000,
 'Bridal and party mehendi. Marathi, Arabic and contemporary designs. Team of 3 artists for large events.',
 ARRAY['marathi','arabic','party-mehendi','team'], ARRAY['Hindi','Marathi','English'], false, true, false),

('Western Suburbs Choreography', 'Choreographer', 'Mumbai', false, 'Standard',
 'https://picsum.photos/seed/mumbai-cho1/600/400', 4.6, 134, 40000,
 'Bollywood and western choreography for sangeet. Works with Mumbai film industry families. Flash mob specialists.',
 ARRAY['flash-mob','bollywood','western','film-industry'], ARRAY['Hindi','Marathi','English'], false, true, false),

('Mumbai Invitation Studio', 'Invitation Designer', 'Mumbai', true, 'Standard',
 'https://picsum.photos/seed/mumbai-inv1/600/400', 4.7, 189, 9500,
 'Digital and print wedding invitations. Bollywood-style video invites, traditional scroll invites and luxury box sets.',
 ARRAY['video-invite','scroll','box-set','bollywood-theme'], ARRAY['Hindi','Marathi','English'], false, true, false),

('Marine Drive Pundit', 'Pundit', 'Mumbai', false, 'Free',
 'https://picsum.photos/seed/mumbai-pun1/600/400', 4.5, 112, 12000,
 'South Indian and North Indian wedding ceremonies. Comfortable with intercultural and NRI families in Mumbai.',
 ARRAY['south-indian','north-indian','intercultural','nri'], ARRAY['Hindi','Marathi','Tamil','Sanskrit'], false, false, true),

('Mumbai Dhol Tasha Group', 'Dhol Player', 'Mumbai', false, 'Standard',
 'https://picsum.photos/seed/mumbai-dho1/600/400', 4.7, 156, 12000,
 'Traditional Maharashtrian dhol-tasha for weddings and baraat. Group of 6-12 players. Ganesh vandana speciality.',
 ARRAY['dhol-tasha','maharashtrian','ganesh','baraat'], ARRAY['Hindi','Marathi'], false, true, false),

-- ─────────────────────────────────────────────
-- GOA (+4 = 12 total)
-- ─────────────────────────────────────────────
('Goa Mehendi Art', 'Mehendi Artist', 'Goa', true, 'Standard',
 'https://picsum.photos/seed/goa-meh1/600/400', 4.6, 134, 13000,
 'Beach wedding mehendi specialist. Boho, tropical and traditional Indian designs. Available for destination events.',
 ARRAY['boho','tropical','beach','destination'], ARRAY['Hindi','English','Konkani'], false, true, false),

('Spice Garden Pundit Goa', 'Pundit', 'Goa', true, 'Free',
 'https://picsum.photos/seed/goa-pun1/600/400', 4.5, 78, 10000,
 'Hindu wedding ceremonies in Goa. Comfortable with destination wedding couples and NRI families.',
 ARRAY['destination','nri-friendly','hindu','goa'], ARRAY['Hindi','Konkani','English','Sanskrit'], false, false, true),

('Goa Invitation Co.', 'Invitation Designer', 'Goa', true, 'Standard',
 'https://picsum.photos/seed/goa-inv1/600/400', 4.6, 98, 8500,
 'Tropical and beach-themed wedding invitations. Coconut leaf scrolls, seashell motifs and digital video invites.',
 ARRAY['tropical','seashell','coconut-scroll','digital'], ARRAY['Hindi','English','Konkani'], false, true, false),

('Panjim Bridal Wear', 'Bridal Wear', 'Goa', true, 'Standard',
 'https://picsum.photos/seed/goa-bw1/600/400', 4.6, 112, 45000,
 'Boho, beach and traditional Indian bridal wear for destination weddings. Indo-western fusion and lehenga collection.',
 ARRAY['boho','beach-bride','indo-western','destination'], ARRAY['Hindi','English','Konkani'], true, true, false),

-- ─────────────────────────────────────────────
-- UDAIPUR (+5 = 12 total)
-- ─────────────────────────────────────────────
('Lake Pichola DJ Events', 'DJ', 'Udaipur', true, 'Premium',
 'https://picsum.photos/seed/udaipur-dj1/600/400', 4.8, 134, 45000,
 'Luxury DJ for palace and lakeside weddings in Udaipur. Waterproof outdoor systems, LED setups for heritage venues.',
 ARRAY['palace','lakeside','outdoor','luxury'], ARRAY['Hindi','English','Rajasthani'], true, true, false),

('Rajputana Dhol Group', 'Dhol Player', 'Udaipur', true, 'Standard',
 'https://picsum.photos/seed/udaipur-dho1/600/400', 4.7, 98, 7000,
 'Traditional Rajasthani dhol-nagada for baraat and pheras. Available for destination weddings across Rajasthan.',
 ARRAY['dhol-nagada','rajasthani','baraat','destination'], ARRAY['Hindi','Rajasthani'], false, true, true),

('Udaipur Cake Studio', 'Cake', 'Udaipur', false, 'Standard',
 'https://picsum.photos/seed/udaipur-cak1/600/400', 4.6, 87, 8500,
 'Wedding cakes with palace and lake motifs. Miniature fort toppers, peacock fondant art and Rajasthani colour palettes.',
 ARRAY['palace-motif','peacock','fort-topper','rajasthani'], ARRAY['Hindi','English'], false, true, false),

('City of Lakes Choreography', 'Choreographer', 'Udaipur', false, 'Standard',
 'https://picsum.photos/seed/udaipur-cho1/600/400', 4.5, 67, 30000,
 'Sangeet choreography for destination and local weddings. Classical Rajasthani dance performances and group Bollywood numbers.',
 ARRAY['classical-rajasthani','bollywood','destination','group'], ARRAY['Hindi','English','Rajasthani'], true, true, false),

('Udaipur Invitation House', 'Invitation Designer', 'Udaipur', true, 'Standard',
 'https://picsum.photos/seed/udaipur-inv1/600/400', 4.7, 112, 10000,
 'Royal Rajputana wedding invitations. Embossed cards, gold foil, elephant motifs and mini painting inserts.',
 ARRAY['gold-foil','embossed','elephant-motif','mini-painting'], ARRAY['Hindi','English','Rajasthani'], false, true, false),

-- ─────────────────────────────────────────────
-- CHANDIGARH (+5 = 13 total)
-- ─────────────────────────────────────────────
('Chandigarh Cake Studio', 'Cake', 'Chandigarh', false, 'Standard',
 'https://picsum.photos/seed/chd-cak1/600/400', 4.7, 134, 8000,
 'Custom Punjabi wedding cakes. Phulkari-inspired designs, eggless tiers and traditional pinni-flavoured cake pops.',
 ARRAY['phulkari','eggless','pinni-flavour','punjabi'], ARRAY['Hindi','Punjabi','English'], false, true, false),

('Tri-City Baraat Company', 'Baraat', 'Chandigarh', false, 'Standard',
 'https://picsum.photos/seed/chd-bar1/600/400', 4.6, 89, 16000,
 'Horse, buggy and vintage car baraat packages. Flower-decorated ghodi and LED-lit carriages for Chandigarh weddings.',
 ARRAY['horse','buggy','vintage-car','led'], ARRAY['Hindi','Punjabi'], false, true, false),

('Chandigarh Invitation Studio', 'Invitation Designer', 'Chandigarh', false, 'Standard',
 'https://picsum.photos/seed/chd-inv1/600/400', 4.6, 112, 7500,
 'Punjabi wedding invitations with phulkari and giddha motifs. Digital video invitations and WhatsApp-ready e-invites.',
 ARRAY['phulkari','giddha','video-invite','whatsapp-ready'], ARRAY['Hindi','Punjabi','English'], false, true, false),

('Sector 22 Bridal Wear', 'Bridal Wear', 'Chandigarh', false, 'Standard',
 'https://picsum.photos/seed/chd-bw1/600/400', 4.7, 167, 42000,
 'Punjabi bridal lehenga and salwar kameez. Phulkari dupattas, heavy embroidery and bridesmaid outfit packages.',
 ARRAY['phulkari-dupatta','heavy-embroidery','bridesmaid','punjabi'], ARRAY['Hindi','Punjabi','English'], false, true, false),

('Chandigarh Mehendi Artists', 'Mehendi Artist', 'Chandigarh', false, 'Standard',
 'https://picsum.photos/seed/chd-meh1/600/400', 4.7, 145, 11000,
 'Bridal mehendi for Punjabi and Sikh weddings. Full hands and feet packages, bridesmaid bookings available.',
 ARRAY['punjabi-bridal','sikh-wedding','full-hands','bridesmaid'], ARRAY['Hindi','Punjabi','English'], false, true, false),

-- ─────────────────────────────────────────────
-- PUNE (+4 = 12 total)
-- ─────────────────────────────────────────────
('Pune Invitation Studio', 'Invitation Designer', 'Pune', false, 'Free',
 'https://picsum.photos/seed/pune-inv1/600/400', 4.5, 98, 6000,
 'Maharashtrian wedding invitations with Warli art and paithani motifs. Budget-friendly digital and print options.',
 ARRAY['warli','paithani','budget','digital'], ARRAY['Hindi','Marathi','English'], false, true, false),

('Pune Baraat Services', 'Baraat', 'Pune', false, 'Free',
 'https://picsum.photos/seed/pune-bar1/600/400', 4.4, 67, 12000,
 'Horse and decorated vehicle baraat. Traditional Maharashtrian procession with dhol-tasha accompaniment.',
 ARRAY['horse','maharashtrian','dhol-tasha','traditional'], ARRAY['Hindi','Marathi'], false, true, false),

('Koregaon Park Choreography', 'Choreographer', 'Pune', false, 'Standard',
 'https://picsum.photos/seed/pune-cho1/600/400', 4.6, 112, 35000,
 'Contemporary and Bollywood wedding choreography. Lavani-inspired performances for Maharashtrian sangeet.',
 ARRAY['lavani','bollywood','contemporary','maharashtrian'], ARRAY['Hindi','Marathi','English'], false, true, false),

('Pune Dhol Group', 'Dhol Player', 'Pune', false, 'Free',
 'https://picsum.photos/seed/pune-dho1/600/400', 4.5, 89, 7000,
 'Maharashtrian dhol-tasha and lezim group for weddings. Traditional Ganpati-style beats adapted for baraat.',
 ARRAY['dhol-tasha','lezim','ganpati-beats','maharashtrian'], ARRAY['Hindi','Marathi'], false, true, false),

-- ─────────────────────────────────────────────
-- HYDERABAD (+4 = 12 total)
-- ─────────────────────────────────────────────
('Hyderabad Invitation House', 'Invitation Designer', 'Hyderabad', false, 'Standard',
 'https://picsum.photos/seed/hyd-inv1/600/400', 4.6, 134, 9000,
 'Nizam-inspired wedding invitations. Charminar motifs, Urdu calligraphy inserts and luxury box packaging.',
 ARRAY['charminar','urdu-calligraphy','nizam','box-packaging'], ARRAY['Hindi','Telugu','Urdu','English'], false, true, false),

('Hyderabad Bridal Wear', 'Bridal Wear', 'Hyderabad', false, 'Standard',
 'https://picsum.photos/seed/hyd-bw1/600/400', 4.7, 189, 55000,
 'Hyderabadi bridal sherwanis and lehengas. Pochampally silk, ikat weaves and traditional Nizam-era embroidery.',
 ARRAY['pochampally','ikat','nizam-embroidery','silk'], ARRAY['Hindi','Telugu','Urdu','English'], false, true, false),

('Charminar Choreography', 'Choreographer', 'Hyderabad', false, 'Standard',
 'https://picsum.photos/seed/hyd-cho1/600/400', 4.6, 98, 38000,
 'Telugu and Hindi sangeet choreography. Kuchipudi-inspired classical performances and Bollywood group dances.',
 ARRAY['kuchipudi','telugu','bollywood','classical'], ARRAY['Hindi','Telugu','English'], false, true, false),

('Hyderabad Baraat Services', 'Baraat', 'Hyderabad', false, 'Free',
 'https://picsum.photos/seed/hyd-bar1/600/400', 4.4, 78, 14000,
 'Traditional Hyderabadi baraat with decorated horse and vintage car options. Band-baja available.',
 ARRAY['horse','vintage-car','band-baja','traditional'], ARRAY['Hindi','Telugu','Urdu'], false, true, false),

-- ─────────────────────────────────────────────
-- BENGALURU (+5 = 13 total)
-- ─────────────────────────────────────────────
('Bengaluru Mehendi Studio', 'Mehendi Artist', 'Bengaluru', false, 'Standard',
 'https://picsum.photos/seed/blr-meh1/600/400', 4.6, 156, 13000,
 'South Indian bridal mehendi. Tamil and Kannada wedding designs, Arabic fusion and contemporary geometric patterns.',
 ARRAY['south-indian','tamil','geometric','arabic-fusion'], ARRAY['Hindi','Kannada','Tamil','English'], false, true, false),

('Bengaluru Invitation Studio', 'Invitation Designer', 'Bengaluru', false, 'Standard',
 'https://picsum.photos/seed/blr-inv1/600/400', 4.6, 123, 8000,
 'South Indian wedding invitations with Mysore sandal and Kanjeevaram motifs. Digital and traditional print options.',
 ARRAY['mysore-sandal','kanjeevaram','digital','traditional'], ARRAY['Hindi','Kannada','Tamil','English'], false, true, false),

('Indiranagar Choreography', 'Choreographer', 'Bengaluru', false, 'Standard',
 'https://picsum.photos/seed/blr-cho1/600/400', 4.7, 145, 38000,
 'Bharatanatyam-inspired sangeet performances and Bollywood group choreography for cosmopolitan Bengaluru weddings.',
 ARRAY['bharatanatyam','bollywood','sangeet','cosmopolitan'], ARRAY['Hindi','Kannada','Tamil','English'], false, true, false),

('Bengaluru Cake Atelier', 'Cake', 'Bengaluru', false, 'Standard',
 'https://picsum.photos/seed/blr-cak1/600/400', 4.6, 134, 8500,
 'Custom wedding cakes with South Indian themes. Mysore pak flavoured tiers, jasmine cake toppers and eggless options.',
 ARRAY['mysore-pak','jasmine-topper','eggless','south-indian'], ARRAY['Hindi','Kannada','Tamil','English'], false, true, false),

('Bengaluru Dhol Group', 'Dhol Player', 'Bengaluru', false, 'Free',
 'https://picsum.photos/seed/blr-dho1/600/400', 4.5, 89, 8000,
 'North Karnataka and Punjabi dhol for Bengaluru weddings. High-energy baraat music for cosmopolitan couples.',
 ARRAY['north-karnataka','punjabi-beats','baraat','cosmopolitan'], ARRAY['Hindi','Kannada','Punjabi'], false, true, false),

-- ─────────────────────────────────────────────
-- KOLKATA (+5 = 13 total)
-- ─────────────────────────────────────────────
('Kolkata Choreography House', 'Choreographer', 'Kolkata', false, 'Standard',
 'https://picsum.photos/seed/kol-cho1/600/400', 4.6, 112, 32000,
 'Rabindra Nritya and Bollywood sangeet choreography. Bengali classical and contemporary fusion for wedding performances.',
 ARRAY['rabindra-nritya','bollywood','bengali-classical','fusion'], ARRAY['Hindi','Bengali','English'], false, true, false),

('Kolkata Invitation Studio', 'Invitation Designer', 'Kolkata', false, 'Standard',
 'https://picsum.photos/seed/kol-inv1/600/400', 4.6, 134, 7500,
 'Bengali wedding invitations with terracotta and kantha stitch motifs. Scroll invites and digital e-invitations.',
 ARRAY['terracotta','kantha','scroll','digital'], ARRAY['Hindi','Bengali','English'], false, true, false),

('Kolkata Dhol Party', 'Dhol Player', 'Kolkata', false, 'Free',
 'https://picsum.photos/seed/kol-dho1/600/400', 4.5, 98, 6500,
 'Traditional Bengali dhak for sindoor khela and baraat. Dhaki group of 2-4 players for authentic Bengal wedding rituals.',
 ARRAY['dhak','sindoor-khela','bengali-rituals','baraat'], ARRAY['Hindi','Bengali'], false, true, false),

('Park Street Bridal Wear', 'Bridal Wear', 'Kolkata', false, 'Standard',
 'https://picsum.photos/seed/kol-bw1/600/400', 4.7, 167, 40000,
 'Bengali bridal sarees and lehengas. Baluchari and Tant silk sarees, red-white combination and Jamdani collections.',
 ARRAY['baluchari','tant-silk','red-white','jamdani'], ARRAY['Hindi','Bengali','English'], false, true, false),

('Kolkata Baraat Services', 'Baraat', 'Kolkata', false, 'Free',
 'https://picsum.photos/seed/kol-bar1/600/400', 4.4, 67, 11000,
 'Bengali wedding baraat with decorated palanquin (doli), vintage car and horse options. Traditional procession music.',
 ARRAY['doli','palanquin','vintage-car','traditional'], ARRAY['Hindi','Bengali'], false, true, false);
