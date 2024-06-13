import propTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

export const CategoriasModal = ({ show, handleClose, imagen }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-black">Previsualización</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {imagen ? (
          <img
            src={imagen || "https://via.placeholder.com/150"}
            alt={`Previsualizacion de la Imagen`}
            className="img-fluid"
          />
        ) : (
          <p className="text-black text-center">
            No hay imagen para previsualizar
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

CategoriasModal.propTypes = {
  show: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
  imagen: propTypes.string.isRequired,
};
