const express = require("express");
const db = require("../db");

const router = express.Router();

// Obtener todas las prendas
router.get("/", (req, res) => {
    db.all("SELECT * FROM Prenda", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Crear una prenda
router.post("/", (req, res) => {
    const { nombre, precio } = req.body;
    db.run("INSERT INTO Prenda (nombre, precio) VALUES (?, ?)", [nombre, precio], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, nombre, precio });
    });
});

// Eliminar una prenda
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM Prenda WHERE id = ?", [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Prenda eliminada correctamente" });
    });
});

module.exports = router;
