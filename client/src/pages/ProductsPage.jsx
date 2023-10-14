import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/features/productSlice";
import { useEffect } from "react";
import { ProductCard, AddProduct, Loading } from "../components";
import { logout } from "../redux/features/authSlice";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      {!data ? (
        <div className=' flex items-center flex-col justify-center h-screen w-screen '>
          <h1 className=' lg:text-4xl capitalize'>
            Login again Token not found
          </h1>
          <button
            className=' m-5 btn btn-warning animate-bounce'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className=' w-full  lg:px-20 px-10 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
          <AddProduct />
          {isLoading ? (
            <Loading />
          ) : (
            data.map((item) => (
              <ProductCard key={crypto.randomUUID()} item={item} />
            ))
          )}
        </div>
      )}
    </>
  );
};

export default ProductsPage;
