import express from "express";
import * as habitController from "../controller/habitController.js";
import * as aiController from "../controller/aiController.js";

const router = express.Router();

router.post("/habits", habitController.create);
router.get("/habits", habitController.list);
router.patch("/habits/:id/complete", habitController.complete);
router.delete("/habits/:id", habitController.remove);

router.post("/suggest-habits", aiController.suggest);

export default router;
