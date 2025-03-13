const express = require("express");
const db = require("../db");

const router = express.Router();

// Obtener todos los usuarios
router.get("/", (req, res) => {
    db.all("SELECT * FROM Usuario", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Obtener un usuario por ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM Usuario WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});

// Crear un usuario
router.post("/", (req, res) => {
    const { nombre, email } = req.body;
    db.run("INSERT INTO Usuario (nombre, email) VALUES (?, ?)", [nombre, email], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, nombre, email });
    });
});

// Actualizar un usuario
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, email } = req.body;
    db.run("UPDATE Usuario SET nombre = ?, email = ? WHERE id = ?", [nombre, email, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Usuario actualizado correctamente" });
    });
});

// Eliminar un usuario
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM Usuario WHERE id = ?", [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Usuario eliminado correctamente" });
    });
});

module.exports = router;
