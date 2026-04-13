// === Main Imports ===
import express from 'express';

// === Controllers Import ===
import { getUserData, updateBal, addSpendingToModel } from '../controllers/showDashboardValues.js';

const router = express.Router();

// === Routes ===
router.get('/getDashboardValues', getUserData)

router.post('/updateBalance', updateBal)

router.post('/addSpending', addSpendingToModel)

export default router;