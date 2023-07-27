import { useState } from 'react';
import axios from 'axios';

const AgregarProductoForm = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear el objeto producto con los datos del formulario
    const nuevoProducto = {
      nombre,
      descripcion,
      precio,
    };

    // Realizar la petición POST a la API para agregar el producto
    axios.post('http://localhost:3000/productos', nuevoProducto)
      .then(response => {
        // Aquí puedes manejar la respuesta si es necesario
        console.log('Producto agregado exitosamente:', response.data);
      })
      .catch(error => {
        console.error('Error al agregar el producto:', error);
      });

    // Limpiar el formulario después de enviar los datos
    setNombre('');
    setDescripcion('');
    setPrecio('');
  };

  return (
    <div className="container mt-4">
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción:</label>
          <input type="text" className="form-control" id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="precio" className="form-label">Precio:</label>
          <input type="number" className="form-control" id="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Agregar Producto</button>
      </form>
    </div>
  );
};

export default AgregarProductoForm;
