//ahora importaremos los estilos de App.css
import { Link, useLocation } from 'react-router-dom';
const Navbar = () => {
  const location = useLocation
  return (
    <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">Mi Tienda</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to="/clientes" className={`nav-link ${location.pathname === '/clientes' ? 'active-link' : ''}`}>Clientes</Link>
              <Link to="/productos" className={`nav-link ${location.pathname === '/productos' ? 'active-link' : ''}`}>Productos</Link>
              <Link to="/ventas" className={`nav-link ${location.pathname === '/ventas' ? 'active-link' : ''}`}>Ventas</Link>
            </div>
          </div>
        </div>
    </nav>
  );
};

export default Navbar;
