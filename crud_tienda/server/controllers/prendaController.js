const Prenda = require('../models/prenda');

const prendaController = {
    getAllPrendas: (req, res) => {
        Prenda.getAll((err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json(rows);
            }
        });
    },

    getPrendaById: (req, res) => {
        const { id } = req.params;
        Prenda.getById(id, (err, row) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else if (!row) {
                res.status(404).json({ error: "Prenda no encontrado" });
            } else {
                res.json(row);
            }
        });
    },

    createPrenda: (req, res) => {
        const { nombre, precio } = req.body;
        if (!nombre || !precio) {
            return res.status(400).json({ error: "Faltan datos" });
        }

        Prenda.create({ nombre, precio }, function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).json({ message: "Prenda creado correctamente" });
            }
        });
    },

    updatePrenda: (req, res) => {
        const { id } = req.params;
        const { nombre, precio } = req.body;

        if (!id || !nombre || !precio) {
            return res.status(400).json({ error: "Faltan datos" });
        }

        Prenda.update({ id, nombre, precio }, function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ message: "Prenda actualizado correctamente" });
            }
        });
    },

    deletePrenda: (req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ID requerido" });
        }

        Prenda.delete(id, function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ message: "Prenda eliminado correctamente" });
            }
        });
    }
};

module.exports = prendaController;
