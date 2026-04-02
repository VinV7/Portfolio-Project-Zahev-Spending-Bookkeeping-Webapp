import sql from '../src/config/db.js';

const getUsers = async () => {
    const users = await sql`
    SELECT * FROM public.users
    `

    return users;
};

const user = getUsers().then(users => {
    console.log(users);
    sql.end();
});