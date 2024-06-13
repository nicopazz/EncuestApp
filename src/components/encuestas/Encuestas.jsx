import { useEffect, useState } from "react";
import { useEncuestas } from "../../context/EncuestaContext";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { ABMPagination } from "../abm/pagination/ABMPagination";
import { EncuestasCard } from "./card/EncuestasCard";
import { LoadingSpinner } from "../ui/spinner/LoadingSpinner";

export const Encuestas = () => {
  const { getEncuestasByCategoria, encuestas, data, isLoading, setIsLoading } =
    useEncuestas();

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [updateState, setUpdateState] = useState(0);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    searchParams.set("page", pageNumber);
    navigate(`?${searchParams.toString()}`);
  };

  useEffect(() => {
    getEncuestasByCategoria(id, searchParams.toString());
    return () => {
      setIsLoading(true);
    };
  }, [page, id]);

  return (
    <>
      <Container>
        <h1 className="text-center mb-5">
          Encuestas de la categoría:{" "}
          <span className="text-warning">
            <strong>{encuestas.at(0)?.categoria?.nombre}</strong>
          </span>
        </h1>

        <Row xs={1} sm={1} md={2} lg={2}>
          {isLoading ? (
            <div className="d-flex justify-content-center w-100 mt-5">
              <LoadingSpinner />
            </div>
          ) : encuestas.length < 1 ? (
            <p className="text-center w-100 mt-5">
              No hay categorias para mostrar.
            </p>
          ) : (
            encuestas
              .filter((encuesta) => encuesta.available)
              .map((encuesta) => (
                <Col key={encuesta._id}>
                  <EncuestasCard encuesta={encuesta} />
                </Col>
              ))
          )}
        </Row>
        <ABMPagination
          page={page}
          handlePageChange={handlePageChange}
          data={data}
        />
      </Container>
    </>
  );
};
