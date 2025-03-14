const express = require("express");
const db = require("../db");

const router = express.Router();

// Obtener todos las compras
router.get("/", (req, res) => {
    db.all("SELECT Compra.id, Usuario.nombre AS usuario, Prenda.nombre AS prenda, Compra.fecha FROM Compra JOIN Usuario ON Compra.usuario_id = Usuario.id JOIN Prenda ON Compra.prenda_id = Prenda.id", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Crear una compra
router.post("/", (req, res) => {
    const {usuarioId,prendaId, fecha } = req.body;
    db.run("INSERT INTO Compra (usuario_id,prenda_id,fecha) VALUES (?, ?, ?)", [usuarioId, prendaId,fecha], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, usuarioId, prendaId, fecha });
    });
});

// Actualizar una compra
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { usuarioId, prendaId,fecha } = req.body;
    db.run("UPDATE Compra SET usuario_id = ?, prenda_id = ?, fecha = ? WHERE id = ?", [usuarioId, prendaId, fecha], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Compra actualizado correctamente" });
    });
});
// Eliminar un compra
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM Compra WHERE id = ?", [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Compra eliminada correctamente" });
    });
});

module.exports = router;
