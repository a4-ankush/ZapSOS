const axios = require("axios");

module.exports.aiChat = async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ reply: "No message provided" });
  }

  try {
    // Instruct Gemini to always reply in Markdown
    const prompt = `
You are ZapAI, an assistant for students. 
Format your entire response in Markdown. 
Use:
- Headings (##, ###) for main sections
- Paragraphs for explanations
- Numbered lists for steps or ordered info
- Bullet points for unordered info

User message: """${message}"""
`;

    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );
    const reply =
      geminiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't find an answer.";
    res.json({ reply });
  } catch (err) {
    console.error("gemini chat error:", err.response?.data || err.message);
    res
      .status(500)
      .json({ reply: "AI service error. Please try again later." });
  }
};
