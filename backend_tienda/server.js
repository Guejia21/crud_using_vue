const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const usuarioRoutes = require("./routes/usuarioRoutes");
const prendaRoutes = require("./routes/prendaRoutes");
const compraRoutes = require("./routes/compraRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Usar rutas
app.use("/usuarios", usuarioRoutes);
app.use("/prendas", prendaRoutes);
app.use("/compras", compraRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
