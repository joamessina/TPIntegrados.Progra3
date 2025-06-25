const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Venta = sequelize.define(
  'Venta',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_cliente: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'ventas',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  }
);

module.exports = Venta;
