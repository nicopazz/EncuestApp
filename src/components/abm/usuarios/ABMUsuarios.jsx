import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useEncuestas } from "../../../context/EncuestaContext";
import { ABMUsuariosCard } from "./card/ABMUsuariosCard";
import Swal from "sweetalert2";
import { Container } from "react-bootstrap";
import { LoadingSpinner } from "../../ui/spinner/LoadingSpinner";
import { Link } from "react-router-dom";
export const ABMUsuarios = () => {
  const {
    encuestas,
    getEncuestas,
    deleteEncuesta,
    updateEncuesta,
    isLoading,
    setIsLoading,
  } = useEncuestas();
  const { user } = useAuth();
  const [updateCheckbox, setUpdateCheckbox] = useState(0);

  useEffect(() => {
    getEncuestas("limit=40");

    return () => {
      setUpdateCheckbox(0);
      setIsLoading(true);
    };
  }, [updateCheckbox]);

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

  const handleCheckboxChange = async (e) => {
    console.log(e.target.checked, e.target.id);
    await updateEncuesta(e.target.id, {
      available: e.target.checked,
    });
    setUpdateCheckbox(updateCheckbox + 1);
  };

  return (
    <>
      <Container>
        <h1 className="text-center mb-5">
          Encuestas del usuario{" "}
          <span className="text-warning">{user.username}</span>
        </h1>
        {!isLoading ? (
          encuestas &&
          encuestas.filter((encuesta) => encuesta.user === user._id).length >
            0 ? (
            encuestas
              .filter((encuesta) => encuesta.user === user._id)
              .map((encuesta, index) => (
                <ABMUsuariosCard
                  key={index}
                  encuesta={encuesta}
                  handleOnBorrarEncuesta={handleOnBorrarEncuesta}
                  handleCheckboxChange={handleCheckboxChange}
                />
              ))
          ) : (
            <div className="text-center">
              <p>No tienes ninguna encuesta aún.</p>
              <Link className="btn btn-primary" to="/administrar-encuesta">
                {" "}
                Crea una ahora mismo!
              </Link>
            </div>
          )
        ) : (
          <div className="d-flex justify-content-center mt-5">
            <LoadingSpinner />
          </div>
        )}
      </Container>
    </>
  );
};
