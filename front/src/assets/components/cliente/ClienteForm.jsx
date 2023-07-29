import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const ClienteForm = () => {
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


  const handleSubmit = (e) => {
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
      const nuevoCliente = {
        nombres,
        apellidos,
        direccion,
        telefono,
        email,
      };

      axios.post('http://localhost:3000/cliente', nuevoCliente)
        .then(response => {
        
          setRespuesta(response.data.msg);
          setEsError(false);
          setMostrarMensaje(true);
          // Reiniciar los campos del formulario después de enviar los datos
          setNombres('');
          setApellidos('');
          setDireccion('');
          setTelefono('');
          setEmail('');
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
      <Link to="/clientes" className="btn btn-outline-dark m-2 ">
        <i className="fas fa-arrow-left "></i> Regresar
      </Link>
      <h2>Agregar Cliente</h2>
      {mostrarMensaje && <div className={`alert ${esError ? 'alert-danger' : 'alert-success'}`}>{respuesta}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombres</label>
          <input
            type="text"
            className={`form-control ${errores.nombres && 'is-invalid'}`}
            id="nombre"
            name="nombres"
            autoComplete='off'
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
            autoComplete='off'
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
            autoComplete='off'
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
            autoComplete='off'
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
            autoComplete='off'
            value={email}
            onChange={handleChange}
          />
            {errores.email && <div className="invalid-feedback">{errores.email}</div>}
        </div>
        <button type="submit" className="btn btn-info mt-2">Guardar</button>
      </form>
    </div>
  );
};
