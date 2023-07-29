import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EditVentaForm } from './EditVentaForm';

const VentasList = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/venta", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => setVentas(data.data))
      .catch(error => console.error(error));
  }, []);

  const [selectedVenta, setSelectedVenta] = useState(null);

  const handleEditClick = (venta) => {
    setSelectedVenta(venta);
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Ventas</h2>
      <Link to="/nueva-venta" className="btn btn-primary float-end">Agregar Venta</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Edit</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Total Venta</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(venta => (
            <tr key={venta.id}>
              <td>
                <button onClick={() => handleEditClick(venta)}>Editar</button>
              </td>
              <td>{new Date(venta.fecha).toLocaleString()}</td>
              <td>{venta.cliente.nombres} {venta.cliente.apellidos}</td>
              <td>
                <ul>
                  {venta.productos.map((producto, index) => (
                    <li key={index}>
                      {producto.producto.nombre}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {venta.productos.map((producto, index) => (
                    <li key={index}>
                      {producto.cantidad}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {venta.productos.map((producto, index) => (
                    <li key={index}>
                      Q{parseFloat(producto.producto.precio).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </td>
              <td>Q{venta.totalVenta.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedVenta && <EditVentaForm venta={selectedVenta} />}
    </div>
  );
};

export default VentasList;
