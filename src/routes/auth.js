// === Main Imports ===
import express from 'express';

// === Controllers Import ===
import { createAccount, loginAuthentication, logout } from '../controllers/auth.js';

const router = express.Router();

// === Routes ===
router.post('/create', createAccount);

router.post('/login', loginAuthentication);

router.post('/logout', logout);

export default router;