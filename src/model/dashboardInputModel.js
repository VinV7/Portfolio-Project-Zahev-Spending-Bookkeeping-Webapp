import sql from "../config/db.js";

const updateBalance = async (userId, newBalance) => {
    const updatedBalance = await sql`
    INSERT INTO public.user_balance (user_id, balance)
    VALUES (${userId}, ${newBalance})
    ON CONFLICT (user_id)
    DO UPDATE SET
        balance = EXCLUDED.balance`
}

const addSpending = async (userId, amountSpent, description) => {
    const addSpending = await sql`
    INSERT INTO public.user_spending (user_id, amount, description)
    VALUES (${userId}, ${amountSpent}, ${description});`

    const UserBalance = await sql`
    INSERT INTO public.user_balance (user_id, spending)
    VALUES (${userId}, ${amountSpent})
    ON CONFLICT (user_id)
    DO UPDATE SET
        spending = user_balance.spending + EXCLUDED.spending,
        balance = user_balance.balance - EXCLUDED.spending
    RETURNING balance, spending;`

    return UserBalance[0];
}

export { updateBalance, addSpending };