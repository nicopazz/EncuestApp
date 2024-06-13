import { useEffect, useState } from "react";
import { ABMFiltros } from "../components/abm/filtros/ABMFiltros";
import { useEncuestas } from "../context/EncuestaContext";
import { useSearchParams, useLocation, Link } from "react-router-dom";
import { Row } from "react-bootstrap";
import { ABMCard } from "../components/abm/card/ABMCard";
import { ABMPagination } from "../components/abm/pagination/ABMPagination";
import { LoadingSpinner } from "../components/ui/spinner/LoadingSpinner";
import { RiSurveyFill } from "react-icons/ri";
import { TbCategoryPlus } from "react-icons/tb";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

export const ABMPage = () => {
  const {
    encuestas,
    getEncuestas,
    isLoading,
    setIsLoading,
    data,
    updateEncuesta,
  } = useEncuestas();
  const [page, setPage] = useState(1);
  const [orderByDate, setOrderByDate] = useState("");
  const [orderByCategory, setOrderByCategory] = useState("");

  //* Permite que el componente se vuelva a renderizar cuando se hace click en el checkbox
  const [updateCheckbox, setUpdateCheckbox] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const { deleteEncuesta } = useEncuestas();
  const { user } = useAuth();
  const { roles } = user;

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const params = {};

  for (let [key, value] of query.entries()) {
    params[key] = value;
  }

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    searchParams.set("page", pageNumber);
    setSearchParams(searchParams);
  };

  const handleOrderByDate = (date) => {
    setOrderByDate(date);
    searchParams.set("order", date);
    setSearchParams(searchParams);
  };

  const handleOrderByCategory = (category) => {
    setOrderByCategory(category);
    setPage(1);
    searchParams.set("page", 1);
    searchParams.set("categoria", category);
    setSearchParams(searchParams);
  };
  const paramsString = new URLSearchParams(params).toString();

  const handleCheckboxChange = async (e) => {
    await updateEncuesta(e.target.id, {
      available: e.target.checked,
    });
    setUpdateCheckbox(updateCheckbox + 1);
  };

  const clearFilters = () => {
    setOrderByDate("");
    setOrderByCategory("");
    setPage(1);
    searchParams.delete("order");
    searchParams.delete("categoria");
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  const handleOnBorrarEncuesta = async (id) => {
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
        deleteEncuesta(id);
      }
    });
  };

  useEffect(() => {
    getEncuestas(paramsString);

    return () => {
      setIsLoading(true);
    };
  }, [page, orderByDate, orderByCategory, updateCheckbox]);

  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-12">
          <section className="header-abm">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-5 gap-5">
              <div className="d-flex align-items-center gap-3 mt-3 mt-md-0">
                <Link
                  to="/administrar-encuesta"
                  className="btn btn-warning p-3 shadow-lg"
                >
                  Nueva encuesta <RiSurveyFill />
                </Link>

                <Link
                  to="/administrar-categoria"
                  className="btn btn-light p-3 shadow-lg"
                >
                  Nueva categoria <TbCategoryPlus />
                </Link>
              </div>
              <ABMFiltros
                orderByDate={orderByDate}
                handleOrderByDate={handleOrderByDate}
                orderByCategory={orderByCategory}
                handleOrderByCategory={handleOrderByCategory}
                clearFilters={clearFilters}
              />
            </div>
          </section>
          <hr className="border-5" />

          <section>
            <Row /* className="g-0" */>
              {!isLoading ? (
                encuestas.length > 0 ? (
                  encuestas.map((encuesta, index) => (
                    <ABMCard
                      key={index + encuesta._id}
                      encuesta={encuesta}
                      updateEncuesta={updateEncuesta}
                      handleCheckboxChange={handleCheckboxChange}
                      handleOnBorrarEncuesta={handleOnBorrarEncuesta}
                    />
                  ))
                ) : (
                  <div className="text-center">
                    No hay encuestas para mostrar.
                  </div>
                )
              ) : (
                <div className="d-flex justify-content-center mt-5">
                  <LoadingSpinner />
                </div>
              )}
            </Row>
          </section>
        </div>
      </div>
      <ABMPagination
        page={page}
        handlePageChange={handlePageChange}
        data={data}
      />
    </div>
  );
};
