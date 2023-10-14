import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicRoutes = ({ component: Component }) => {
  const user = useAuth();
  return !user ? <Outlet /> : <Navigate to={"/dashboard"} />;
};

export default PublicRoutes;
