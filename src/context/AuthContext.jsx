import { createContext, useState, useContext, useEffect } from "react";
import propTypes from "prop-types";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro del proveedor AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  //const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const signin = async (data) => {
    try {
      const response = await fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setIsLoading(false);
        return;
      }
      const userData = await response.json();

      setErrors(null);
      localStorage.setItem("user",JSON.stringify(userData))
      setIsAuth(true);
      setIsLoading(false);

      return userData;
    } catch (error) {
      console.log(error);
    }
  };

  const signout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/signout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        Cookies.remove("token");
        localStorage.removeItem("user");
        setIsAuth(false);  // Asegúrate de que `isAuth` se actualice a `false`
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  
  

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
  
    if (storedUser) {
      setIsAuth(true);
      setIsLoading(false);
    } else if (Cookies.get("token")) {
      fetch(`${BASE_URL}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          if (userData.errors) {
            setIsLoading(false);
            return;
          }
  
          localStorage.setItem("user", JSON.stringify(userData));
          setIsAuth(true);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsAuth(false);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);
  
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        isLoading,
        errors,
        setErrors,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};
