import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
  PieChart,
  Pie,
  LabelList,
  Cell,
} from "recharts";
import { NavLink } from "react-router-dom";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getStocks } from "../redux/features/productSlice";
import { Loading } from "../components";
import { logout } from "../redux/features/authSlice";

const DashboardPage = () => {
  const dispatch = useDispatch();

  const { isLoading, data } = useSelector((state) => state.product.stocks);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(getStocks());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return (
      <div className=' flex items-center flex-col justify-center h-screen w-screen '>
        <h1 className=' lg:text-4xl '>Login again Token not found</h1>
        <button
          className=' m-5 btn btn-warning animate-bounce'
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    );
  }

  if (data?.length <= 0) {
    return (
      <div className=' w-screen h-screen flex flex-col gap-5 items-center justify-center'>
        <div>
          <h1 className='text-2xl md:text-5xl flex items-center gap-2 text-warning'>
            No Products Yet{" "}
            <span>
              <MdOutlineRemoveShoppingCart />
            </span>
          </h1>
        </div>
        <NavLink className=' btn btn-accent animate-bounce' to='/products'>
          Add Products
        </NavLink>
      </div>
    );
  }

  return (
    <>
      <div className=' w-full h-screen flex flex-col md:flex-row items-center p-0 md:p-2 z-10'>
        {!isLoading && (
          <>
            <ResponsiveContainer width={"70%"} height='50%'>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis dataKey='stock' />
                <Tooltip />
                <Bar dataKey='stock'>
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`#${Math.floor(Math.random() * 16777215).toString(
                        16
                      )}`}
                    />
                  ))}
                </Bar>
                <LabelList
                  dataKey='name'
                  position='insideTop'
                  fill='white'
                  fontWeight={500}
                  fontSize={20}
                />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
        {!isLoading && (
          <ResponsiveContainer width={"70%"} height='50%'>
            <PieChart>
              <Pie
                data={data}
                dataKey='stock'
                nameKey='name'
                cx='50%'
                cy='50%'
                outerRadius={100}
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`#${Math.floor(Math.random() * 16777215).toString(
                      16
                    )}`}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </>
  );
};

export default DashboardPage;
