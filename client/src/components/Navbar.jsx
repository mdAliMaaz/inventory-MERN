import { VscGithub } from "react-icons/vsc";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='navbar bg-base-100'>
      <div className='flex-1'>
        <NavLink to={"/"} className='btn btn-ghost normal-case text-xl'>
          EpicEdge
        </NavLink>
      </div>
      <div className=' flex gap-2 items-center'>
        <NavLink to={"/register"} className=' btn btn-link'>
          Register
        </NavLink>
        <button className='btn btn-sm btn-primary'>
          <NavLink to={"/login"}>Login</NavLink>
        </button>
        <a href='#' className=' text-2xl mx-3'>
          <VscGithub />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
