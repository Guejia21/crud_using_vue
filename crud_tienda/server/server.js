const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const usuarioRoutes = require('./routes/usuarioRoutes');
const prendaRoutes = require('./routes/prendaRoutes');
const compraRoutes = require('./routes/compraRoutes');

app.use('/api', usuarioRoutes);
app.use('/api', prendaRoutes);
app.use('/api', compraRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
