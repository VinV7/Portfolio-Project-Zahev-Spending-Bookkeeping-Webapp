import sql from '../config/db.js'

const checkUser = async (username, email) => {
    const user = await sql`
    SELECT * FROM public.users WHERE username = ${username} OR email = ${email}
    `;
    return user[0];
};

const checkUserWithUsername = async (username) => {
    const user = await sql`
    SELECT * FROM public.users WHERE username = ${username}
    `;
    return user[0];
};

const createUser = async (email, username, password) => {
    const newUser = await sql`
    INSERT INTO public.users (email, username, password_hash) VALUES (${email}, ${username}, ${password})
    RETURNING id, email, username`
    return newUser[0];
}

export { checkUser, checkUserWithUsername, createUser};