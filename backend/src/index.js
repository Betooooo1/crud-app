// backend/src/index.js
const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const productosRouter = require('./routes/productos');
const app  = express();
const PORT = process.env.PORT || 3001;

// Configuración de Middlewares
app.use(cors({ origin: process.env.FRONTEND_URL || '*' })); // Permite solicitudes del front
app.use(express.json()); // Permite al servidor procesar JSON en el cuerpo de peticiones

// Rutas base globales
app.use('/api/productos', productosRouter);

// Ruta de diagnóstico (Health Check)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', os: 'windows', ts: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});