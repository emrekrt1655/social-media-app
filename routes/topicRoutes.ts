import express from "express";
import topicCtrl from "../controllers/topicCtrl";

const router: any = express.Router();

/**
 * @swagger
 * tags:
 *   name: Topics
 *   description: Topic management for creating and fetching topics
 */

/**
 * @swagger
 * /api/topics:
 *   get:
 *     summary: Get all topics
 *     tags: [Topics]
 *     description: Retrieves all topics from the system, including the count of posts per topic.
 *     responses:
 *       200:
 *         description: List of all topics with post counts.
 *       500:
 *         description: Server error.
 */
router.get("/topics", topicCtrl.getTopics);

/**
 * @swagger
 * /api/topicCreate:
 *   post:
 *     summary: Create a new topic
 *     tags: [Topics]
 *     description: Allows a user to create a new topic.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The text/content of the topic.
 *               topicUserId:
 *                 type: string
 *                 description: The ID of the user creating the topic.
 *               country:
 *                 type: string
 *                 description: The country associated with the topic.
 *               image:
 *                 type: string
 *                 description: The image URL associated with the topic (optional).
 *     responses:
 *       200:
 *         description: Topic successfully created.
 *       400:
 *         description: Invalid token or missing information.
 *       500:
 *         description: Server error.
 */
router.post("/topicCreate", topicCtrl.createTopic);

export default router;
