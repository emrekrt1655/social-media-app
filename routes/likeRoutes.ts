import express from "express";
import likeCtrl from "../controllers/likeCtrl";

const router: any = express.Router();

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Like management for posts and comments
 */

/**
 * @swagger
 * /api/likes:
 *   get:
 *     summary: Get all likes
 *     tags: [Likes]
 *     description: Retrieves all likes in the system.
 *     responses:
 *       200:
 *         description: List of all likes.
 *       500:
 *         description: Server error.
 */
router.get("/likes", likeCtrl.getLikes);

/**
 * @swagger
 * /api/likes/{likePostId}:
 *   get:
 *     summary: Get likes for a specific post
 *     tags: [Likes]
 *     description: Retrieves all likes for a given post ID.
 *     parameters:
 *       - in: path
 *         name: likePostId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post.
 *     responses:
 *       200:
 *         description: List of likes for the post.
 *       500:
 *         description: Server error.
 */
router.get("/likes/:likePostId", likeCtrl.getPostLikes);

/**
 * @swagger
 * /api/getCommentLikes/{commentId}:
 *   get:
 *     summary: Get likes for a specific comment
 *     tags: [Likes]
 *     description: Retrieves all likes for a given comment ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment.
 *     responses:
 *       200:
 *         description: List of likes for the comment.
 *       400:
 *         description: User not logged in.
 *       500:
 *         description: Server error.
 */
router.get("/getCommentLikes/:commentId", likeCtrl.getCommentLikes);

/**
 * @swagger
 * /api/like:
 *   post:
 *     summary: Like a post
 *     tags: [Likes]
 *     description: Allows a user to like a post.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               likeUserId:
 *                 type: string
 *                 description: The ID of the user liking the post.
 *               likePostId:
 *                 type: string
 *                 description: The ID of the post being liked.
 *     responses:
 *       200:
 *         description: Successfully liked the post.
 *       400:
 *         description: User not logged in.
 *       500:
 *         description: Server error.
 */
router.post("/like", likeCtrl.like);

/**
 * @swagger
 * /api/likeComment:
 *   post:
 *     summary: Like a comment
 *     tags: [Likes]
 *     description: Allows a user to like a comment.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               likeUserId:
 *                 type: string
 *                 description: The ID of the user liking the comment.
 *               likeCommentId:
 *                 type: string
 *                 description: The ID of the comment being liked.
 *     responses:
 *       200:
 *         description: Successfully liked the comment.
 *       400:
 *         description: User not logged in.
 *       500:
 *         description: Server error.
 */
router.post("/likeComment", likeCtrl.likeComment);

/**
 * @swagger
 * /api/unlike/{likeId}:
 *   delete:
 *     summary: Unlike a post or comment
 *     tags: [Likes]
 *     description: Allows a user to remove their like from a post or comment.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: likeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the like to be removed.
 *     responses:
 *       200:
 *         description: Successfully unliked.
 *       400:
 *         description: Unauthorized attempt.
 *       500:
 *         description: Server error.
 */
router.delete("/unlike/:likeId", likeCtrl.unlike);

export default router;
