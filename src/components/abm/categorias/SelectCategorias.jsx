import { useFetch } from "../../../hooks/useFetch";
import { Select } from "../../ui/select/Select";
import propTypes from "prop-types";
export const SelectCategorias = ({
  orderByCategory,
  handleOrderByCategory,
}) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const { data, isLoading } = useFetch(`${BASE_URL}/categorias`);

  return (
    <Select
      name="categoria"
      id="categoria"
      value={orderByCategory}
      onChange={(e) => handleOrderByCategory(e.target.value)}
      className="mb-3 bg-white bg-opacity-75 border-secondary text-black mt"
    >
      <option disabled value="">
        Categorias
      </option>
      <option value="Default">Por defecto</option>
      {isLoading && <option value="">Cargando...</option>}
      {data?.categorias &&
        data?.categorias.map((categoria) => (
          <option key={categoria._id} value={categoria._id}>
            {categoria.nombre}
          </option>
        ))}
    </Select>
  );
};

SelectCategorias.propTypes = {
  orderByCategory: propTypes.string.isRequired,
  handleOrderByCategory: propTypes.func.isRequired,
};
