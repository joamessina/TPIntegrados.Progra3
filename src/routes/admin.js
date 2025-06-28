const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');
const upload = require('../utils/multer');

// Middleware de auth test, resta mejorar desp
router.use((req, res, next) => {
  // Acá validar la sesión del admin
  // Por ahora, vista ciega
  next();
});

// Dashboard: lista de productos
router.get('/dashboard', async (req, res) => {
  const productos = await Producto.findAll({ order: [['id', 'ASC']] });
  res.render('admin/dashboard', { productos });
});

// Formulario alta de producto
router.get('/productos/nuevo', (req, res) => {
  res.render('admin/producto_form', {
    producto: null,
    action: '/admin/productos/nuevo',
    method: 'POST',
  });
});

// Crear producto
router.post('/productos/nuevo', upload.single('imagen'), async (req, res) => {
  try {
    const { nombre, descripcion, tipo, expansion, precio } = req.body;
    const imagen = req.file ? req.file.filename : null;
    await Producto.create({
      nombre,
      descripcion,
      tipo,
      expansion,
      precio,
      imagen,
    });
    res.redirect('/admin/dashboard');
  } catch (err) {
    res.render('admin/producto_form', {
      producto: req.body,
      action: '/admin/productos/nuevo',
      method: 'POST',
      error: err.message,
    });
  }
});

// Formulario de edición
router.get('/productos/:id/editar', async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  if (!producto) return res.redirect('/admin/dashboard');
  res.render('admin/producto_form', {
    producto,
    action: `/admin/productos/${producto.id}/editar`,
    method: 'POST',
  });
});

// Guardar edición
router.post(
  '/productos/:id/editar',
  upload.single('imagen'),
  async (req, res) => {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.redirect('/admin/dashboard');
    try {
      const { nombre, descripcion, tipo, expansion, precio } = req.body;
      let updateData = { nombre, descripcion, tipo, expansion, precio };
      if (req.file) {
        updateData.imagen = req.file.filename;
      }
      await producto.update(updateData);
      res.redirect('/admin/dashboard');
    } catch (err) {
      res.render('admin/producto_form', {
        producto: { ...producto.dataValues, ...req.body },
        action: `/admin/productos/${producto.id}/editar`,
        method: 'POST',
        error: err.message,
      });
    }
  }
);

// Baja lógica
router.post('/productos/:id/desactivar', async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  if (producto) await producto.update({ activo: false });
  res.redirect('/admin/dashboard');
});

// Alta lógica
router.post('/productos/:id/activar', async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  if (producto) await producto.update({ activo: true });
  res.redirect('/admin/dashboard');
});

// Eliminar físico (solo para pruebas)
router.post('/productos/:id/eliminar', async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  if (producto) await producto.destroy();
  res.redirect('/admin/dashboard');
});

module.exports = router;
