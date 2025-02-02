import express from 'express';
const router = express.Router();
import {login, logout, signup,checkAuth,updateProfile} from '../controllers/user.controller.js' // if ther is no default export in the file you are receiving from, then it should be in parenthesis as you are importing as it is
import protectRoute from '../middleware/protectRoute.js';
import {upload} from '../lib/multer.js'

router.post('/login',login);

router.post('/signup',signup);

router.get('/logout',logout);

router.put('/update-profile',protectRoute, upload.single("profilePic"),updateProfile);

router.get('/check',protectRoute,checkAuth);


export default router;   