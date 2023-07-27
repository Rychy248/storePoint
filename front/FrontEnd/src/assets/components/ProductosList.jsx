import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductosList = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Realizar una petición GET al endpoint /api/productos para obtener la lista de productos
    axios.get('/api/productos')
      .then(response => setProductos(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container mt-4">
      <Link to="/agregar-producto" className="btn btn-primary float-end">Agregar Producto</Link> {/* Botón para agregar producto */}
      <h2>Lista de Productos</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductosList;
