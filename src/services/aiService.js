
import config from "../config/index.js";

const GEMINI_KEY = process.env.GEMINI_API_KEY || config.geminiKey || null;


const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=";

export async function suggestHabitsFromGoal(goal) {
  if (!goal || !goal.trim()) {
    throw new Error("Goal text required");
  }


  if (!GEMINI_KEY) {
    return mockSuggestions(goal);
  }

  const url = GEMINI_ENDPOINT + GEMINI_KEY;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: `Suggest 3 short habit ideas (max 6 words each). Return ONLY JSON:
{
  "suggestions": ["habit1", "habit2", "habit3"]
}

Goal: "${goal}"
`
          }
        ]
      }
    ]
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });

    if (!res.ok) {
      console.error("Gemini API Error:", res.status, await res.text());
      return mockSuggestions(goal);
    }

    const data = await res.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      JSON.stringify(data);

    
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");

    if (jsonStart !== -1 && jsonEnd !== -1) {
      const jsonText = text.slice(jsonStart, jsonEnd + 1);
      const parsed = JSON.parse(jsonText);
      if (parsed?.suggestions) return parsed.suggestions;
    }

    return mockSuggestions(goal);
  } catch (err) {
    console.error("Gemini request failed:", err);
    return mockSuggestions(goal);
  }
}

function mockSuggestions(goal) {
  return [
    `Start small: ${goal.slice(0, 10)} habit`,
    "5-minute daily habit",
    "Simple daily improvement"
  ];
}
