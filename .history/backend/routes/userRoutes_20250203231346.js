import express from 'express';
import authMiddleware from '../middleware/authMiddleware';


const router = express.Router();

router.get("/", authMiddleware, getUser());



export default router;