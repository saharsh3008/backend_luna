// import dotenv from "dotenv";
// dotenv.config();

// export default {
//   port: process.env.PORT || 5000,
//   dbPath: process.env.DB_PATH || "data/habits.json"
// };


import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 5000,
  dbPath: process.env.DB_PATH || "data/habits.json",
  geminiKey: process.env.GEMINI_API_KEY || null
};
