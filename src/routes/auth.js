const express = require('express');
const router = express.Router();
const { Usuario } = require('../models/Usuario');

// POST /api/auth/login-admin
router.post('/auth/login-admin', async (req, res) => {
    const { username, password } = req.body;
    // Busca sólo usuarios tipo admin
    const user = await Usuario.findOne({ where: { username, password, tipo: 'admin' } });
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });
    res.json({ login: 'ok', rol: 'admin', user: { id: user.id, username: user.username } });
});

// POST /api/auth/login-client
router.post('/auth/login-client', async (req, res) => {
    const { username, password } = req.body;
    // Busca sólo usuarios tipo cliente
    const user = await Usuario.findOne({ where: { username, password, tipo: 'cliente' } });
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });
    res.json({ login: 'ok', rol: 'cliente', user: { id: user.id, username: user.username } });
});

module.exports = router;