const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./game.db');

db.serialize(() => {
    // Tabloları oluştur
    db.run("CREATE TABLE levels (id INTEGER PRIMARY KEY, content TEXT)");
    db.run("CREATE TABLE logs (user TEXT, level INTEGER, errors INTEGER)");
    
    // Level 1'i ekle
    db.run("INSERT INTO levels (id, content) VALUES (1, '<p>İpucu: Sorguyu tamamen doğru kıl.</p>')");
});