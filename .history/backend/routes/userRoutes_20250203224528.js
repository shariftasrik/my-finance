import express from 'express';
import { signinUser, signupUser } from '../controllers/authController.js';
const router = express.Router();