// frontend/src/App.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';

import ProductoForm from './components/ProductoForm';
import ProductoList from './components/ProductoList';

import './App.css';

// URL del backend
const API = import.meta.env.VITE_API_URL;

console.log("API:", API);

export default function App() {

  // =========================
  // ESTADOS
  // =========================
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  // =========================
  // CARGAR AL INICIAR
  // =========================
  useEffect(() => {
    cargar();
  }, []);

  // =========================
  // READ
  // =========================
  const cargar = async () => {

    setLoading(true);

    try {

      const response = await axios.get(`${API}/productos`);

      console.log("DATOS API:", response.data);

      if (Array.isArray(response.data)) {
        setProductos(response.data);
      } else {
        setProductos([]);
      }

    } catch (error) {

      console.error("ERROR API:", error);

      notif('Error al cargar productos', 'error');

    } finally {

      setLoading(false);

    }
  };

  // =========================
  // CREATE / UPDATE
  // =========================
  const guardar = async (form) => {

    try {

      if (productoEditar) {

        await axios.put(
          `${API}/productos/${productoEditar.id}`,
          form
        );

        notif('Producto actualizado');

        setProductoEditar(null);

      } else {

        await axios.post(
          `${API}/productos`,
          form
        );

        notif('Producto creado');

      }

      cargar();

    } catch (error) {

      console.error(error);

      notif('Error al guardar', 'error');

    }
  };

  // =========================
  // DELETE
  // =========================
  const eliminar = async (id) => {

    const ok = confirm(
      '¿Seguro que deseas eliminar este producto?'
    );

    if (!ok) return;

    try {

      await axios.delete(
        `${API}/productos/${id}`
      );

      notif('Producto eliminado');

      cargar();

    } catch (error) {

      console.error(error);

      notif('Error al eliminar', 'error');

    }
  };

  // =========================
  // ALERTAS
  // =========================
  const notif = (texto, tipo = 'ok') => {

    setMsg({ texto, tipo });

    setTimeout(() => {
      setMsg(null);
    }, 3000);
  };

  // =========================
  // RENDER
  // =========================
  return (

    <div className='app'>

      <header>

        <h1>
          Gestión de Productos
        </h1>

        <small>
          CRUD React + Node.js + Render + Vercel
        </small>

      </header>

      {msg && (

        <div className={`alerta ${msg.tipo}`}>
          {msg.texto}
        </div>

      )}

      <main>

        {/* FORMULARIO */}
        <aside>

          <ProductoForm
            onGuardar={guardar}
            productoEditar={productoEditar}
            onCancelar={() => setProductoEditar(null)}
          />

        </aside>

        {/* LISTA */}
        <section>

          <div className='bar'>

            <h2>
              Productos ({productos.length})
            </h2>

            <button onClick={cargar}>
              ↺ Actualizar
            </button>

          </div>

          {loading ? (

            <p>
              Cargando productos...
            </p>

          ) : (

            <ProductoList
              productos={productos}
              onEditar={setProductoEditar}
              onEliminar={eliminar}
            />

          )}

        </section>

      </main>

    </div>
  );
}