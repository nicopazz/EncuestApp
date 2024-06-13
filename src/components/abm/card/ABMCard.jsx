import propTypes from "prop-types";
import { Card, Button, Col, Form } from "react-bootstrap";
import { FaRegTrashAlt, FaPencilAlt, FaInfo } from "react-icons/fa";
import styles from "./ABMCard.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export const ABMCard = ({
  encuesta,
  handleCheckboxChange,
  handleOnBorrarEncuesta,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { roles } = user;

  return (
    <Col xs={12} md={encuesta.length < 2 ? 12 : 6}>
      <Card className={`${styles.cardMargin} ${styles.cardBackground}`}>
        <Card.Body>
          <Card.Title>
            <strong>{encuesta.nombre}</strong>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Categoría: <em>{encuesta.categoria.nombre}</em>
          </Card.Subtitle>
          <Card.Text>Descripción: {encuesta.descripcion}</Card.Text>
          <Card.Text>
            Estado:{" "}
            <strong>
              {encuesta.available ? "Disponible" : "No disponible"}
            </strong>
          </Card.Text>

          {user && roles[0].nombre == "Administrador" && (
            <>
              <Button
                variant="danger"
                className="ms-3"
                onClick={() => handleOnBorrarEncuesta(encuesta._id)}
              >
                <FaRegTrashAlt /> Eliminar
              </Button>
              <Button
                variant="warning"
                className="ms-3"
                onClick={() =>
                  navigate(`/administrar-encuesta/${encuesta._id}`)
                }
              >
                <FaPencilAlt /> Editar
              </Button>
              <Form.Check
                type="checkbox"
                className="mt-3"
                checked={encuesta.available}
                id={encuesta._id}
                label={
                  encuesta.available
                    ? "Deshabilitar Encuesta"
                    : "Habilitar Encuesta"
                }
                onChange={handleCheckboxChange}
              />
            </>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

ABMCard.propTypes = {
  encuesta: propTypes.object.isRequired,
  handleCheckboxChange: propTypes.func.isRequired,
};
