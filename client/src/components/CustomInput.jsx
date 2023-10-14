const CustomInput = ({ lable, type, placeholder, name, value, onChange }) => {
  return (
    <div className=' flex items-center space-x-2 mb-5'>
      <label htmlFor={name} className=' text-primary text-3xl uppercase'>
        {lable}
      </label>
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        className='input input-bordered input-primary w-full max-w-xs'
        required
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default CustomInput;
