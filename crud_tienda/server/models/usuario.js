const db = require("../db");

const Usuario = {
    getAll:(callback) => {
        db.all("SELECT * FROM Usuario", [], callback);
    },
    getById:(id, callback) => {
        db.get("SELECT * FROM Usuario WHERE id = ?", [id], callback);
    },
    create:(data, callback) => {
        db.run("INSERT INTO Usuario (nombre, email) VALUES (?, ?)", [data.nombre, data.email], callback);
        },
    update:(data, callback) => {
        db.run("UPDATE Usuario SET nombre = ?, email = ? WHERE id = ?", [data.nombre, data.email, data.id], callback);
    },
    delete:(id, callback) => {
        db.run("DELETE FROM Usuario WHERE id = ?", [id], callback);
    }
};
module.exports = Usuario;