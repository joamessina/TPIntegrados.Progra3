// routes/productos.js  (o productosRoutes.js)
const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Obtener todos los productos (con paginación opcional)
router.get('/', productosController.getAll);

// Obtener un producto por ID
router.get('/:id', productosController.getOne);

// Crear un nuevo producto
router.post('/', productosController.create);

// Modificar un producto por ID
router.put('/:id', productosController.update);

// Baja lógica (desactivar producto)
router.patch('/:id/desactivar', productosController.deactivate);

// Alta lógica (reactivar producto)
router.patch('/:id/activar', productosController.activate);

// Eliminar producto
router.delete('/:id', productosController.remove);

module.exports = router;
