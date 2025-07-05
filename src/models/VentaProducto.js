const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const VentaProducto = sequelize.define(
  'VentaProducto',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ventaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'venta_id',
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'producto_id',
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: 'venta_productos',
    timestamps: false,
  }
);

module.exports = VentaProducto;
