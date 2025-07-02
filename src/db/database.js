const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/users.db');

function initDB() {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )`);

        // Usuario precargado: admin / 1234
        db.run(`INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)`, ['admin', '1234']);
    });
}

module.exports = {
    db,
    initDB
};