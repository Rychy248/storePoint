import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EditClienteForm from './EditClienteForm';

export const ClientesList = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/cliente", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => setClientes(data.data))
      .catch(error => console.error(error));
  }, []);

  const [selectedClient, setSelectedClient] = useState(null);

  const handleEditClick = (client) => {
    setSelectedClient(client);
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Clientes</h2>
      <Link to="/agregar-cliente" className="btn btn-info float-end">Agregar Cliente</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Editar</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>
              <button onClick={() => handleEditClick(cliente)} className='btn btn-warning'>Editar</button>
              </td>
              <td>{cliente.nombres}</td>
              <td>{cliente.apellidos}</td>
              <td>{cliente.direccion}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedClient && <EditClienteForm client={selectedClient} />}
    </div>
  );
};
