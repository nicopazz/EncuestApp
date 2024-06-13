import { Navigate, Outlet } from "react-router-dom";
import propTypes from "prop-types";

export const ProtectedRoute = ({
  redirectTo,
  isAllowed,
  allowedRoles,
  userRole,
  children,
}) => {
  if (!isAllowed || (allowedRoles && !allowedRoles.includes(userRole)))
    return <Navigate to={redirectTo} replace />;
  return children ? children : <Outlet />;
};

ProtectedRoute.propTypes = {
  isAllowed: propTypes.bool.isRequired,
  redirectTo: propTypes.string.isRequired,
  allowedRoles: propTypes.array,
  userRole: propTypes.string,
};
