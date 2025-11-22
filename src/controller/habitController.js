
import * as habitService from "../services/habitService.js";

export const list = async (req, res) => {
  try {
    const habits = await habitService.listHabits();
    res.json(habits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

export const create = async (req, res) => {
  try {
    const { name } = req.body;
    const habit = await habitService.createHabit(name);
    res.status(201).json(habit);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message || "Bad request" });
  }
};

export const complete = async (req, res) => {
  try {
    const { id } = req.params;
    const habit = await habitService.completeHabit(id);
    res.json(habit);
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: err.message || "Not found" });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await habitService.deleteHabit(id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: err.message || "Not found" });
  }
};
