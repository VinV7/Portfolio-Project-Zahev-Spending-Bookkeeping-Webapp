import sql from '../config/db.js'

const searchUserID = async (sessionID) => {
    const user = await sql`
    SELECT sess FROM public.session WHERE sid = ${sessionID}`
    return user[0];
}

const getUserSpendingData = async (userId) => {
    const userData = await sql`
    SELECT balance, spending FROM public.user_balance WHERE user_id = ${userId}`
    return userData[0] ?? { balance: 0, spending: 0 };
}

const getUserTransactionsHistory = async (userId) => {
    const transactionsHistory = await sql`
    SELECT id, created_at, description, amount FROM public.user_spending where user_id = ${userId}`
    return transactionsHistory ?? null;
};

const getUserSpecificMonthlyRecords = async (userId, month) => {
    const monthlyRecords = await sql`
    SELECT id, created_at, description, amount FROM public.user_spending 
    WHERE user_id = ${userId} AND EXTRACT(MONTH FROM created_at) = ${month}`
    return monthlyRecords ?? null;
}

export { getUserSpendingData, searchUserID, getUserTransactionsHistory, getUserSpecificMonthlyRecords};