const Producto = require('../models/Producto');
const { io } = require('../app');

exports.getAll = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  const productos = await Producto.findAndCountAll({
    where: { activo: true },
    offset: parseInt(offset),
    limit: parseInt(limit),
    order: [['id', 'ASC']],
  });
  res.json(productos);
};

exports.getOne = async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  if (!producto)
    return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(producto);
};

exports.create = async (req, res) => {
  try {
    const nuevo = await Producto.create(req.body);
    io.emit('productos-updated');
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  if (!producto)
    return res.status(404).json({ error: 'Producto no encontrado' });
  try {
    await producto.update(req.body);
    io.emit('productos-updated');
    res.json(producto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deactivate = async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  if (!producto)
    return res.status(404).json({ error: 'Producto no encontrado' });
  await producto.update({ activo: false });
  io.emit('productos-updated');
  console.log(io.emit, 'a');
  res.json({ message: 'Producto desactivado' });
};

exports.activate = async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  if (!producto)
    return res.status(404).json({ error: 'Producto no encontrado' });
  await producto.update({ activo: true });
  io.emit('productos-updated');
  res.json({ message: 'Producto activado' });
};

exports.remove = async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  if (!producto)
    return res.status(404).json({ error: 'Producto no encontrado' });
  await producto.destroy();
  io.emit('productos-updated');
  res.json({ message: 'Producto eliminado' });
};
