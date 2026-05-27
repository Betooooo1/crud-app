// frontend/src/components/ProductoForm.jsx
import { useState, useEffect } from 'react';

const EMPTY = { nombre: '', precio: '', categoria: '', stock: '' };

export default function ProductoForm({ onGuardar, productoEditar, onCancelar }) {
  const [form, setForm] = useState(EMPTY);

  // Detecta si el usuario hizo clic en "Editar" sobre algún producto de la lista
  useEffect(() => {
    setForm(productoEditar || EMPTY);
  }, [productoEditar]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.nombre || !form.precio || !form.categoria) {
      alert('Completa los campos obligatorios');
      return;
    }
    // Envía la información formateada correctamente al componente padre
    onGuardar({
      ...form,
      precio: parseFloat(form.precio),
      stock:  parseInt(form.stock) || 0,
    });
    setForm(EMPTY);
  };

  return (
    <form onSubmit={handleSubmit} className='producto-form'>
      <h2>{productoEditar ? 'Editar Producto' : 'Nuevo Producto'}</h2>
      
      <label>Nombre *
        <input type='text' name='nombre' value={form.nombre} onChange={handleChange} required />
      </label>
      
      <div className='form-row'>
        <label>Precio *
          <input type='number' name='precio' value={form.precio} onChange={handleChange} step='0.01' required />
        </label>
        
        <label>Stock
          <input type='number' name='stock' value={form.stock} onChange={handleChange} min='0' />
        </label>
      </div>
      
      <label>Categoría *
        <select name='categoria' value={form.categoria} onChange={handleChange} required>
          <option value=''>Seleccionar...</option>
          <option>Electrónica</option>
          <option>Periféricos</option>
          <option>Software</option>
          <option>Accesorios</option>
        </select>
      </label>
      
      <div className='form-actions'>
        <button type='submit'>
          {productoEditar ? 'Guardar Cambios' : 'Crear'}
        </button>
        {productoEditar && (
          <button type='button' onClick={onCancelar}>Cancelar</button>
        )}
      </div>
    </form>
  );
}