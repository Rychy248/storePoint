//ahora importaremos los estilos de App.css
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          {/* Reemplaza el "href" con "to" para utilizar el componente Link */}
          <Link to="/" className="navbar-brand">Mi Tienda</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              {/* Reemplaza los enlaces <a> con los componentes Link */}
              <Link to="/clientes" className="nav-link active">Clientes</Link>
              <Link to="/productos" className="nav-link">Productos</Link>
              <Link to="/ventas" className="nav-link">Ventas</Link>
              {/* El atributo "disabled" no es aplicable para los componentes Link */}
            </div>
          </div>
        </div>
    </nav>
  );
};

export default Navbar;
