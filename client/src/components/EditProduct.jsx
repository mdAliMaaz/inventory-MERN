import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProduct } from "../redux/features/productSlice";
import Loading from "./Loading";

const EditProduct = ({ item, id, isLoading }) => {
  const [input, setInput] = useState({
    name: item.name,
    price: item.price,
    stock: item.stock,
    category: item.category,
  });

  const [imagePreview, setImagePreview] = useState();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
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

    if (!imagePreview) {
      formData.append("name", input.name);
      formData.append("price", input.price);
      formData.append("category", input.category);
      formData.append("stock", input.stock);
    } else {
      formData.append("name", input.name);
      formData.append("price", input.price);
      formData.append("category", input.category);
      formData.append("stock", input.stock);
      formData.append("image", imagePreview);
    }

    dispatch(updateProduct({ id, formData }));
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <button
        className='btn btn-accent'
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Update
      </button>
      <dialog id='my_modal_3' className='modal'>
        <div className='modal-box'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>
          <form onSubmit={handleSubmit}>
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
              placeholder='Product stock'
              className='input input-bordered input-sm w-full max-w-xs mb-2'
              onChange={handleChange}
              value={input.stock}
              name='stock'
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
              type='file'
              className='file-input file-input-bordered file-input-error w-full max-w-xs'
              name='image'
              onChange={handleImage}
              accept='image/*'
            />
            <button type='submit' className=' btn btn-primary mt-3 mx-2'>
              {isLoading && (
                <span className='loading loading-spinner loading-sm'></span>
              )}
              Update
            </button>
          </form>
          <div className=' w-1/3 p-2 m-3'>
            <img src={!imagePreview ? item.image?.url : imagePreview} />
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EditProduct;
