import express from "express";
import commentCtrl from "../controllers/commentCtrl";
const router: any = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment management endpoints
 */

/**
 * @swagger
 * /api/commentCreate:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     description: Creates a comment on a post.
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
 *               commentPostId:
 *                 type: string
 *               commentUserId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment has been created.
 *       400:
 *         description: Please login to comment.
 *       500:
 *         description: Server error.
 */
router.post("/commentCreate", commentCtrl.createComment);

/**
 * @swagger
 * /api/comments/{postId}:
 *   get:
 *     summary: Get comments by post ID
 *     tags: [Comments]
 *     description: Retrieves all comments for a given post.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: Returns all comments for the post.
 *       500:
 *         description: Server error.
 */
router.get("/comments/:postId", commentCtrl.getComments);

/**
 * @swagger
 * /api/commentDelete/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     description: Deletes a comment if the user is authorized.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to be deleted
 *     responses:
 *       200:
 *         description: Comment deleted successfully.
 *       400:
 *         description: Unauthorized or invalid token.
 *       500:
 *         description: Server error.
 */
router.delete("/commentDelete/:commentId", commentCtrl.delete);

export default router;
