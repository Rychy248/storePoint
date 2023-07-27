
import { useState } from 'react';
import axios from 'axios';

const ClienteForm = () => {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realizar una petición POST al endpoint /api/clientes para crear un nuevo cliente
    const nuevoCliente = {
      nombres,
      apellidos,
      direccion,
      telefono,
      email,
    };

    axios.post('http://localhost:3000/cliente', nuevoCliente)
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div className="container mt-4 ">
      <h2>Agregar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            className="form-control"
            id="apellido"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            className="form-control"
            id="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="text"
            className="form-control"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Guardar</button>
      </form>
    </div>
  );
};

export default ClienteForm;
