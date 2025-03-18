const db = require("../db");

const Prenda = {
    getAll:(callback) => {
        db.all("SELECT * FROM Prenda", [], callback);
    },
    getById:(id, callback) => {
        db.get("SELECT * FROM Prenda WHERE id = ?", [id], callback);
    },
    create:(data, callback) => {
        db.run("INSERT INTO Prenda (nombre, precio) VALUES (?, ?)", [data.nombre, data.precio], callback);
        },
    update:(data, callback) => {
        db.run("UPDATE Prenda SET nombre = ?, precio = ? WHERE id = ?", [data.nombre, data.precio, data.id], callback);
    },
    delete:(id, callback) => {
        db.run("DELETE FROM Prenda WHERE id = ?", [id], callback);
    }
};
module.exports = Prenda;