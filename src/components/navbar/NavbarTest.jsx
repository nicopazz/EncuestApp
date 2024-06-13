// import { Container, Nav, Navbar, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import {
//   container,
//   button,
//   button2,
//   button3,
//   btnHamburguesa,
//   containerNav,
//   title,
//   navCollapse,
// } from "./NavbarTest.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import logo from "../../assets/logo-no-fondo.png";
// import styles from "../footer/Footer.module.css";
// import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
// import { useAuth } from "../../context/AuthContext";
// export const NavbarTest = () => {
//   const { user, isAuth, signout } = useAuth();
//   return (
//     <Navbar expand="lg" id={container}>
//       <Container>
//         <Navbar.Brand className="fw-bold text-white" id={title}>
//           <img src={logo} alt="Logo" className={styles.logo} />
//         </Navbar.Brand>
//         <Navbar.Toggle
//           aria-controls="basic-navbar-nav text-white"
//           id={btnHamburguesa}
//         />
//         <Navbar.Collapse id="basic-navbar-nav" className={navCollapse}>
//           <Nav className="gap-3" id={containerNav}>
//             <Button id={button} size="sm">
//               <Navbar.Text>
//                 <Link to='/' className='fw-bold text-decoration-none'>Inicio</Link>
//               </Navbar.Text>
//             </Button>
//             {!isAuth && (
//               <>
//                 <Button id={button2} size="sm">
//                   <Navbar.Text>
//                     <Link to='/login' className='fw-bold text-decoration-none'>Acceso</Link>
//                   </Navbar.Text>
//                 </Button>
//               </>
//             )}
//             {isAuth && (
//               <>
//                 <Button id={button3} size="sm">
//                   <Navbar.Text>
//                     <Link
//                       to="/categorias"
//                       className="fw-bold text-decoration-none"
//                     >
//                       Categorias
//                     </Link>
//                   </Navbar.Text>
//                 </Button>
//                 <Button id={button3} size="sm">
//                   <Navbar.Text>
//                     <Link
//                       to="/mis-encuestas"
//                       className="fw-bold text-decoration-none"
//                     >
//                       Mis Encuestas
//                     </Link>
//                   </Navbar.Text>
//                 </Button>

//                 <Button id={button3} size="sm">
//                   <Navbar.Text>
//                     <Link
//                       to="/"
//                       className="fw-bold text-decoration-none"
//                       onClick={signout}
//                     >
//                       Logout
//                     </Link>
//                   </Navbar.Text>
//                 </Button>
//               </>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };


import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
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
export const NavbarTest = () => {
  const { user, isAuth, signout } = useAuth();
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
            {!isAuth && (
              <>
                <Button id={button2} size="sm">
                  <Navbar.Text>
                    <Link to="/login" className="fw-bold text-decoration-none">
                      Login
                    </Link>
                  </Navbar.Text>
                </Button>
              </>
            )}
            {isAuth && user.roles[0].nombre == "Administrador" && (
              <>
                <Button id={button3} size="sm">
                  <Navbar.Text>
                    <Link to="/abm" className="fw-bold text-decoration-none">
                      Administración
                    </Link>
                  </Navbar.Text>
                </Button>
              </>
            )}
            {isAuth && (
              <>
                <Button id={button3} size="sm">
                  <Navbar.Text>
                    <Link
                      to="/categorias"
                      className="fw-bold text-decoration-none"
                    >
                      Categorias
                    </Link>
                  </Navbar.Text>
                </Button>
            {isAuth && user.roles[0].nombre == "Administrador" && (
              <>
                <Button id={button3} size="sm">
                  <Navbar.Text>
                    <Link
                      to="/mis-encuestas"
                      className="fw-bold text-decoration-none"
                    >
                      Mis Encuestas
                    </Link>
                  </Navbar.Text>
                </Button>
              </>
              )}
                
                <Button id={button3} size="sm">
                  <Navbar.Text>
                    <Link
                      to="/"
                      className="fw-bold text-decoration-none"
                      onClick={signout}
                    >
                      Logout
                    </Link>
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