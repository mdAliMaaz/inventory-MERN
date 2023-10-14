import { useDispatch, useSelector } from "react-redux";
import { getSales, deleteSales } from "../redux/features/salesSlice";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { AddSales, Loading } from "../components";
import { logout } from "../redux/features/authSlice";

const SalesPage = () => {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state) => state.sales.allSales);

  useEffect(() => {
    dispatch(getSales());
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!data) {
    return (
      <div className=' flex items-center flex-col justify-center h-screen w-screen '>
        <h1 className=' lg:text-4xl capitalize'>Login again Token not found</h1>
        <button
          className=' m-5 btn btn-warning animate-bounce'
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className=' w-full h-full p-2'>
      {!isLoading && (
        <>
          <div className=' flex items-center justify-end p-2'>
            <AddSales />
          </div>
          <div className='overflow-x-auto'>
            <table className='table'>
              <thead className=' bg-primary text-white'>
                <tr>
                  <th>customer Name</th>
                  <th>customer Number</th>
                  <th>Total Amount</th>
                  <th>Payment Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr className='hover' key={crypto.randomUUID()}>
                    <th>{item.cName}</th>
                    <td>{item.cPhNumber}</td>
                    <td className=' font-mono'>₹ {item.totalPrice}</td>
                    <td
                      className={
                        item.paymentStatus === "pendding"
                          ? "badge badge-error badge-sm"
                          : "badge badge-success badge-sm"
                      }
                    >
                      {item.paymentStatus}
                    </td>
                    <td>
                      <div className=' flex items-center gap-4'>
                        <NavLink to={item._id}>
                          <AiOutlineEdit className=' text-xl text-primary' />
                        </NavLink>
                        <button onClick={() => dispatch(deleteSales(item._id))}>
                          <AiFillDelete className=' text-xl text-error hover:text-white' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default SalesPage;
