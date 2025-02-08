import express from "express";
import followCtrl from "../controllers/followCtrl";
const router: any = express.Router();

// // it gets the followers of user
// router.get("/follower/:followedId", followerCtrl.getFollowers)
// // it gets the following ones of user
// router.get("/followed/:followerId", followerCtrl.getFollowings)
// // when you want to follow someone you need to send request below two routes together
// router.post("/follow", followerCtrl.follow)
// router.post("/followed", followerCtrl.followed)
// router.delete("/unfollow/:followingId", followerCtrl.unfollow)
// router.delete("/unfolloww/:folId", followerCtrl.unfollow2)


/**
 * @swagger
 * tags:
 *   name: Followers
 *   description: Follow/unfollow management
 */

/**
 * @swagger
 * /api/followers:
 *   get:
 *     summary: Get all followers
 *     tags: [Followers]
 *     description: Retrieves all followers for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a list of followers.
 *       400:
 *         description: User not logged in.
 *       500:
 *         description: Server error.
 */
router.get("/followers", followCtrl.getFollowers);

/**
 * @swagger
 * /api/follow:
 *   post:
 *     summary: Follow a user
 *     tags: [Followers]
 *     description: Follows a user if the requester is authenticated.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               followerId:
 *                 type: string
 *                 description: The ID of the follower (must be the authenticated user).
 *               followedId:
 *                 type: string
 *                 description: The ID of the user being followed.
 *     responses:
 *       200:
 *         description: Successfully followed the user.
 *       400:
 *         description: Unauthorized follow attempt.
 *       500:
 *         description: Server error.
 */
router.post("/follow", followCtrl.follow);

/**
 * @swagger
 * /api/unfollow/{folId}:
 *   delete:
 *     summary: Unfollow a user
 *     tags: [Followers]
 *     description: Unfollows a user if the requester is authorized.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: folId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the follow relationship to be removed.
 *     responses:
 *       200:
 *         description: Successfully unfollowed the user.
 *       400:
 *         description: Unauthorized attempt or invalid token.
 *       500:
 *         description: Server error.
 */
router.delete("/unfollow/:folId", followCtrl.unfollow);

export default router;