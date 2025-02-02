import express from 'express';
import { getUsersForSlidebar,getMessages,sendMessage,deleteMessage } from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();
 
router.get('/users',protectRoute,getUsersForSlidebar);//GET USER
router.get('/:id',protectRoute,getMessages);//GET MESSAGE ID

router.post('/send/:id',protectRoute,sendMessage);// SEND MESSAGE
router.delete('/delete',protectRoute,deleteMessage);// DELETE MESSAGE

export default router;