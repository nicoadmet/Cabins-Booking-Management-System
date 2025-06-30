import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminRoute = () => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);

    if (decoded.role !== "admin") {
      return <Navigate to="/dashboard" />;
    }

    return <Outlet />;
  } catch (err) {
    console.error("Token inválido:", err);
    return <Navigate to="/login" />;
  }
}

export default AdminRoute