// === Main Imports === //
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// === Middleware Imports === //
import logger from './src/middleware/debug/logger.js';
import session from './src/config/session.js';
import checkAuthenticated from './src/middleware/session/checkSession.js';
import requireAuth from './src/middleware/session/sessionAuth.js';

// === Routes Imports ===
import authRoutes from './src/routes/auth.js';

// === Server Setup ===
const app = express();
const PORT =  process.env.PORT || 5000;

// === Path Setup ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, "public");
const VIEWS_DIR = path.join(PUBLIC_DIR, "views");

// === Middlewares === 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.static(PUBLIC_DIR));
app.use(logger);
app.use(session);

// === Front-end View Handler ===
const sendView = (res, file) => {
    return res.sendFile(path.join(VIEWS_DIR, file))
}

// === Routes ===

app.get('/', checkAuthenticated, (req, res) => {
    sendView(res, 'index.html');
});

app.get('/login', checkAuthenticated, (req, res) => {
    sendView(res, 'login.html');
});

app.get('/create', checkAuthenticated, (req, res) => {
    sendView(res, 'createAccount.html');
});

app.use('/api/auth', authRoutes);

app.get('/dashboard', requireAuth, (req, res) => {
    sendView(res, 'dashboard.html');
});

// === Server Start === 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});