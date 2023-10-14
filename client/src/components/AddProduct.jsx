import { useState } from "react";
import { addProduct } from "../redux/features/productSlice";
import { useDispatch } from "react-redux";

const AddProduct = () => {
  const [input, setInput] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const dispatch = useDispatch();

  const handleImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("category", input.category);
    formData.append("price", input.price);
    formData.append("stock", input.stock);
    formData.append("image", imagePreview);
    dispatch(addProduct(formData));
  };

  return (
    <div
      onClick={() => document.getElementById("my_modal_3").showModal()}
      className=' absolute lg:top-10 lg:right-10 top-3 right-3 z-50'
    >
      <button
        onClick={() => document.getElementById("my_modal_3").showModal()}
        className='btn btn-secondary btn-sm'
      >
        Add Products
      </button>
      <dialog id='my_modal_3' className='modal'>
        <div className='modal-box'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>
          <form autoComplete='off' onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Product name'
              className='input input-bordered input-sm w-full max-w-xs mb-2'
              onChange={handleChange}
              value={input.name}
              name='name'
              required
            />
            <input
              type='text'
              placeholder='Product category'
              className='input input-bordered input-sm w-full max-w-xs mb-2'
              onChange={handleChange}
              value={input.category}
              name='category'
              required
            />
            <input
              type='number'
              placeholder='Product price'
              className='input input-bordered input-sm w-full max-w-xs mb-2'
              onChange={handleChange}
              value={input.price}
              name='price'
              required
            />
            <input
              type='number'
              placeholder='Product quantity'
              className='input input-bordered input-sm w-full max-w-xs mb-2'
              onChange={handleChange}
              value={input.stock}
              name='stock'
              required
            />
            <div>
              <label className=' btn btn-primary btn-sm' htmlFor='image'>
                Choose File
              </label>
              <input
                type='file'
                id='image'
                placeholder='Product quantity'
                className='hidden'
                onChange={handleImage}
                name='image'
                required
                accept='image/*'
              />
            </div>

            <button
              type='submit'
              className='mt-5 btn btn-sm text-white btn-success'
            >
              Save
            </button>
          </form>
          {imagePreview && (
            <div className=' w-32 h-32 p-3'>
              <img src={imagePreview} className=' w-full' />
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default AddProduct;
