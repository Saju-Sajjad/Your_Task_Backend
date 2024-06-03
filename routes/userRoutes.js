import express from 'express';
import {verifyToken,getUser, getAllUser, deleteUser } from '../controllers/userController.js';


const router = express.Router();


router.get('/user', verifyToken, getUser);
router.get('/users', getAllUser);
router.delete('/users/:userId', deleteUser);

export default router;
