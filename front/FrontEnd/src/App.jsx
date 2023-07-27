// App.js

// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './assets/components/Navbar';
import ClientesList from './assets/components/ClientesList';
import ClienteForm from './assets/components/ClienteForm';
import VentasList from './assets/components/VentasList';
import VentaForm from './assets/components/VentaForm';
import AgregarProductoForm from './assets/components/AgregarProductoForm';
import ProductosList from './assets/components/ProductosList';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          {/* Ruta para la lista de clientes */}
          <Route exact path="/clientes" component={ClientesList} />

          {/* Ruta para agregar un nuevo cliente */}
          <Route exact path="/agregar-cliente" component={ClienteForm} />

          <Route exact path="/productos" component={ProductosList} />

          <Route exact path="/agregar-producto" component={AgregarProductoForm} />

          {/* Ruta para la lista de ventas */}
          <Route exact path="/ventas" component={VentasList} />

          {/* Ruta para agregar una nueva venta */}
          <Route exact path="/nueva-venta" component={VentaForm} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
