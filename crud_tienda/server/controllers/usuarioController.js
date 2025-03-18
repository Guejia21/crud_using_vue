const Usuario = require('../models/usuario');

const usuarioController = {
    getAllUsuarios: (req, res) => {
        Usuario.getAll((err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json(rows);
            }
        });
    },

    getUsuarioById: (req, res) => {
        const { id } = req.params;
        Usuario.getById(id, (err, row) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else if (!row) {
                res.status(404).json({ error: "Usuario no encontrado" });
            } else {
                res.json(row);
            }
        });
    },

    createUsuario: (req, res) => {
        const { nombre, email } = req.body;
        if (!nombre || !email) {
            return res.status(400).json({ error: "Faltan datos" });
        }

        Usuario.create({ nombre, email }, function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).json({ message: "Usuario creado correctamente" });
            }
        });
    },

    updateUsuario: (req, res) => {
        const { id } = req.params;
        const { nombre, email } = req.body;

        if (!id || !nombre || !email) {
            return res.status(400).json({ error: "Faltan datos" });
        }

        Usuario.update({ id, nombre, email }, function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ message: "Usuario actualizado correctamente" });
            }
        });
    },

    deleteUsuario: (req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ID requerido" });
        }

        Usuario.delete(id, function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ message: "Usuario eliminado correctamente" });
            }
        });
    }
};

module.exports = usuarioController;
