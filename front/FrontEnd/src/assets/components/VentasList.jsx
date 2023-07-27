import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const VentasList = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    // Realizar una petición GET al endpoint /api/ventas para obtener la lista de ventas
    axios.get('/api/ventas')
      .then(response => setVentas(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container mt-4">
      <Link to="/nueva-venta" className="btn btn-primary float-end">Agregar Venta</Link> {/* Botón para agregar cliente */}
      <h2>Lista de Ventas</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Número de Venta</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(venta => (
            <tr key={venta.id}>
              <td>{venta.id}</td>
              <td>{venta.cliente_id}</td>
              <td>{venta.fecha}</td>
              <td>{venta.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VentasList;
