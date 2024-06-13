import { createContext, useState, useContext } from "react";
import propTypes from "prop-types";
import { alertcustom } from "../utils/alertCustom";

const CategoriasContext = createContext();

export const useCategorias = () => {
  const context = useContext(CategoriasContext);
  if (!context) {
    throw new Error(
      "useCategorias debe estar dentro del proveedor EncuestasProvider"
    );
  }
  return context;
};

export const CategoriasProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState(null);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const getCategorias = async (params) => {
    try {
      const response = await fetch(
        `${BASE_URL}/categorias${params ? `?${params}` : ""}`
      );

      if (!response.ok) {
        setErrors({
          code: response.status,
          message: response.statusText,
        });
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setIsLoading(false);
      setCategorias(data.categorias);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createCategoria = async (categoria) => {
    try {
      const response = await fetch(`${BASE_URL}/categorias`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoria),
      });

      const categoriasData = await response.json();

      if (categoriasData.errors) {
        setErrors(categoriasData.errors);
        setIsLoading(false);
        return;
      }

      setErrors(null);
      setCategorias([...categorias, categoriasData]);
      setData({
        ...data,
        categorias: [...categorias, categoriasData],
      });
      setIsLoading(false);

      return categoriasData;
    } catch (error) {
      console.log(error);
    }
  };

  const updateCategoria = async (id, categoria) => {
    try {
      const response = await fetch(`${BASE_URL}/categorias/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoria),
      });

      const categoriasData = await response.json();

      if (categoriasData.errors) {
        setErrors(categoriasData.errors);
        setIsLoading(false);
        return;
      }

      setErrors(null);
      setCategorias(
        categorias.map((categoria) =>
          categoria._id === categoriasData._id ? categoriasData : categoria
        )
      );

      setData({
        ...data,
        categorias: data.categorias.map((categoria) =>
          categoria._id === categoriasData._id ? categoriasData : categoria
        ),
      });
      setIsLoading(false);

      return categoriasData;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategoria = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/categorias/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setErrors({
          code: response.status,
          message: response.statusText,
        });
        return;
      }

      setCategorias(categorias.filter((categoria) => categoria._id !== id));
      setData({
        ...data,
        categorias: data.categorias.filter((categoria) => categoria._id !== id),
      });
      setIsLoading(false);
      alertcustom("Categoría eliminada correctamente", "Categoría", "success");
      await getCategorias();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CategoriasContext.Provider
      value={{
        categorias,
        isLoading,
        setIsLoading,
        data,
        errors,
        setErrors,
        getCategorias,
        createCategoria,
        updateCategoria,
        deleteCategoria,
      }}
    >
      {children}
    </CategoriasContext.Provider>
  );
};

CategoriasProvider.propTypes = {
  children: propTypes.node.isRequired,
};
