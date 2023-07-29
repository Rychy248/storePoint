import { useState, useEffect } from 'react';
import axios from 'axios';

const VentaForm = () => {
  const [productoId, setProductoId] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [totalVenta, setTotalVenta] = useState('');
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [clienteId, setClienteId] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [esError, setEsError] = useState(false);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [errores, setErrores] = useState({
    productoId: '',
    cantidad: '',
    totalVenta: '',
    clienteId: '',
  });

  useEffect(() => {
    // Obtener lista de productos y clientes desde la API
    axios.get('http://localhost:3000/venta')
      .then(response => {
        // Actualizar el estado con la lista de clientes y productos
        const venta = response.data.data[0];
        setClientes([venta.cliente]);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos antes de enviar los datos al servidor
    let hayErrores = false;
    const nuevosErrores = {};



    if (productoId.trim() === '') {
      nuevosErrores.productoId = 'Selecciona un producto';
      hayErrores = true;
    }

    if (cantidad.trim() === '') {
      nuevosErrores.cantidad = 'Ingresa la cantidad';
      hayErrores = true;
    }

    if (totalVenta.trim() === '') {
      nuevosErrores.totalVenta = 'Ingresa el total de la venta';
      hayErrores = true;
    }

    if (clienteId.trim() === '') {
      nuevosErrores.clienteId = 'Selecciona un cliente';
      hayErrores = true;
    }

    setErrores(nuevosErrores);

    if (!hayErrores) {
      const nuevaVenta = {
        totalVenta: parseFloat(totalVenta),
        productos: [
          {
            cantidad: parseFloat(cantidad),
            productoId: parseInt(productoId),
          }
        ],
        cliente: {
          id: parseInt(clienteId),
        }
      };

      axios.post('http://localhost:3000/venta', nuevaVenta)
        .then(response => {
          // console.log(response.data);
          // Establecer la respuesta del servidor y mostrar el mensaje de éxito
          setRespuesta(response.data.msg);
          setEsError(false);
          setMostrarMensaje(true);
          // Reiniciar los campos del formulario después de enviar los datos
          setFecha('');
          setProductoId('');
          setCantidad('');
          setTotalVenta('');
          setClienteId('');
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
      <h2>Agregar Venta</h2>
      {mostrarMensaje && <div className={`alert ${esError ? 'alert-danger' : 'alert-success'}`}>{respuesta}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productoId">Producto</label>
          <select
            className={`form-control ${errores.productoId && 'is-invalid'}`}
            id="productoId"
            name="productoId"
            value={productoId}
            onChange={(e) => setProductoId(e.target.value)}
          >
            <option value="">Selecciona un producto</option>
            {productos.map((producto) => (
              <option key={producto.id} value={producto.id.toString()}>
                {producto.nombres} {producto.apellidos}
              </option>
            ))}
          </select>
          {errores.productoId && <div className="invalid-feedback">{errores.productoId}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            className={`form-control ${errores.cantidad && 'is-invalid'}`}
            id="cantidad"
            name="cantidad"
            autoComplete='off'
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
          {errores.cantidad && <div className="invalid-feedback">{errores.cantidad}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="totalVenta">Total Venta</label>
          <input
            type="number"
            className={`form-control ${errores.totalVenta && 'is-invalid'}`}
            id="totalVenta"
            name="totalVenta"
            autoComplete='off'
            value={totalVenta}
            onChange={(e) => setTotalVenta(e.target.value)}
          />
          {errores.totalVenta && <div className="invalid-feedback">{errores.totalVenta}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="clienteId">Cliente</label>
          <select
            className={`form-control ${errores.clienteId && 'is-invalid'}`}
            id="clienteId"
            name="clienteId"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
          >
            <option value="">Selecciona un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id.toString()}>
                {cliente.nombres} {cliente.apellidos}
              </option>
            ))}
          </select>
          {errores.clienteId && <div className="invalid-feedback">{errores.clienteId}</div>}
        </div>
        <button type="submit" className="btn btn-primary mt-2">Guardar</button>
      </form>
    </div>
  );
};

export default VentaForm;
