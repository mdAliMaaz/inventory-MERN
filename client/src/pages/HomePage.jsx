import { NavLink } from "react-router-dom";
import { Navbar } from "../components";

const HomePage = () => {
  return (
    <div className=' w-screen h-screens '>
      <Navbar />
      <div>
        <div className=' mt-14 flex items-center justify-center flex-col gap-8 p-3'>
          <h1 className=' text-center capitalize font-bold text-5xl lg:text-9xl bg-gradient-to-r from-green-600  via-yellow-500 to-indigo-400 inline-block text-transparent bg-clip-text'>
            inventory and stock management
          </h1>
          <p className=' lg:text-2xl'>
            Simple solution you need for managing your stocks and sales
          </p>
        </div>
        <div className=' flex items-center justify-center mt-5 animate-bounce'>
          <NavLink to={"/login"} className={"btn btn-primary"}>
            Get Started
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
