import { useState } from 'react';

const ClienteForm = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Petición al backend para agregar un nuevo cliente a la API.
    // ...
  };

  return (
    <div className="container">
      <h2>Agregar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        </div>
        <div className="mb-3">
          <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Agregar</button>
      </form>
    </div>
  );
};

export default ClienteForm;
