import express from 'express'

import { createUser,checkUser } from '../controllers/auth.js';

const router = express.Router();


router.post("/signup",createUser).post("/login",checkUser)

export const authRouter = router 