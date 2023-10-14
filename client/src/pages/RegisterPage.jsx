import { AiOutlineUser, AiOutlineMail, AiFillLock } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CustomInput } from "../components";
import RImage from "../assets/register.svg";
import ProfileImage from "../assets/Profile.png";
import { register } from "../redux/features/authSlice";

const RegisterPage = () => {
  const [input, setInput] = useState({ name: "", email: "", password: "" });

  const [imagePreview, setImagePreview] = useState("");

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleImages = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("image", imagePreview);
    dispatch(register(formData));
  };
  return (
    <main className=' w-screen '>
      <h1 className=' text-center py-2 text-5xl capitalize my-10 font-bold '>
        Register
      </h1>
      <div className=' h-full flex flex-col md:flex-row items-center  md:space-x-10  justify-center p-4'>
        {/* left side */}
        <div className='hidden md:block md:w-1/2 lg:w-1/3'>
          <img src={RImage} alt='register' className=' w-full' />
        </div>
        {/* right side */}
        <div className=' shadow-lg p-3 rounded-sm'>
          <form autoComplete='off' onSubmit={handleSubmit}>
            <div className=' flex items-center justify-center space-x-2 mb-5'>
              <label htmlFor='image'>
                <img
                  src={imagePreview || ProfileImage}
                  alt='profile'
                  className=' w-20 h-20 rounded-full object-cover'
                />
              </label>
              <input
                className=' hidden'
                type='file'
                name='image'
                id='image'
                accept='image/*'
                onChange={handleImages}
              />
            </div>
            <CustomInput
              name={"name"}
              lable={<AiOutlineUser />}
              placeholder={"Your name"}
              type={"text"}
              onChange={handleChange}
              value={input.name}
            />
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
              <NavLink to={"/login"}>
                Already have an account ?{" "}
                <span className=' btn-link'>Click Here</span>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
