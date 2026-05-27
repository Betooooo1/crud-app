import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';

const app = express();

app.use(express.json());

app.use(cors({
  origin: '*'
}));

// ======================
// BASE DE DATOS
// ======================

const db = new sqlite3.Database('./productos.db');

db.run(`
  CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    precio REAL NOT NULL,
    categoria TEXT NOT NULL,
    stock INTEGER DEFAULT 0
  )
`);

// ======================
// OBTENER PRODUCTOS
// ======================

app.get('/api/productos', (req, res) => {

  db.all(
    'SELECT * FROM productos',
    [],
    (err, rows) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(rows);

    }
  );

});

// ======================
// CREAR PRODUCTO
// ======================

app.post('/api/productos', (req, res) => {

  const {
    nombre,
    precio,
    categoria,
    stock
  } = req.body;

  db.run(
    `
    INSERT INTO productos
    (nombre, precio, categoria, stock)
    VALUES (?, ?, ?, ?)
    `,
    [
      nombre,
      precio,
      categoria,
      stock || 0
    ],
    function(err) {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        id: this.lastID,
        nombre,
        precio,
        categoria,
        stock
      });

    }
  );

});

// ======================
// EDITAR PRODUCTO
// ======================

app.put('/api/productos/:id', (req, res) => {

  const id = req.params.id;

  const {
    nombre,
    precio,
    categoria,
    stock
  } = req.body;

  db.run(
    `
    UPDATE productos
    SET
      nombre = ?,
      precio = ?,
      categoria = ?,
      stock = ?
    WHERE id = ?
    `,
    [
      nombre,
      precio,
      categoria,
      stock,
      id
    ],
    function(err) {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        ok: true
      });

    }
  );

});

// ======================
// ELIMINAR PRODUCTO
// ======================

app.delete('/api/productos/:id', (req, res) => {

  const id = req.params.id;

  db.run(
    'DELETE FROM productos WHERE id = ?',
    [id],
    function(err) {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        ok: true
      });

    }
  );

});

// ======================
// SERVIDOR
// ======================

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});