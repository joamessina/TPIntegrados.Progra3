const { findUserByUsername } = require('../models/userModel');

function login(req, res) {
    const { username, password } = req.body;

    findUserByUsername(username, (err, user) => {
        if (err) return res.status(500).json({ message: 'Error interno' });
        if (!user || user.password !== password)
            return res.status(401).json({ message: 'Credenciales inválidas' });

        res.json({ message: 'Login exitoso', user: { id: user.id, username: user.username } });
    });
}

module.exports = {
    login
};