const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// Obtener todos los productos (con paginación opcional)
router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  const productos = await Producto.findAndCountAll({
    offset: parseInt(offset),
    limit: parseInt(limit),
    order: [['id', 'ASC']],
  });
  res.json(productos);
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  if (!producto)
    return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(producto);
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const nuevo = await Producto.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Modificar un producto por ID
router.put('/:id', async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  if (!producto)
    return res.status(404).json({ error: 'Producto no encontrado' });
  try {
    await producto.update(req.body);
    res.json(producto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Baja lógica (desactivar producto)
router.patch('/:id/desactivar', async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  if (!producto)
    return res.status(404).json({ error: 'Producto no encontrado' });
  await producto.update({ activo: false });
  res.json({ message: 'Producto desactivado' });
});

// Alta lógica (reactivar producto)
router.patch('/:id/activar', async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  if (!producto)
    return res.status(404).json({ error: 'Producto no encontrado' });
  await producto.update({ activo: true });
  res.json({ message: 'Producto activado' });
});

// Eliminar producto (elimina de la base, solo para pruebas, no usar en producción)
router.delete('/:id', async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  if (!producto)
    return res.status(404).json({ error: 'Producto no encontrado' });
  await producto.destroy();
  res.json({ message: 'Producto eliminado' });
});

module.exports = router;
