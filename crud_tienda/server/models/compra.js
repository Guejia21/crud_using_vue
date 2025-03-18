const db = require("../db");

const Compra = {
    getAll:(callback) => {
        db.all("SELECT Compra.id, Usuario.nombre AS usuario, Prenda.nombre AS prenda, Compra.fecha FROM Compra JOIN Usuario ON Compra.usuario_id = Usuario.id JOIN Prenda ON Compra.prenda_id = Prenda.id", [], callback);
    },    
    create:(data, callback) => {
        db.run("INSERT INTO Compra (usuario_id,prenda_id,fecha) VALUES (?, ?,?)", [data.usuarioId, data.prendaId,data.fecha], callback);
        },
    delete:(id, callback) => {
        db.run("DELETE FROM Compra WHERE id = ?", [id], callback);
    }
};
module.exports = Compra;
