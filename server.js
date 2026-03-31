// === Main Imports === //
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// === Server Setup ===
const app = express();
const PORT = 5000;

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

// === Front-end View Handler ===
const sendView = (res, file) => {
    return res.sendFile(path.join(VIEWS_DIR, file))
}

// === Routes ===

app.get('/', (req, res) => {
    sendView(res, 'index.html');
});

app.get('/login', (req, res) => {
    sendView(res, 'login.html');
});

// === Server Start === 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});