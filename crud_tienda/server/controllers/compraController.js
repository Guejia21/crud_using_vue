const Compra = require('../models/compra');

const compraController = {
    getAllCompras: (req, res) => {
        Compra.getAll((err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json(rows);
            }
        });
    },

    createCompra: (req, res) => {
        const { usuarioId, prendaId,fecha } = req.body;
        if (!usuarioId || !prendaId || !fecha) {
            return res.status(400).json({ error: "Faltan datos" });
        }

        Compra.create({ usuarioId, prendaId,fecha }, function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).json({ message: "Compra creada correctamente" });
            }
        });
    },

    deleteCompra: (req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ID requerido" });
        }

        Compra.delete(id, function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ message: "Compra eliminado correctamente" });
            }
        });
    }
};

module.exports = compraController;
