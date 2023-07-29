import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const AgregarProductoForm = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [esError, setEsError] = useState(false);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [errores, setErrores] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Actualizar el estado del campo correspondiente
    switch (name) {
      case 'nombre':
        setNombre(value);
        break;
      case 'descripcion':
        setDescripcion(value);
        break;
      case 'precio':
        setPrecio(value);
        break;
      case 'stock':
        setStock(value);
        break;
      default:
        break;
    }

    // Verificar si el campo ya contiene datos para borrar el mensaje de error
    if (value.trim() !== '') {
      setErrores((prevErrores) => ({ ...prevErrores, [name]: '' }));
    } else {
      setErrores((prevErrores) => ({ ...prevErrores, [name]: `Ingresa el ${name}` }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos antes de enviar los datos al servidor
    let hayErrores = false;
    const nuevosErrores = {};

    if (nombre.trim() === '') {
      nuevosErrores.nombre = 'Ingresa el nombre del producto';
      hayErrores = true;
    }

    if (descripcion.trim() === '') {
      nuevosErrores.descripcion = 'Ingresa una descripción del producto';
      hayErrores = true;
    }

    if (precio.trim() === '') {
      nuevosErrores.precio = 'Ingresa un precio';
      hayErrores = true;
    }

    if (stock.trim() === '') {
      nuevosErrores.stock = 'Ingresa un stock';
      hayErrores = true;
    }

    setErrores(nuevosErrores);

    if (!hayErrores) {
      const nuevoProducto = {
        nombre,
        descripcion,
        precio,
        stock,
      };

    // Realizar la petición POST a la API para agregar el producto
    axios.post('http://localhost:3000/producto', nuevoProducto)
    .then(response => {
      // Establecer la respuesta del servidor y mostrar el mensaje de éxito
      setRespuesta(response.data.msg);
      setEsError(false);
      setMostrarMensaje(true);
      // Reiniciar los campos del formulario después de enviar los datos
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setStock('');
      // Ocultar el mensaje después de 3 segundos (3000 milisegundos)
      setTimeout(() => {
        setMostrarMensaje(false);
      }, 3000);
    })
    .catch(error => {
      console.error(error);
      // Mostrar el mensaje de error en caso de que ocurra un error
      setRespuesta('Error al enviar los datos. Por favor, intenta nuevamente.');
      setEsError(true);
      setMostrarMensaje(true);
      // Ocultar el mensaje de error después de 5 segundos (5000 milisegundos)
      setTimeout(() => {
        setMostrarMensaje(false);
      }, 5000);
    });
}
};

  return (
    <div className="container mt-4">
      <Link to="/productos" className="btn btn-outline-dark m-2 ">
        <i className="fas fa-arrow-left "></i> Regresar
      </Link>
      <h2>Agregar Producto</h2>
      {mostrarMensaje && <div className={`alert ${esError ? 'alert-danger' : 'alert-success'}`}>{respuesta}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input 
          type="text" 
          className={`form-control ${errores.nombre && 'is-invalid'}`}
          id="nombre" 
          name="nombre"
          autoComplete='off'
          value={nombre} 
          onChange={handleChange} 
          />
            {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción:</label>
          <input 
          type="text" 
          className={`form-control ${errores.descripcion && 'is-invalid'}`}
          id="descripcion" 
          name="descripcion"
          autoComplete='off'
          value={descripcion} 
          onChange={handleChange} 
          />
            {errores.descripcion && <div className="invalid-feedback">{errores.descripcion}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="precio" className="form-label">Precio:</label>
          <input 
          type="number" 
          className={`form-control ${errores.precio && 'is-invalid'}`}
          id="precio" 
          name="precio"
          autoComplete='off'
          value={precio} 
          onChange={handleChange} 
          />
            {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">Stock:</label>
          <input 
          type="number" 
          className={`form-control ${errores.stock && 'is-invalid'}`}
          id="stock"
          name="stock"
          autoComplete='off'
          value={stock} 
          onChange={handleChange} 
          />
            {errores.stock && <div className="invalid-feedback">{errores.stock}</div>}
        </div>
        <button type="submit" className="btn btn-info">Agregar Producto</button>
      </form>
    </div>
  );
};

export default AgregarProductoForm;
