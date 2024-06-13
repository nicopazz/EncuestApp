import { CiFacebook, CiInstagram, CiTwitter } from "react-icons/ci";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../../assets/logo-no-fondo.png";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row xs={1} sm={3} md={3} lg={3} className="align-items-center">
          <Col className={`text-center py-4 text-white`}>
            <ul>
              <li>
                <a href="https://www.facebook.com/">
                  <CiFacebook size={32} />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/">
                  <CiInstagram size={32} />
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com/">
                  <CiTwitter size={32} />
                </a>
              </li>
              <Link to='/infoEquipo'>Acerca de nosotros</Link>
            </ul>
          </Col>
          <Col className={`text-center py-4 text-white`}>
            <a href="/">
              <img src={logo} alt="Logo" className={styles.logo} />
            </a>
          </Col>

          <Col className={`text-center py-5 text-white`}>
            Derechos reservados &copy; {new Date().getFullYear()}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
