require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models');
const productosRouter = require('./routes/productos');
const adminRouter = require('./routes/admin');
const authRoutes = require('./routes/auth');
const session = require('express-session');

require('./models/associations');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});
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

//session
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000, // 1 hora
    },
  })
);

// Rutas HTML/EJS
app.use('/admin', adminRouter);
// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRouter);

// WebSockets
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);
});

// Test de conexión a DB
sequelize
  .authenticate()
  .then(() => console.log('Conectado a MySQL'))
  .catch((err) => console.error('Error de conexión:', err));

//sincronizar modelos
sequelize.sync({ alter: false });

// Home
app.get('/', (req, res) => {
  res.send('¡Backend funcionando!');
});

module.exports = { app, server, io };

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
