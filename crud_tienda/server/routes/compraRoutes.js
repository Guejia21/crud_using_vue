const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');

// Rutas
router.get('/compras', compraController.getAllCompras);
router.post('/compras', compraController.createCompra);
router.delete('/compras/:id', compraController.deleteCompra);

module.exports = router;