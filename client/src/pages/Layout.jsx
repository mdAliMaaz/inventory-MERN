import { Sidebar, Footer } from "../components";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
