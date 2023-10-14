import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../redux/features/productSlice";

import { addSales } from "../redux/features/salesSlice";

const AddSales = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.product.products);
  const [input, setInput] = useState({
    cName: "",
    cPhNumber: "",
    totalPrice: "",
    product: "",
    quantity: "",
  });

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSales(input));
  };
  return (
    <div className='z-50'>
      <button
        onClick={() => document.getElementById("my_modal_3").showModal()}
        className='btn btn-secondary btn-sm'
      >
        Add sales
      </button>
      <dialog id='my_modal_3' className='modal'>
        <div className='modal-box'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>
          <form
            onSubmit={handleSubmit}
            autoComplete='off'
            className=' flex flex-col items-start '
          >
            <input
              type='text'
              placeholder='Customer name'
              className='input input-bordered input-sm w-full max-w-xs mb-2'
              name='cName'
              required
              onChange={handleChange}
              value={input.cName}
            />
            <input
              type='text'
              placeholder='Customer number'
              className='input input-bordered input-sm w-full max-w-xs mb-2'
              name='cPhNumber'
              required
              onChange={handleChange}
              value={input.cPhNumber}
            />
            <input
              type='number'
              placeholder='Total price'
              className='input input-bordered input-sm w-full max-w-xs mb-2'
              name='totalPrice'
              required
              onChange={handleChange}
              value={input.totalPrice}
            />
            <select
              onChange={handleChange}
              defaultValue={""}
              name='product'
              className='select select-bordered select-sm w-full max-w-xs mb-2'
            >
              <option value={""}>Products</option>
              {!isLoading &&
                data.map((item) => (
                  <option key={crypto.randomUUID()} value={item._id}>
                    {item.name}
                  </option>
                ))}
            </select>
            <input
              type='number'
              placeholder='Quantity'
              className='input input-bordered input-sm w-full max-w-xs mb-2'
              name='quantity'
              required
              onChange={handleChange}
              value={input.quantity}
            />
            <button
              type='submit'
              className=' btn btn-sm text-white btn-success'
            >
              Save
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddSales;
