
import express from "express";
import cors from "cors";
import habitRoutes from "./routes/habitRoutes.js";
import config from "./config/index.js";

const app = express();

app.use(cors());
app.use(express.json());


app.get("/health", (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

app.use("/api", habitRoutes);

app.listen(config.port, () => {
  console.log("Server running on port " + config.port);
});
