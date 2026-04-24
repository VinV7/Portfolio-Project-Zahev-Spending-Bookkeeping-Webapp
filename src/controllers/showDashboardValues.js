import { getUserSpendingData, searchUserID, getUserTransactionsHistory} from '../model/dashboardModel.js';
import { updateBalance, addSpending } from '../model/dashboardInputModel.js';

const getUserData = async (req, res, next) => {
    try {
        const userData = await searchUserID(req.sessionID);
        const spendingData = await getUserSpendingData(userData.sess.userId);
        const transactionHistory = await getUserTransactionsHistory(userData.sess.userId);

        transactionHistory.forEach(transaction => {
            transaction.created_at = new Date(transaction.created_at).toLocaleDateString('en-CA');
        })

        console.log(transactionHistory);
        
        res.json({
            balance: spendingData.balance,
            spending: spendingData.spending,
            transactionHistory: transactionHistory
        });
    } catch (err) {
        next(err);
    }
};

const updateBal = async (req, res, next) => {
    try {
        const userData = await searchUserID(req.sessionID)
        updateBalance(userData.sess.userId, req.body.newBalance)
        res.json({
            success: true,
        })
    } catch (err) {
        next(err);
    };
};

const addSpendingToModel = async (req, res, next) => {
    try {
        const userData = await searchUserID(req.sessionID)
        const toDatabase = await addSpending(userData.sess.userId, req.body.amount, req.body.description)

        console.log(toDatabase);

        return res.json({
            success: true,
            newBalance: toDatabase.userBalance.balance,
            newTotalSpent: toDatabase.userBalance.spending,
            newSpendingHistory:[{
                id: toDatabase.newSpending.id,
                amount: toDatabase.newSpending.amount,
                description: toDatabase.newSpending.description,
                created_at: toDatabase.newSpending.created_at.toLocaleDateString('en-CA')
            }]
        })
    } catch (err) {
        next(err);
    }
}

export { getUserData, updateBal, addSpendingToModel };