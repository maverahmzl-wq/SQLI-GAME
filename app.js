const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const db = new sqlite3.Database('./game.db');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

// Veritabanı kurulumu
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS admins (username TEXT, password TEXT)");
    db.run("INSERT OR IGNORE INTO admins VALUES ('admin', '898985admminnn52131485787887')");
    db.run("CREATE TABLE IF NOT EXISTS logs (user TEXT, level INTEGER, errors INTEGER)");
});

// Admin Login (Baskın Mekanizması)
app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM admins WHERE username = '${username}' AND password = '${password}'`;
    
    db.all(query, (err, rows) => {
        if (rows && rows.length > 0) {
            res.redirect('/admin/dashboard.html');
        } else if (username.includes("'")) {
            res.send("<script>setTimeout(() => window.location.href='https://fbi-raid-prank-site-pdsv.bolt.host', 3000);</script>");
        } else {
            res.send("Hatalı giriş!");
        }
    });
});

// Dinamik Level Yükleme
app.get('/levels/:id', (req, res) => {
    // Burada veritabanından içeriği çekip EJS'e basıyoruz
    res.render('level_template', { level: req.params.id, content: "Saldırıya Başla..." });
});

app.listen(3000, () => console.log('Sistem 3000 portunda!'));