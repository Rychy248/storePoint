import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EditProductosForm from './EditProductosForm';

const ProductosList = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/producto", {
        method: "GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(response => response.json())
    .then(data => setProductos(data.data))
    .catch(error => console.error(error));
  }, []);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="container mt-4">
      <Link to="/agregar-producto" className="btn btn-info float-end">Agregar Producto</Link> {/* Botón para agregar producto */}
      <h2>Lista de Productos</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Editar</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.id}>
              <td>
              <button onClick={() => handleEditClick(producto)} className='btn btn-warning'>Editar</button>
              </td>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.precio}</td>
              <td>{producto.stock}</td>

            </tr>
          ))}
        </tbody>
      </table>
      {selectedProduct && <EditProductosForm product={selectedProduct} />}
    </div>
  );
};

export default ProductosList;
