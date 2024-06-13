import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useForm } from "../../hooks/useForm.js";
import { Link, useNavigate } from "react-router-dom";
import { Container, Col, Form, Button, InputGroup } from "react-bootstrap";
import {
  container,
  submitBtn,
  hiddenButton,
  inputField,
  inputField2,
} from "../login/LoginUser1.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { alertcustom } from "../../utils/alertCustom.js";

export const LoginUser = () => {
  const { signin, errors, setErrors } = useAuth();
  const { email, password, handleOnChange, setFormData } = useForm({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signin({
        email,
        password,
      });

      if (!response) {
        alertcustom("", "Credenciales incorrectas", "error");
        return;
      }

      alertcustom("Inicio de sesión exitoso", "Logueado", "success", () => {
        setErrors(null);
        setFormData({ email: "", password: "" });
        navigate("/");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const hasError = (path) =>
    errors && !!errors.find((err) => err.path === path);

  return (
    <Col
      id={container}
      className="d-flex justify-content-center animate__animated animate__backInLeft _formCard_7jj89_1"
    >
      <Container>
        <div className="d-flex justify-content-center align-items-center my-3 pb-3 border border-light border-0 border-bottom">
          <div className="ms-4 text-center">
            <h1 className="display-5 fw-semibold text-black">Acceso</h1>
          </div>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="fw-bold text-white">
                Correo electrónico
              </Form.Label>
              <Form.Control
                id={inputField}
                type="email"
                name="email"
                placeholder="Ingrese su correo electrónico"
                value={email}
                onChange={handleOnChange}
                isInvalid={hasError("email")}
              />
              {hasError("email") && (
                <Form.Control.Feedback type="invalid">
                  {errors.find((error) => error.path === "email").msg}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label className="fw-bold text-white">Contraseña</Form.Label>
              <InputGroup className="d-flex">
                <Form.Control
                  id={inputField2}
                  placeholder="Ingrese su contraseña"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={handleOnChange}
                  isInvalid={hasError("password")}
                />
                <InputGroup.Text
                  id={hiddenButton}
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon
                    icon={passwordVisible ? faEyeSlash : faEye}
                    className="d-flex justify-content-center text-dark"
                  />
                </InputGroup.Text>

                {hasError("password") && (
                  <Form.Control.Feedback type="invalid">
                    {errors.find((error) => error.path === "password").msg}
                  </Form.Control.Feedback>
                )}
              </InputGroup>
            </Form.Group>

          <div className="fw-bold text-black m-3">
            ¿Todavía no te registraste?
            <Link to="/register" className="fw-bold text-decoration-none p-2">
              <span> Registrarse</span>
            </Link>
          </div>

          <Button
            id={submitBtn}
            className="my-3 w-100 fw-bold text-white"
            variant="primary"
            type="submit"
          ><Link to="/categorias" className="fw-bold text-decoration-none p-2"></Link>
            Iniciar sesión
          </Button>
        </Form>
      </Container>
    </Col>
  );
};

export default LoginUser;
