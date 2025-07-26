import express from 'express';
const router = express.Router();
import {
  login,
  logout,
  signup,
  checkAuth,
  updateProfile,
} from '../controllers/user.controller.js';
import protectRoute from '../middleware/protectRoute.js';
import { upload } from '../lib/multer.js';

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       400:
 *         description: Invalid credentials or missing fields
 *       500:
 *         description: Internal server error
 */
router.post('/login', login);

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               profilePic:
 *                 type: string
 *                 description: Optional profile picture URL
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid user data
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post('/signup', signup);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   get:
 *     summary: Log out the current user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.get('/logout', logout);

/**
 * @swagger
 * /api/v1/auth/update-profile:
 *   put:
 *     summary: Update user profile picture and/or name
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePic:
 *                 type: string
 *                 format: binary
 *                 description: Image file for profile picture
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Profile picture is required
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.put(
  '/update-profile',
  protectRoute,
  upload.single('profilePic'),
  updateProfile
);

/**
 * @swagger
 * /api/v1/auth/check:
 *   get:
 *     summary: Check if user is authenticated
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User is authenticated
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/check', protectRoute, checkAuth);

export default router;
