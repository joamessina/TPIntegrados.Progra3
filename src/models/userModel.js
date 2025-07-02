const { db } = require('../db/database');

function findUserByUsername(username, callback) {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        callback(err, row);
    });
}

module.exports = {
    findUserByUsername
};