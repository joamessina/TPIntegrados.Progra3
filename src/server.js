const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { initDB } = require('./db/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Inicializar base de datos
initDB();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});