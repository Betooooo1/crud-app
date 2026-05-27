import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors({
  origin: '*'
}));

let productos = [];

app.get('/api/productos', (req, res) => {
  res.json(productos);
});

app.post('/api/productos', (req, res) => {

  const nuevo = {
    id: Date.now(),
    ...req.body
  };

  productos.push(nuevo);

  res.json(nuevo);

});

app.put('/api/productos/:id', (req, res) => {

  const id = parseInt(req.params.id);

  productos = productos.map(p =>
    p.id === id
      ? { ...p, ...req.body }
      : p
  );

  res.json({ ok: true });

});

app.delete('/api/productos/:id', (req, res) => {

  const id = parseInt(req.params.id);

  productos = productos.filter(
    p => p.id !== id
  );

  res.json({ ok: true });

});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});