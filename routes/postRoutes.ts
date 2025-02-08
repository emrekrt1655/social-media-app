import express from "express";
import postCtrl from "../controllers/postCtrl";

const router: any = express.Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management for users
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     description: Retrieves all posts from the system with likes and comments count.
 *     responses:
 *       200:
 *         description: List of all posts with like and comment counts.
 *       500:
 *         description: Server error.
 */
router.get("/posts", postCtrl.getPosts);

/**
 * @swagger
 * /api/posts/{userId}:
 *   get:
 *     summary: Get posts by user ID
 *     tags: [Posts]
 *     description: Retrieves all posts made by a specific user based on their user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *     responses:
 *       200:
 *         description: List of posts made by the user.
 *       500:
 *         description: Server error.
 */
router.get("/posts/:userId", postCtrl.getPostsbyUserId);

/**
 * @swagger
 * /api/postCreate:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     description: Allows a user to create a new post.
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
 *                 description: The content of the post.
 *               postTopicId:
 *                 type: string
 *                 description: The ID of the topic this post belongs to.
 *               postUserId:
 *                 type: string
 *                 description: The ID of the user making the post.
 *               image:
 *                 type: string
 *                 description: The image URL associated with the post (optional).
 *     responses:
 *       200:
 *         description: Post successfully created.
 *       400:
 *         description: Invalid token or missing information.
 *       500:
 *         description: Server error.
 */
router.post("/postCreate", postCtrl.create);

/**
 * @swagger
 * /api/postDelete/{postId}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     description: Allows a user to delete their post by ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to be deleted.
 *     responses:
 *       200:
 *         description: Post successfully deleted.
 *       400:
 *         description: User not authorized or invalid token.
 *       500:
 *         description: Server error.
 */
router.delete("/postDelete/:postId", postCtrl.delete);

export default router;
