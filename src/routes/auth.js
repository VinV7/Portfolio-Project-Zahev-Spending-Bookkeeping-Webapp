// === Main Imports ===
import express from 'express';

// === Controllers Import ===
import { createAccount, loginAuthentication } from '../controllers/auth.js';

const router = express.Router();

// === Routes ===
router.post('/create', createAccount);

router.post('/login', loginAuthentication);

export default router;