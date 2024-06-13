import propTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "./EncuestasCard.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";

export const EncuestasCard = ({ encuesta }) => {
  const { user } = useAuth();
  const [encuestasRealizadas, setEncuestasRealizadas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setEncuestasRealizadas(user.encuestasRealizadas);
    }
  }, [user]);

  const encuestaRespondida = encuestasRealizadas.some(
    (encuestaRealizada) => encuestaRealizada.encuesta === encuesta._id
  );

  // console.log(encuestasRealizadas, encuestaRespondida);
  // console.log(user);
  // console.log(encuesta);

  return (
    <Card className={`${styles.cardMargin} ${styles.cardBackground}`}>
      <Card.Body>
        <Card.Title className="text-center">
          <strong>{encuesta.nombre}</strong>
        </Card.Title>
        <Card.Text>{encuesta.descripcion}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <div className="d-flex w-100 justify-content-between align-items-center">
          <small className="text-muted">
            Autor: {encuesta?.user?.username}
          </small>
          {encuestaRespondida ? (
            <Button
              variant="success"
              onClick={() => {
                navigate(
                  `/ver-resultados/${
                    encuestasRealizadas.find(
                      (encuestaRealizada) =>
                        encuestaRealizada.encuesta === encuesta._id
                    )._id
                  }`
                );
              }}
            >
              Ver resultados
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => navigate(`/responder-encuesta/${encuesta._id}`)}
            >
              Responder encuesta
            </Button>
          )}
        </div>
      </Card.Footer>
    </Card>
  );
};

EncuestasCard.propTypes = {
  encuesta: propTypes.object.isRequired,
};
