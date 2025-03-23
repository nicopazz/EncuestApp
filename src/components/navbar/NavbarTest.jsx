import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  container,
  button,
  button2,
  button3,
  btnHamburguesa,
  containerNav,
  title,
  navCollapse,
} from "./NavbarTest.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/logo-no-fondo.png";
import styles from "../footer/Footer.module.css";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

export const NavbarTest = () => {
  const { isAuth, user, signout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('isAuth changed:', isAuth); // Verifica cuando el estado cambia
  }, [isAuth]);

  // Manejar el logout
  const handleLogout = () => {
    signout();  // Llama a signout para cambiar isAuth a false
    navigate("/login");  // Redirige a login
  };

  return (
    <Navbar expand="lg" id={container}>
      <Container>
        <Navbar.Brand className="fw-bold text-white" id={title}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav text-white"
          id={btnHamburguesa}
        />
        <Navbar.Collapse id="basic-navbar-nav" className={navCollapse}>
          <Nav className="gap-3" id={containerNav}>
            <Button id={button} size="sm">
              <Navbar.Text>
                <Link to="/" className="fw-bold text-decoration-none">
                  Home
                </Link>
              </Navbar.Text>
            </Button>
            {!isAuth ? (
              <Button id={button2} size="sm">
                <Navbar.Text>
                  <Link to="/login" className="fw-bold text-decoration-none">
                    Login
                  </Link>
                </Navbar.Text>
              </Button>
            ) : (
              <>
                {user && user.roles === "Administrador" && (
                  <Button id={button3} size="sm">
                    <Navbar.Text>
                      <Link to="/abm" className="fw-bold text-decoration-none">
                        Administración
                      </Link>
                    </Navbar.Text>
                  </Button>
                )}
                <Button id={button3} size="sm">
                  <Navbar.Text>
                    <Link to="/categorias" className="fw-bold text-decoration-none">
                      Categorías
                    </Link>
                  </Navbar.Text>
                </Button>
                {user && user.roles === "Administrador" && (
                  <Button id={button3} size="sm">
                    <Navbar.Text>
                      <Link to="/mis-encuestas" className="fw-bold text-decoration-none">
                        Mis Encuestas
                      </Link>
                    </Navbar.Text>
                  </Button>
                )}
                <Button id={button3} size="sm" onClick={handleLogout}>
                  <Navbar.Text>
                    <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                  </Navbar.Text>
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
