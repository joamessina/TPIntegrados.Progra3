const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Usuario = require('../models/Usuario');

// POST /api/auth/login-admin
router.post('/login-admin', async (req, res) => {
  const { username, password } = req.body;
  const user = await Usuario.findOne({
    where: { username, password, tipo: 'admin' },
  });
  if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

  const payload = { id: user.id, username: user.username, rol: 'admin' };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({
    login: 'ok',
    rol: 'admin',
    user: { id: user.id, username: user.username },
    token,
  });
});

// POST /api/auth/login-client
router.post('/login-client', async (req, res) => {
  const { email, password } = req.body;
  const user = await Usuario.findOne({
    where: { email, password_hash: password, rol: 'cliente' },
  });
  if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

  const payload = { id: user.id, email: user.email, rol: 'cliente' };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({
    login: 'ok',
    rol: 'cliente',
    user: { id: user.id, email: user.email },
    token,
  });
});

module.exports = router;
