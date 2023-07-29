
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './assets/components/Navbar';
import { ClientesList } from './assets/components/cliente/ClientesList';
import { ClienteForm } from './assets/components/cliente/ClienteForm';
import EditClienteForm from './assets/components/cliente/EditClienteForm';
import VentasList from './assets/components/venta/VentasList';
import ProductosList from './assets/components/producto/ProductosList';
import AgregarProductoForm from './assets/components/producto/AgregarProductoForm';
import VentaForm from './assets/components/venta/VentaForm';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/clientes" component={ClientesList} />

          <Route exact path="/agregar-cliente" component={ClienteForm} />

          <Route path="/actualizar-cliente" component={EditClienteForm} />

          <Route exact path="/" component={VentasList} />

          <Route exact path="/ventas" component={VentasList} />

          <Route exact path="/nueva-venta" component={VentaForm} />

          <Route exact path="/productos" component={ProductosList} />

          <Route exact path="/agregar-producto" component={AgregarProductoForm} />

        </Switch>
      </div>
    </Router>
  );
};

export default App;
