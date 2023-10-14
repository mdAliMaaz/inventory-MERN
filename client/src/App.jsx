import { Route, Routes } from "react-router-dom";

import {
  DashboardPage,
  HomePage,
  Layout,
  LoginPage,
  ProductsPage,
  RegisterPage,
  SalesDetails,
  SalesPage,
  SingleProductPage,
} from "./pages";

import { ProtectedRoute, PublicRoutes } from "./components";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>

        {/* Private Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/products/:id' element={<SingleProductPage />} />
            <Route path='/sales' element={<SalesPage />} />
            <Route path='/sales/:id' element={<SalesDetails />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
