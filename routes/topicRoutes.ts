import express from "express";
import topicCtrl from "../controllers/topicCtrl";
const router: any = express.Router();

router.post("/topicCreate", topicCtrl.createTopic);
router.get("/topics", topicCtrl.getTopics);

export default router;
