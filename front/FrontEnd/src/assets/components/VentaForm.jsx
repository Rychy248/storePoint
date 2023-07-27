import axios from 'axios';
import { useState } from 'react';

const VentaForm = () => {
  const [clienteId, setClienteId] = useState('');
  const [fecha, setFecha] = useState('');
  const [productos, setProductos] = useState([]);
  const [totalVenta, setTotalVenta] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realizar una petición POST al endpoint /api/ventas para crear una nueva venta
    const nuevaVenta = {
      cliente_id: clienteId,
      fecha,
      total: totalVenta,
    };

    axios.post('/api/ventas', nuevaVenta)
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  };

  // Otras funciones para manejar la selección de productos y calcular el total de la venta

  return (
    <div className="container mt-4">
      <h2>Nueva Venta</h2>
      <form onSubmit={handleSubmit}>
        {/* Formulario para seleccionar cliente y productos */}
        {/* ... */}
        <button type="submit" className="btn btn-primary">Guardar Venta</button>
      </form>
    </div>
  );
};

export default VentaForm;
