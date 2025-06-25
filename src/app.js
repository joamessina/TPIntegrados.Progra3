const express = require('express');
const path = require('path');
const { sequelize } = require('./models/index');
require('./models/associations'); // <-- agrega esta línea

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Ejemplo de prueba de conexión
sequelize
  .authenticate()
  .then(() => console.log('Conectado a MySQL'))
  .catch((err) => console.error('Error de conexión:', err));

// Simple ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Backend funcionando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
