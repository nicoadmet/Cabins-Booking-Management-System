import { Navigate, Outlet } from "react-router-dom";

const Protected = ({ isLogged }) => {
  return isLogged ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Protected;
