// src/services/habitService.js
import { v4 as uuidv4 } from "uuid";
import { getAllHabits, saveHabits } from "../models/habitModel.js";

/**
 * Habit object:
 * { id, name, streak, lastCompleted } 
 * lastCompleted is ISO date string 'YYYY-MM-DD' or null
 */

export const listHabits = async () => {
  return await getAllHabits();
};

export const createHabit = async (name) => {
  if (!name || !name.trim()) throw new Error("Name required");
  const habits = await getAllHabits();
  const newHabit = {
    id: uuidv4(),
    name: name.trim(),
    streak: 0,
    lastCompleted: null
  };
  habits.push(newHabit);
  await saveHabits(habits);
  return newHabit;
};

export const completeHabit = async (id) => {
  const habits = await getAllHabits();
  const idx = habits.findIndex((h) => h.id === id);
  if (idx === -1) throw new Error("Habit not found");

  const habit = habits[idx];
  const today = new Date().toISOString().split("T")[0];

  // If lastCompleted is today, do nothing
  if (habit.lastCompleted !== today) {
    habit.streak = (habit.streak || 0) + 1;
    habit.lastCompleted = today;
    habits[idx] = habit;
    await saveHabits(habits);
  }

  return habit;
};

export const deleteHabit = async (id) => {
  let habits = await getAllHabits();
  const newHabits = habits.filter((h) => h.id !== id);
  if (newHabits.length === habits.length) throw new Error("Habit not found");
  await saveHabits(newHabits);
  return true;
};
