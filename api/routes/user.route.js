import express from 'express';
import dotenv from 'dotenv';
import { test ,updateUser,getUserListings,getUser} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { deleteUser } from '../controllers/user.controller.js';




const router = express.Router();

dotenv.config();
router.get('/test', test );
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser); 
router.get('/listings/:id',verifyToken, getUserListings)
router.get('/:id',verifyToken,getUser)

export default router;