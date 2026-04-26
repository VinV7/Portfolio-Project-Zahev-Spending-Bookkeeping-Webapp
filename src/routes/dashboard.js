// === Main Imports ===
import express from 'express';

// === Controllers Import ===
import { getUserData, updateBal, addSpendingToModel, deleteSpendingRecord, showSpecificMonthlyData } from '../controllers/showDashboardValues.js';

const router = express.Router();

// === Routes ===
router.get('/getDashboardValues', getUserData)

router.post('/updateBalance', updateBal)

router.post('/addSpending', addSpendingToModel)

router.delete('/deleteSpendingRecord', deleteSpendingRecord)

router.post('/selectMonthlyHistory', showSpecificMonthlyData)

export default router;