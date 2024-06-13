import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { CategoriaPagination } from "./pagination/CategoriaPagination";
import Swal from "sweetalert2";
import { LoadingSpinner } from "../ui/spinner/LoadingSpinner";
import { CategoriasCard } from "./card/CategoriasCard";
import { useCategorias } from "../../context/CategoriaContext";

export const Categorias = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    categorias,
    isLoading,
    setIsLoading,
    data,
    getCategorias,
    deleteCategoria,
  } = useCategorias();

  const [page, setPage] = useState(1);

  const handleOnBorrarCategoria = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategoria(id);
      }
    });
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    searchParams.set("page", pageNumber);
    navigate(`?${searchParams.toString()}`);
  };

  useEffect(() => {
    getCategorias(searchParams.toString());

    return () => {
      setIsLoading(true);
    };
  }, [page]);

  return (
    <>
      <Container>
        <h1 className="text-center">Seleccione una categoria</h1>
        <Row xs={1} sm={2} md={3} lg={3}>
          {isLoading ? (
            <div className="d-flex justify-content-center w-100 mt-5">
              <LoadingSpinner />
            </div>
          ) : categorias.length < 1 ? (
            <p className="text-center w-100 mt-5">
              No hay categorias para mostrar.
            </p>
          ) : (
            categorias.map((categoria) => (
              <Col key={categoria._id}>
                <CategoriasCard
                  categoria={categoria}
                  handleOnBorrarCategoria={handleOnBorrarCategoria}
                />
              </Col>
            ))
          )}
        </Row>
        <CategoriaPagination
          page={page}
          handlePageChange={handlePageChange}
          data={data}
        />
      </Container>
    </>
  );
};
