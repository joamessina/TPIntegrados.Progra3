const express = require('express');
const path = require('path');
const { sequelize } = require('./models/index');
const productosRouter = require('./routes/productos');
const adminRouter = require('./routes/admin');
require('./models/associations');

const app = express();
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use('/api', apiRoutes);
app.use('/api', authRoutes);
app.use('/admin', adminRouter);
// Ejemplo de prueba de conexión
sequelize
  .authenticate()
  .then(() => console.log('Conectado a MySQL'))
  .catch((err) => console.error('Error de conexión:', err));

// Rutas
app.get('/', (req, res) => {
  res.send('¡Backend funcionando!');
});
app.use('/api/productos', productosRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
