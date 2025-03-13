const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.sqlite", (err) => {
    if (err) {
        console.error("Error al conectar con SQLite:", err.message);
    } else {
        console.log("Conectado a la base de datos SQLite");
    }
});

// Crear tablas si no existen
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Prenda (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        precio REAL NOT NULL
    )`);
//Cuando se elimine un usuario o prenda, todas sus compras relacionadas también se eliminarán
    db.run(`CREATE TABLE IF NOT EXISTS Compra (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER,
        prenda_id INTEGER,
        fecha TEXT,        
        FOREIGN KEY (usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE,
        FOREIGN KEY (prenda_id) REFERENCES Prenda(id) ON DELETE CASCADE
    )`);
});

module.exports = db;
