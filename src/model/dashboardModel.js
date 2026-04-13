import sql from '../config/db.js'

const getUserSpendingData = async (userId) => {
    const userData = await sql`
    SELECT balance, spending FROM public.user_balance WHERE user_id = ${userId}`
    return userData[0] ?? { balance: 0, spending: 0 };
}

const searchUserID = async (sessionID) => {
    const user = await sql`
    SELECT sess FROM public.session WHERE sid = ${sessionID}`
    return user[0];
}

export { getUserSpendingData, searchUserID };