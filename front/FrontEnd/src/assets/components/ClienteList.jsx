import { useEffect, useState } from 'react';

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    // Petición al backend para obtener la lista de clientes desde la API.
    // ...
  }, []);

  return (
    <div className="container">
      <h2>Lista de Clientes</h2>
      <ul className="list-group">
        {clientes.map(cliente => (
          <li key={cliente.id} className="list-group-item">
            {cliente.nombre} {cliente.apellido}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClienteList;
