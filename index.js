const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to SQLite database
const db = new sqlite3.Database(path.join(__dirname, 'cycling_tips.db'));

// Ensure tips table exists
db.run(`CREATE TABLE IF NOT EXISTS tips (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL,
  thumb_up INTEGER DEFAULT 0,
  thumb_down INTEGER DEFAULT 0
)`);

// Home page: show tips
app.get('/', (req, res) => {
  db.all('SELECT * FROM tips ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).send('Database error');
    res.render('index', { tips: rows });
  });
});

// Add tip
app.post('/add-tip', (req, res) => {
  const tip = req.body.tip;
  if (!tip) return res.redirect('/');
  db.run('INSERT INTO tips (text) VALUES (?)', [tip], (err) => {
    res.redirect('/');
  });
});

// Vote on tip
app.post('/vote', (req, res) => {
  const { id, action } = req.body;
  if (!id || !['up', 'down'].includes(action)) return res.redirect('/');
  const column = action === 'up' ? 'thumb_up' : 'thumb_down';
  db.run(`UPDATE tips SET ${column} = ${column} + 1 WHERE id = ?`, [id], (err) => {
    res.redirect('/');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
