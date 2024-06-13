import { useNavigate, useParams } from "react-router-dom";
import { useEncuestas } from "../../../context/EncuestaContext";
import { useEffect, useState } from "react";
import { Container, Form, Button, ListGroup } from "react-bootstrap";
import { FormCard } from "../../../components/ui/formcard/FormCard";
import { alertcustom } from "../../../utils/alertCustom";
import { useAuth } from "../../../context/AuthContext";

export const ResponderEncuesta = () => {
  const { getEncuesta } = useEncuestas();
  const { user, setUser } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [encuestaData, setEncuestaData] = useState([]);
  const [formData, setFormData] = useState([]);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    getEncuesta(id).then((data) => {
      setEncuestaData(data);
      setFormData(
        data.preguntas.map((pregunta) => ({
          pregunta: pregunta.pregunta,
          respuestas: [],
        }))
      );
    });
  }, [id]);

  useEffect(() => {
    setFormValid(formData.every((item) => item.respuestas.length > 0));
  }, [formData]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return prevState.map((item) => {
        if (item.pregunta === name) {
          return { ...item, respuestas: [value] };
        } else {
          return item;
        }
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataForm = {
        encuesta_id: id,
        preguntasRespuestas: formData,
      };

      const response = await fetch(`${BASE_URL}/encuestas/realizar`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(dataForm),
      });

      // const data = await response.json();

      // console.log(data);

      if (response.ok) {
        setUser((prevUser) => ({
          ...prevUser,
          encuestasRealizadas: [
            ...prevUser.encuestasRealizadas,
            { encuesta: id, _id: data._id },
          ],
        }));

        alertcustom("", "Encuesta enviada correctamente", "success", () => {
          navigate(`/ver-resultados/${data.encuestaRealizadaId}`);
          setFormData([]);
          setFormValid(false);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <FormCard>
        <h3 className="text-center">Encuesta de {encuestaData.nombre}</h3>
        <Form onSubmit={handleSubmit}>
          {encuestaData.preguntas &&
            encuestaData.preguntas.map((pregunta) => (
              <div key={pregunta.id} className="mb-3">
                <Form.Group>
                  <Form.Label className="fs-5">{pregunta.pregunta}</Form.Label>
                  <ListGroup>
                    {pregunta.respuestas?.map((respuesta) => (
                      <ListGroup.Item key={respuesta.id}>
                        <Form.Check
                          type="radio"
                          id={respuesta.id}
                          name={pregunta.pregunta}
                          value={respuesta.respuesta}
                          onChange={handleOnChange}
                          label={respuesta.respuesta}
                        />
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Form.Group>
              </div>
            ))}
          <Button
            type="submit"
            variant="primary"
            className="mt-2"
            disabled={!formValid}
          >
            {!formValid ? "Responda todas las preguntas para enviar" : "Enviar"}
          </Button>
        </Form>
      </FormCard>
    </Container>
  );
};
