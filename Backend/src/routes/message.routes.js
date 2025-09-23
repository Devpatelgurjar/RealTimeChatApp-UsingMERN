import express from "express";
import {
  getUsersForSlidebar,
  getMessages,
  sendMessage,
  deleteMessage,
} from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/messages/users:
 *   get:
 *     summary: Get users for sidebar messaging
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/users", protectRoute, getUsersForSlidebar);

/**
 * @swagger
 * /api/v1/messages/{id}:
 *   get:
 *     summary: Get messages by conversation ID
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user or chat
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
 *       404:
 *         description: Messages not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", protectRoute, getMessages);

/**
 * @swagger
 * /api/v1/messages/send/{id}:
 *   post:
 *     summary: Send a message to a user
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipient user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message sent successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */
router.post("/send/:id", protectRoute, sendMessage);

/**
 * @swagger
 * /api/v1/messages/delete:
 *   delete:
 *     summary: Delete a message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - messageId
 *             properties:
 *               messageId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *       404:
 *         description: Message not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/delete/:id", protectRoute, deleteMessage);

export default router;
