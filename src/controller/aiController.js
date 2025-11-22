
import * as aiService from "../services/aiService.js";

export const suggest = async (req, res) => {
  try {
    const { goal } = req.body;
    if (!goal || !goal.trim()) {
      return res.status(400).json({ error: "goal is required" });
    }

    const suggestions = await aiService.suggestHabitsFromGoal(goal);
    return res.json({ suggestions: suggestions.slice(0, 3) });
  } catch (err) {
    console.error("AI suggest error:", err);
    return res.status(500).json({ error: "AI service error" });
  }
};
