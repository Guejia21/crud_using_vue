const express = require('express');
const router = express.Router();
const prendaController = require('../controllers/prendaController');

// Rutas
router.get('/prendas', prendaController.getAllPrendas);
router.get('/prendas/:id', prendaController.getPrendaById);
router.post('/prendas', prendaController.createPrenda);
router.put('/prendas/:id', prendaController.updatePrenda);
router.delete('/prendas/:id', prendaController.deletePrenda);

module.exports = router;