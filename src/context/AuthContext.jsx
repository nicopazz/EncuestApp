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
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const signin = async (data) => {
    try {
      const response = await fetch(`${BASE_URL}/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Credentials": true,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setIsLoading(false);
        return;
      }
      const userData = await response.json();

      setErrors(null);
      setUser(userData);
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
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Credentials": true,
        },
      });

      if (response.ok) {
        Cookies.remove("token");
        setUser(null);
        setIsAuth(false);
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Cookies.get("token")) {
      fetch(`${BASE_URL}/user`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Credentials": true,
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          if (userData.errors) {
            setIsLoading(false);
            return;
          }

          setUser(userData);
          setIsAuth(true);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsAuth(false);
          setUser(null);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
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
