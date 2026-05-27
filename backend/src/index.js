import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());

// =========================
// CORS
// =========================
app.use(cors({
  origin: '*'
}));

// =========================
// BASE DE DATOS TEMPORAL
// =========================
let productos = [];

// =========================
// GET
// =========================
app.get('/api/productos', (req, res) => {

  res.json(productos);

});

// =========================
// POST
// =========================
app.post('/api/productos', (req, res) => {

  const nuevo = {
    id: Date.now(),
    ...req.body
  };

  productos.push(nuevo);

  res.json(nuevo);

});

// =========================
// PUT
// =========================
app.put('/api/productos/:id', (req, res) => {

  const id = parseInt(req.params.id);

  productos = productos.map(p =>

    p.id === id
      ? { ...p, ...req.body }
      : p

  );

  res.json({
    ok: true
  });

});

// =========================
// DELETE
// =========================
app.delete('/api/productos/:id', (req, res) => {

  const id = parseInt(req.params.id);

  productos = productos.filter(
    p => p.id !== id
  );

  res.json({
    ok: true
  });

});

// =========================
// SERVER
// =========================
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {

  console.log(
    `Servidor en puerto ${PORT}`
  );

});