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
    SELECT created_at, description, amount FROM public.user_spending where user_id = ${userId}`
    return transactionsHistory ?? null;
};

export { getUserSpendingData, searchUserID, getUserTransactionsHistory};