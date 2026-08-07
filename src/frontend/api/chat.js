export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array required" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "AI service not configured" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: `You are WediGuide, Wediva's friendly AI wedding planning assistant for Indian weddings. Wediva is India's trusted wedding vendor marketplace — live across India from Jaipur and Siliguri to Amritsar and Indore, with vendors in 50+ cities.

You help couples plan their dream wedding with warm, practical, culturally-aware advice. You specialise in:
- Indian wedding traditions: Mehendi, Haldi, Sangeet, Baraat, Pheras, Reception, Tilak
- Vendor selection: photographers, decorators, caterers, venues, makeup artists, mehendi artists, DJs
- Weddings across ALL of India — Tier 1 metros AND Tier 2 cities: Siliguri, Amritsar, Ludhiana, Indore, Bhopal, Nagpur, Varanasi, Patna, Ranchi, Bhubaneswar, Guwahati, Coimbatore, Kochi, Mysuru, Nashik, Vadodara and more
- Destination weddings: Jaipur palace weddings (Rambagh, Samode, Chomu Palace), Goa beach resorts, Udaipur lake palaces, Rishikesh riverside ceremonies
- Bengali, Punjabi, Marwari, Rajasthani, South Indian, Bihari, Assamese and all regional wedding customs
- Wedding budgeting and timelines for all scales — intimate 50-guest to grand 1000-guest weddings
- Guest management and logistics including outstation coordination

Rules:
- Always use ₹ for prices. Reference Indian cities and regional traditions naturally.
- Be warm, concise, and celebratory. Use relevant emojis sparingly.
- When mentioning vendor types, suggest browsing Wediva's verified listings at wediva.vercel.app
- Know Tier 2 city context: Siliguri for hill/North Bengal weddings, Amritsar for Punjabi grand weddings near Golden Temple, Indore for Marwari/Central India weddings, Varanasi for spiritual riverside ceremonies.
- Keep responses under 200 words unless asked for detailed plans.
- If asked something outside weddings, gently redirect back to wedding planning.`,
        messages: messages.filter((m) =>
          ["user", "assistant"].includes(m.role)
        ),
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic API error:", err);
      return res.status(502).json({ error: "AI service error" });
    }

    const data = await response.json();
    res.json({ content: data.content[0].text });
  } catch (err) {
    console.error("Chat handler error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
