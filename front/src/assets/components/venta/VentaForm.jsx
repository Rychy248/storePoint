import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VentaForm = () => {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState('');
  const [selectedProducto, setSelectedProducto] = useState('');
  const [cantidad, setCantidad] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Estado para controlar el estilo de los campos inválidos
  const [clienteError, setClienteError] = useState(false);
  const [productoError, setProductoError] = useState(false);
  const [cantidadError, setCantidadError] = useState(false);

  // Obtener la lista de clientes y productos al cargar el componente
  useEffect(() => {
    obtenerClientes();
    obtenerProductos();
  }, []);

  // Obtener la lista de clientes desde el endpoint GET /clientes
  const obtenerClientes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/cliente');
      setClientes(response.data.data);
    } catch (error) {
      console.error('Error al obtener la lista de clientes:', error);
    }
  };

  // Obtener la lista de productos desde el endpoint GET /productos
  const obtenerProductos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/producto');
      setProductos(response.data.data);
    } catch (error) {
      console.error('Error al obtener la lista de productos:', error);
    }
  };

  // vaciar los campos después de enviar la venta
  const vaciarCampos = () => {
    setSelectedCliente('');
    setSelectedProducto('');
    setCantidad('');
  };

  // Manejar el envío del formulario para crear una nueva venta
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Resetear los estados de error antes de validar nuevamente
    setClienteError(false);
    setProductoError(false);
    setCantidadError(false);

    // Validar campos vacíos
    if (!selectedCliente) {
      setClienteError(true);
      return;
    }

    if (!selectedProducto) {
      setProductoError(true);
      return;
    }

    if (!cantidad) {
      setCantidadError(true);
      return;
    }

    try {
      const nuevaVenta = {
        clienteId: selectedCliente,
        productos: [
          {
            cantidad: cantidad,
            productoId: selectedProducto,
          },
        ],
      };

      const response = await axios.post('http://localhost:3000/venta', nuevaVenta, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Nueva venta creada:', response.data);

      // Mostrar el mensaje de éxito
      setSuccessMessage('Venta creada exitosamente');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      // Vaciar los campos después de enviar la venta
      vaciarCampos();
    } catch (error) {
      console.error('Error al crear la venta:', error);
      // Mostrar el mensaje de error por 3 segundos
      setErrorMessage('Error al crear la venta. Por favor, intenta nuevamente.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  return (
    <div className='container mt-4'>
      <Link to="/ventas" className="btn btn-outline-dark m-2 ">
        <i className="fas fa-arrow-left "></i> Regresar
      </Link>
      {/* Mostrar mensaje de éxito */}
      {successMessage && <div className="alert alert-success m-4" role="alert">
        {successMessage}
      </div>}

      {/* Mostrar mensaje de error */}
      {errorMessage && <div className="alert alert-danger m-4" role="alert">
        {errorMessage}
      </div>}

      <form onSubmit={handleSubmit}>
        <h2>Agregar Venta</h2>
        <div className={`mb-3 ${clienteError ? 'has-error' : ''}`}>
          <label htmlFor="cliente" className="form-label">Selecciona un cliente:</label>
          <select
            id="cliente"
            className={`form-select ${clienteError ? 'is-invalid' : ''}`}
            value={selectedCliente}
            onChange={(e) => setSelectedCliente(e.target.value)}
          >
            <option value="">-- Seleccionar cliente --</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombres} {cliente.apellidos}
              </option>
            ))}
          </select>
          {clienteError && <div className="invalid-feedback">Selecciona un cliente</div>}
        </div>
        <div className={`mb-3 ${productoError ? 'has-error' : ''}`}>
          <label htmlFor="producto" className="form-label">Selecciona un producto:</label>
          <select
            id="producto"
            className={`form-select ${productoError ? 'is-invalid' : ''}`}
            value={selectedProducto}
            onChange={(e) => setSelectedProducto(e.target.value)}
          >
            <option value="">-- Seleccionar producto --</option>
            {productos.map((producto) => (
              <option key={producto.id} value={producto.id}>
                {producto.nombre}
              </option>
            ))}
          </select>
          {productoError && <div className="invalid-feedback">Selecciona un producto</div>}
        </div>
        <div className={`mb-3 ${cantidadError ? 'has-error' : ''}`}>
          <label htmlFor="cantidad" className="form-label">Cantidad:</label>
          <input
            type="number"
            id="cantidad"
            className={`form-control ${cantidadError ? 'is-invalid' : ''}`}
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            min="1"
          />
          {cantidadError && <div className="invalid-feedback">Ingresa una cantidad válida</div>}
        </div>
        <button type="submit" className="btn btn-primary">Agregar Venta</button>
      </form>
    </div>
  );
};

export default VentaForm;
