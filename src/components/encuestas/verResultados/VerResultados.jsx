import { useNavigate, useParams } from "react-router-dom";
import { useEncuestas } from "../../../context/EncuestaContext";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

export const VerResultados = () => {
  const { encuestarealizadaid } = useParams();
  const { encuestaRealizada, getEncuestaRealizada } = useEncuestas();
  const navigate = useNavigate();

  useEffect(() => {
    getEncuestaRealizada(encuestarealizadaid);
  }, [encuestarealizadaid]);

  return (
    <Container
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: "white",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <Row>
        <Col className="text-center">
          {encuestaRealizada && encuestaRealizada.encuesta && (
            <h2>
              Resultados de la encuesta {encuestaRealizada.encuesta.nombre}
            </h2>
          )}
        </Col>
      </Row>
      {encuestaRealizada &&
        encuestaRealizada.encuesta &&
        encuestaRealizada.preguntasRespuestas.map((pregunta) => (
          <Row key={pregunta._id} style={{ marginBottom: "20px" }}>
            <Col>
              <h3>Pregunta: {pregunta.pregunta}</h3>
              <ul style={{ listStyleType: "none" }}>
                {pregunta.respuestas.map((respuesta, index) => (
                  <li key={index}>Respuesta/s: {respuesta}</li>
                ))}
              </ul>
            </Col>
          </Row>
        ))}

      {/* <Row>
        <Col className="text-center">
          <h3>Gráfico de resultados</h3>
          <p>En construcción...</p>
        </Col>
      </Row> */}

      <Row>
        <Col className="text-center">
          <button
            className="btn btn-warning"
            onClick={() => navigate("/categorias")}
          >
            Encuentra más encuestas para responder aquí
          </button>
        </Col>
      </Row>
    </Container>
  );
};
