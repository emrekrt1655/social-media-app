import express from "express";
import authCtrl from "../controllers/authCtrl";
import validRegister from "../middleware/valid";

const router: any = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     description: Creates a new user and sends an activation email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Success! Please check your email.
 *       400:
 *         description: User already exists.
 *       500:
 *         description: Server error.
 */
router.post("/register", validRegister, authCtrl.register);

/**
 * @swagger
 * /api/active:
 *   post:
 *     summary: Activate user account
 *     tags: [Auth]
 *     description: Activates a user's account using a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               active_token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Account activated successfully.
 *       400:
 *         description: Invalid token.
 *       500:
 *         description: Server error.
 */
router.post("/active", authCtrl.activeAccount);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     description: Logs in a user and returns an access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful.
 *       400:
 *         description: Invalid credentials.
 *       500:
 *         description: Server error.
 */
router.post("/login", authCtrl.login);

/**
 * @swagger
 * /api/refresh_token:
 *   get:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     description: Refreshes the access token using a refresh token.
 *     responses:
 *       200:
 *         description: New access token generated.
 *       400:
 *         description: Invalid refresh token.
 *       500:
 *         description: Server error.
 */
router.get("/refresh_token", authCtrl.refreshToken);

/**
 * @swagger
 * /api/logout:
 *   get:
 *     summary: User logout
 *     tags: [Auth]
 *     description: Logs out the user by clearing the refresh token cookie.
 *     responses:
 *       200:
 *         description: Logged out successfully.
 *       500:
 *         description: Server error.
 */
router.get("/logout", authCtrl.logout);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Auth]
 *     description: Retrieves a list of all registered users.
 *     responses:
 *       200:
 *         description: A list of users.
 *       500:
 *         description: Server error.
 */
router.get("/users", authCtrl.getUsers);

/**
 * @swagger
 * /api/changePassword/{userId}:
 *   put:
 *     summary: Change user password
 *     tags: [Auth]
 *     description: Allows a user to change their password.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 format: password
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *       400:
 *         description: Invalid credentials.
 *       500:
 *         description: Server error.
 */
router.put("/changePassword/:userId", authCtrl.changePassword);

/**
 * @swagger
 * /api/useredit/{userId}:
 *   put:
 *     summary: Update user profile
 *     tags: [Auth]
 *     description: Updates a user's profile information.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       400:
 *         description: Unauthorized request.
 *       500:
 *         description: Server error.
 */
router.put("/useredit/:userId", authCtrl.updateUser);

/**
 * @swagger
 * /api/userdelete/{userId}:
 *   delete:
 *     summary: Delete user account
 *     tags: [Auth]
 *     description: Deletes a user's account permanently.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       400:
 *         description: Unauthorized request.
 *       500:
 *         description: Server error.
 */
router.delete("/userdelete/:userId", authCtrl.deleteUser);

/**
 * @swagger
 * /api/forgot_password:
 *   post:
 *     summary: Request password reset
 *     tags: [Auth]
 *     description: Sends an email with a password reset link.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Password reset email sent.
 *       400:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */
router.post("/forgot_password", authCtrl.forgotPassword);

/**
 * @swagger
 * /api/reset_password:
 *   put:
 *     summary: Reset user password
 *     tags: [Auth]
 *     description: Allows a user to reset their password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Password reset successfully.
 *       400:
 *         description: Invalid token.
 *       500:
 *         description: Server error.
 */
router.put("/reset_password", authCtrl.resetPassword);

export default router;
