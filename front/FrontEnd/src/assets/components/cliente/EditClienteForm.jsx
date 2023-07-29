import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Importar PropTypes
import axios from 'axios';

const EditClienteForm = ({ client }) => {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [esError, setEsError] = useState(false);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [errores, setErrores] = useState({
    nombres: '',
    apellidos: '',
    direccion: '',
    telefono: '',
    email: '',
  });

  useEffect(() => {
    // Rellenar los campos del formulario con los datos del cliente seleccionado
    if (client) {
      setNombres(client.nombres || '');
      setApellidos(client.apellidos || '');
      setDireccion(client.direccion || '');
      setTelefono(client.telefono || '');
      setEmail(client.email || '');
    }
  }, [client]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Actualizar el estado del campo correspondiente
    switch (name) {
      case 'nombres':
        setNombres(value);
        break;
      case 'apellidos':
        setApellidos(value);
        break;
      case 'direccion':
        setDireccion(value);
        break;
      case 'telefono':
        setTelefono(value);
        break;
      case 'email':
        setEmail(value);
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

  const handleUpdateClient = (e) => {
    e.preventDefault();

    // Validar campos antes de enviar los datos al servidor
    let hayErrores = false;
    const nuevosErrores = {};

    if (nombres.trim() === '') {
      nuevosErrores.nombres = 'Ingresa el nombre';
      hayErrores = true;
    }

    if (apellidos.trim() === '') {
      nuevosErrores.apellidos = 'Ingresa los apellidos';
      hayErrores = true;
    }

    if (direccion.trim() === '') {
      nuevosErrores.direccion = 'Ingresa la dirección';
      hayErrores = true;
    }

    if (telefono.trim() === '') {
      nuevosErrores.telefono = 'Ingresa el teléfono';
      hayErrores = true;
    }

    if (email.trim() === '') {
      nuevosErrores.email = 'Ingresa el email';
      hayErrores = true;
    }

    setErrores(nuevosErrores);

    if (!hayErrores) {
      const updatedCliente = {
        // id: client.id,
        nombres,
        apellidos,
        direccion,
        telefono,
        email,
      };

      axios.patch(`http://localhost:3000/cliente/${client.id}`, updatedCliente)
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
      <h2>Editar Cliente</h2>
      {mostrarMensaje && <div className={`alert ${esError ? 'alert-danger' : 'alert-success'}`}>{respuesta}</div>}
      <form onSubmit={handleUpdateClient}>
        <div className="form-group">
          <label htmlFor="nombre">Nombres</label>
          <input
            type="text"
            className={`form-control ${errores.nombres && 'is-invalid'}`}
            id="nombre"
            name="nombres"
            value={nombres}
            onChange={handleChange}
          />
          {errores.nombres && <div className="invalid-feedback">{errores.nombres}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellidos</label>
          <input
            type="text"
            className={`form-control ${errores.apellidos && 'is-invalid'}`}
            id="apellido"
            name="apellidos"
            value={apellidos}
            onChange={handleChange}
          />
          {errores.apellidos && <div className="invalid-feedback">{errores.apellidos}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            className={`form-control ${errores.direccion && 'is-invalid'}`}
            id="direccion"
            name="direccion"
            value={direccion}
            onChange={handleChange}
          />
          {errores.direccion && <div className="invalid-feedback">{errores.direccion}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="number"
            className={`form-control ${errores.telefono && 'is-invalid'}`}
            id="telefono"
            name="telefono"
            value={telefono}
            onChange={handleChange}
          />
          {errores.telefono && <div className="invalid-feedback">{errores.telefono}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className={`form-control ${errores.email && 'is-invalid'}`}
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          {errores.email && <div className="invalid-feedback">{errores.email}</div>}
        </div>
        <button type="submit" className="btn btn-info mt-2">Actualizar</button>
      </form>
    </div>
  );
};

EditClienteForm.propTypes = {
    client: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombres: PropTypes.string,
      apellidos: PropTypes.string,
      direccion: PropTypes.string,
      telefono: PropTypes.string,
      email: PropTypes.string,
    }),
  };
export default EditClienteForm;