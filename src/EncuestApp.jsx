import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import {
  ABMPage,
  Categorias,
  CategoriasForm,
  CategoriasProvider,
  Encuestas,
  EncuestasProvider,
  Errors,
  Footer,
  HomeV1,
  Login,
  EncuestasForm,
  Register,
  NavbarTest,
  InfoEquipo,
} from "./pages/index.js";
import { ResponderEncuesta } from "./components/encuestas/responderEncuesta/ResponderEncuesta.jsx";
import { VerResultados } from "./components/encuestas/verResultados/VerResultados.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import { ABMUsuarios } from "./components/abm/usuarios/ABMUsuarios.jsx";

export const EncuestApp = () => {
  const { user, isAuth, isLoading } = useAuth();

  if (isLoading) {
    return <div className="d-flex justify-content-center mt-5">Loading...</div>;
  }
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <BrowserRouter>
        <NavbarTest />
        <Routes>
          <Route path="/" element={<HomeV1 />} />
          <Route
            element={<ProtectedRoute isAllowed={!isAuth} redirectTo="/" />}
          >
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route
            element={
              <ProtectedRoute isAllowed={isAuth} redirectTo="/login">
                <EncuestasProvider>
                  <Outlet />
                </EncuestasProvider>
              </ProtectedRoute>
            }
          >
            <Route
              element={
                <ProtectedRoute
                  isAllowed={
                    isAuth &&
                    (user?.roles[0].nombre === "Administrador" ||
                      user?.roles[0].nombre === "Moderador")
                  }
                  redirectTo="/error"
                  allowedRoles={["Administrador", "Moderador"]}
                  userRole={user && user?.roles[0].nombre}
                />
              }
            >
              <Route path="/abm" element={<ABMPage />} />
            </Route>
            <Route path="/encuestas/categoria/:id" element={<Encuestas />} />
            <Route path="/administrar-encuesta" element={<EncuestasForm />} />
            <Route
              path="/administrar-encuesta/:id"
              element={<EncuestasForm />}
            />
            <Route
              path="/responder-encuesta/:id"
              element={<ResponderEncuesta />}
            />
            <Route
              path="/ver-resultados/:encuestarealizadaid"
              element={<VerResultados />}
            />
            <Route path="/mis-encuestas" element={<ABMUsuarios />} />
          </Route>
          <Route
            element={
              <ProtectedRoute isAllowed={isAuth} redirectTo="/login">
                <CategoriasProvider>
                  <Outlet />
                </CategoriasProvider>
              </ProtectedRoute>
            }
          >
            <Route
              element={
                <ProtectedRoute
                  isAllowed={
                    isAuth &&
                    (user?.roles[0].nombre === "Administrador" ||
                      user?.roles[0].nombre === "Moderador")
                  }
                  redirectTo="/error"
                  allowedRoles={["Administrador", "Moderador"]}
                  userRole={user && user?.roles[0].nombre}
                />
              }
            >
              <Route
                path="/administrar-categoria"
                element={<CategoriasForm />}
              />
              <Route
                path="/administrar-categoria/:id"
                element={<CategoriasForm />}
              />
            </Route>
            <Route path="/categorias" element={<Categorias />} />
          </Route>

          <Route path="*" element={<Errors />} />
          <Route path="/infoequipo" element={<InfoEquipo />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
