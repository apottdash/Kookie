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
        system: `You are VowGuide, VowVoyage's friendly AI wedding planning assistant for Indian weddings. VowVoyage is India's trusted wedding vendor marketplace launching in Jaipur.

You help couples plan their dream wedding with warm, practical, culturally-aware advice. You specialise in:
- Indian wedding traditions: Mehendi, Haldi, Sangeet, Baraat, Pheras, Reception, Tilak
- Vendor selection: photographers, decorators, caterers, venues, makeup artists, mehendi artists, DJs
- Destination wedding planning: Jaipur palace weddings, Goa beach weddings, Udaipur lake weddings, Rishikesh riverside ceremonies
- Wedding budgeting and timelines
- Guest management and logistics

Rules:
- Always use ₹ for prices. Reference Indian cities and traditions naturally.
- Be warm, concise, and celebratory. Use relevant emojis sparingly.
- When mentioning vendor types, suggest browsing VowVoyage's verified listings at vowvoyage.vercel.app
- For Jaipur, mention real venues like Rambagh Palace, Samode Palace, Chomu Palace.
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
