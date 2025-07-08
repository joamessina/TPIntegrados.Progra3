const Producto = require('../models/Producto');
const Venta = require('../models/Ventas');
const VentaProducto = require('../models/VentaProducto');

// Venta <-> Producto (many-to-many) mediante VentaProducto
Venta.belongsToMany(Producto, {
  through: VentaProducto,
  foreignKey: 'venta_id',
  otherKey: 'producto_id',
});
Producto.belongsToMany(Venta, {
  through: VentaProducto,
  foreignKey: 'producto_id',
  otherKey: 'venta_id',
});

module.exports = { Producto, Venta, VentaProducto };
