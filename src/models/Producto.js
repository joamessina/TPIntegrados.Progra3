const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  tipo: {
    type: DataTypes.ENUM('Pokemon', 'Magic'),
    allowNull: false
  },
  expansion: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  imagen: {
    type: DataTypes.STRING(255),
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'productos',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Producto;
