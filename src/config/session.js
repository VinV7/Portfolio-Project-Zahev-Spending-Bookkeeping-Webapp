import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';

const pgSession = connectPgSimple(session);

export default session({
    store: new pgSession({
        conString: process.env.DATABASE_URL,
        schemaName: "public",
        tableName: "session"
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24
    },
});