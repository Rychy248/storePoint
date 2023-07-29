import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

  return (
    <div className="container mt-4">
      <h2>Lista de Ventas</h2>
      <Link to="/nueva-venta" className="btn btn-info float-end">Agregar Venta</Link>
      <table className="table table-striped">
        <thead>
          <tr>
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
                      Q{parseFloat(producto.producto.precio).toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}                    
                    </li>
                  ))}
                </ul>
              </td>
              <td>Q{venta.totalVenta.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VentasList;
