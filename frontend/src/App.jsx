// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductoForm from './components/ProductoForm';
import ProductoList from './components/ProductoList';
import './App.css';

const API = import.meta.env.VITE_API_URL;

export default function App() {
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => { 
    cargar(); 
  }, []);

  // READ - Cargar datos
  const cargar = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/productos`);
      setProductos(data);
    } catch { 
      notif('Error al cargar productos de la API', 'error'); 
    } finally { 
      setLoading(false); 
    }
  };

  // CREATE y UPDATE - Guardar o Modificar datos
  const guardar = async (form) => {
    try {
      if (productoEditar) {
        await axios.put(`${API}/productos/${productoEditar.id}`, form);
        notif('Producto actualizado correctamente');
        setProductoEditar(null);
      } else {
        await axios.post(`${API}/productos`, form);
        notif('Producto creado con éxito');
      }
      cargar();
    } catch { 
      notif('Error al guardar datos del producto', 'error'); 
    }
  };

  // DELETE - Eliminar un dato
  const eliminar = async (id) => {
    if (!confirm('¿Seguro que deseas eliminar este producto?')) return;
    try {
      await axios.delete(`${API}/productos/${id}`);
      notif('Producto eliminado');
      cargar();
    } catch { 
      notif('Error al eliminar el producto', 'error'); 
    }
  };

  const notif = (texto, tipo = 'ok') => {
    setMsg({ texto, tipo });
    setTimeout(() => setMsg(null), 3000);
  };

  return (
    <div className='app'>
      <header>
        <h1>Gestión de Productos</h1>
        <small>CRUD con React + Node.js + AWS — Windows 11</small>
      </header>
      
      {msg && <div className={`alerta ${msg.tipo}`}>{msg.texto}</div>}
      
      <main>
        <aside>
          <ProductoForm 
            onGuardar={guardar}
            productoEditar={productoEditar}
            onCancelar={() => setProductoEditar(null)} 
          />
        </aside>
        
        <section>
          <div className='bar'>
            <h2>Productos ({productos.length})</h2>
            <button onClick={cargar}>↺ Actualizar</button>
          </div>
          
          {loading ? (
            <p>Cargando información del catálogo...</p>
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