const express = require('express');
const router = express.Router();

// Simulación de datos a enviar (podés adaptar el contenido)
const datosEjemplo = {
    productos: [
        { id: 1, nombre: "Producto 1", precio: 150 },
        { id: 2, nombre: "Producto 2", precio: 250 }
    ],
    usuarios: [
        { id: 1, nombre: "Juan" },
        { id: 2, nombre: "Maria" }
    ]
};

// GET /api/datos-envio: envía datos de prueba al frontend
router.get('/datos-envio', (req, res) => {
    res.json(datosEjemplo);
});

// POST /api/datos-recepcion: recibe datos del frontend
router.post('/datos-recepcion', (req, res) => {
    // Recibís lo que te manden en req.body
    // Podés guardar, validar, etc. Por ahora sólo confirmo recepción.
    res.json({ recibido: true, datos: req.body });
});

module.exports = router;