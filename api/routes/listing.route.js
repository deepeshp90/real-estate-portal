import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createListing ,deleteListing,updatedListing,getListing,getListings} from '../controllers/listing.controller.js';

const router = express.Router();

router.post('/create',verifyToken,createListing)
router.delete('/delete/:id',verifyToken,deleteListing)
router.post('/update/:id',verifyToken,updatedListing)
router.get('/get/:id',getListing)
router.get('/get',getListings)



export default router;