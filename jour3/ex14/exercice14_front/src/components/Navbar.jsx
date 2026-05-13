import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { logout } from "../api";

function AppNavbar() {
  const handleLogout = () => {
    logout();
    window.location.reload(false);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Gestion des utilisateurs
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Accueil
          </Nav.Link>
          <Nav.Link as={Link} to="/profile">
            Profil
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/signup">
            Inscription
          </Nav.Link>
          <Nav.Link as={Link} to="/login">
            Connexion
          </Nav.Link>
          <Nav.Link as={Link} onClick={() => handleLogout()}>
            Déconnexion
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavbar;
