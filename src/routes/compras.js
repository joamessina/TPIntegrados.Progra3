const express = require('express');
const router = express.Router();
const VentaProducto = require('../models/VentaProducto');
const Producto = require('../models/Producto');
const Venta = require('../models/Ventas');
const Usuario = require('../models/Usuario');
const requireAuth = require('../middlewares/requireAuth');

router.post('/', requireAuth, async (req, res) => {
  const usuarioId = req.user.id;
  const items = req.body.items;

  try {
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    for (let item of items) {
      const producto = await Producto.findByPk(item.id);
      if (!producto)
        return res.status(404).json({ error: 'Producto no encontrado' });
      if (producto.stock < item.cantidad) {
        return res
          .status(400)
          .json({ error: `Stock insuficiente para ${producto.nombre}` });
      }
    }

    const venta = await Venta.create({
      usuarioId: usuarioId,
      fecha: new Date(),
      nombre_cliente: usuario.nombre,
    });

    for (let item of items) {
      await Producto.decrement('stock', {
        by: item.cantidad,
        where: { id: item.id },
      });
      await VentaProducto.create({
        ventaId: venta.id,
        productoId: item.id,
        cantidad: item.cantidad,
      });
    }

    res.json({ ok: true, mensaje: 'Compra registrada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error procesando la compra' });
  }
});

module.exports = router;
