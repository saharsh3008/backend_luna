
import fs from "fs-extra";
import path from "path";
import config from "../config/index.js";

const filePath = path.resolve(config.dbPath);

async function ensureFile() {
  try {
    await fs.ensureFile(filePath);
    const stat = await fs.stat(filePath);
    if (stat.size === 0) {
      await fs.writeJson(filePath, []);
    }
  } catch (err) {
    throw err;
  }
}

export const getAllHabits = async () => {
  await ensureFile();
  const data = await fs.readJson(filePath);
  return Array.isArray(data) ? data : [];
};

export const saveHabits = async (habits) => {
  await fs.writeJson(filePath, habits, { spaces: 2 });
};
