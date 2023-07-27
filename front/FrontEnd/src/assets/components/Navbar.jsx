
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">Mi Tienda</Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/clientes" className="nav-link">Clientes</Link>
          </li>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/productos" className="nav-link">Productos</Link>
            </li>
        </ul>
          <li className="nav-item">
            <Link to="/ventas" className="nav-link">Ventas</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
