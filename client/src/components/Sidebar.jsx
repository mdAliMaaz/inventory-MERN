import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../redux/features/authSlice";

const Sidebar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  return (
    <>
      <div className=' drawer z-50  w-[50%]'>
        <input id='my-drawer' type='checkbox' className='drawer-toggle' />
        <div className=' drawer-content  space-x-2'>
          <label
            htmlFor='my-drawer'
            className='btn btn-primary btn-sm btn-circle  drawer-button'
          >
            <FaBars />
          </label>
          <span className=' text-2xl uppercase font-semibold py-2'>
            EpicEdge
          </span>
        </div>
        <div className='drawer-side'>
          <label
            htmlFor='my-drawer'
            aria-label='close sidebar'
            className='drawer-overlay'
          ></label>
          <ul className='menu p-4 w-52 md:w-80 min-h-full bg-base-200 text-base-content'>
            <li onClick={() => navigate("/dashboard")}>
              <a>Dashboard</a>
            </li>
            <li onClick={() => navigate("/products")}>
              <a>Products</a>
            </li>
            <li onClick={() => navigate("/sales")}>
              <a>Sales</a>
            </li>
            <li
              className=' btn btn-error btn-sm  text-white'
              onClick={() => dispatch(logout())}
            >
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
