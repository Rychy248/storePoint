import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Importar PropTypes
import axios from 'axios';

const EditProductosForm = ({ product }) => {
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

  useEffect(() => {
    if (product) {
      setNombre(product.nombre || '');
      setDescripcion(product.descripcion || '');
      setPrecio(product.precio || '');
      setStock(product.stock || '');
    }
  }, [product]);

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

  const handleUpdateProduct = (e) => {
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

    if (stock === '') {
      nuevosErrores.stock = 'Ingresa un stock';
      hayErrores = true;
    }

    setErrores(nuevosErrores);

    if (!hayErrores) {
        const actualizarProducto = {
          nombre,
          descripcion,
          precio,
          stock,
        };

      axios.patch(`http://localhost:3000/producto/${product.id}`, actualizarProducto)
        .then(response => {
          console.log(response.data.data);
          // Establecer la respuesta del servidor y mostrar el mensaje de éxito
          setRespuesta(response.data.msg);
          setEsError(false);
          setMostrarMensaje(true);
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
    <div className="container mt-4 ">
      <h2>Editar Procuto</h2>
      {mostrarMensaje && <div className={`alert ${esError ? 'alert-danger' : 'alert-success'}`}>{respuesta}</div>}
      <form onSubmit={handleUpdateProduct}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            className={`form-control ${errores.nombre && 'is-invalid'}`}
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
          {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <input
            type="text"
            className={`form-control ${errores.descripcion && 'is-invalid'}`}
            id="descripcion"
            name="descripcion"
            value={descripcion}
            onChange={handleChange}
          />
          {errores.descripcion && <div className="invalid-feedback">{errores.descripcion}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="precio">Precio</label>
          <input
            type="number"
            className={`form-control ${errores.precio && 'is-invalid'}`}
            id="precio"
            name="precio"
            value={precio}
            onChange={handleChange}
          />
          {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            className={`form-control ${errores.stock && 'is-invalid'}`}
            id="stock"
            name="stock"
            value={stock}
            onChange={handleChange}
          />
          {errores.stock && <div className="invalid-feedback">{errores.stock}</div>}
        </div>
        <button type="submit" className="btn btn-info mt-2">Actualizar</button>
      </form>
    </div>
  );
};

EditProductosForm.propTypes = {
    product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string,
      descripcion: PropTypes.string,
      precio: PropTypes.string,
      stock: PropTypes.number,
    }),
  };
export default EditProductosForm;