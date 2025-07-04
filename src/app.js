// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models');
const productosRouter = require('./routes/productos');
const adminRouter = require('./routes/admin');
const authRoutes = require('./routes/authRoutes');
require('./models/associations');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setear EJS y carpeta de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware global para empresa
app.use((req, res, next) => {
  res.locals.empresa = {
    nombre: 'TCG Shop',
    logo: '/images/empresa_logo.png',
  };
  next();
});

// Rutas HTML/EJS
app.use('/admin', adminRouter);
// Rutas API
app.use('/api/auth', authRoutes); // Si tienes authRoutes.js
app.use('/api/productos', productosRouter);

// Test de conexión a DB
sequelize
  .authenticate()
  .then(() => console.log('Conectado a MySQL'))
  .catch((err) => console.error('Error de conexión:', err));

// Si necesitas sincronizar modelos (opcional, solo si lo requieres)
sequelize.sync({ alter: false });

// Home o status
app.get('/', (req, res) => {
  res.send('¡Backend funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
