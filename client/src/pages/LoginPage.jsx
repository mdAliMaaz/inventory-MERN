import { NavLink } from "react-router-dom";
import { CustomInput } from "../components";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/features/authSlice";

const LoginPage = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(input));
  };

  return (
    <div className=' w-screen h-screen flex items-center justify-center p-3'>
      <div className=' lg:w-1/2 flex items-center justify-center flex-col shadow-lg rounded-sm'>
        <h1 className=' text-5xl font-bold my-5'>Login</h1>
        <form autoComplete='off' onSubmit={handleSubmit}>
          <CustomInput
            name={"email"}
            lable={<AiOutlineMail />}
            placeholder={"Your email"}
            type={"email"}
            onChange={handleChange}
            value={input.email}
          />
          <CustomInput
            name={"password"}
            lable={<AiFillLock />}
            placeholder={"Your passsword"}
            type={"password"}
            onChange={handleChange}
            value={input.password}
          />
          <div className=' w-full flex items-center justify-center'>
            <button className=' btn btn-primary btn-md w-1/2  ' type='submit'>
              {" "}
              Save
              {isLoading && <span className='loading loading-spinner'></span>}
            </button>
          </div>
          <div className=' flex w-full justify-center my-5'>
            <NavLink to={"/register"}>
              Does'nt have an account ?{" "}
              <span className=' btn-link'>Click Here</span>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
