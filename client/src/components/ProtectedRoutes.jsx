import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ component: Component }) => {
  const user = useAuth();
  return user ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
