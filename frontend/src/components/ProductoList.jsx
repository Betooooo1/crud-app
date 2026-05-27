// frontend/src/components/ProductoList.jsx

export default function ProductoList({
  productos = [],
  onEditar,
  onEliminar
}) {

  // =========================
  // VALIDAR ARREGLO
  // =========================
  if (
    !Array.isArray(productos) ||
    productos.length === 0
  ) {
    return (

      <p className='empty'>

        No hay productos registrados.
        ¡Crea el primero!

      </p>

    );
  }

  return (

    <div className='grid'>

      {productos.map((p) => (

        <div
          key={p.id}
          className='card'
        >

          {/* CATEGORÍA */}
          <span className='badge'>
            {p.categoria}
          </span>

          {/* NOMBRE */}
          <h3>
            {p.nombre}
          </h3>

          {/* PRECIO */}
          <p className='precio'>

            $
            {Number(p.precio).toFixed(2)}
            {' '}MXN

          </p>

          {/* STOCK */}
          <p className='stock'>

            Stock:
            {' '}
            {p.stock}
            {' '}
            unidades

          </p>

          {/* BOTONES */}
          <div className='actions'>

            <button
              onClick={() => onEditar(p)}
            >
              Editar
            </button>

            <button
              className='del'
              onClick={() => onEliminar(p.id)}
            >
              Eliminar
            </button>

          </div>

        </div>

      ))}

    </div>
  );
}