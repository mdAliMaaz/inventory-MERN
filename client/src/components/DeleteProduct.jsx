import { deleteProduct } from "../redux/features/productSlice";
import { useDispatch } from "react-redux";

const DeleteProduct = ({ id }) => {
  const dispatch = useDispatch();

  const handelDelete = () => {
    dispatch(deleteProduct(id));
  };

  return (
    <div>
      <button
        className='btn btn-error text-white'
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        Delete
      </button>
      <dialog id='my_modal_4' className='modal'>
        <div className='modal-box w-11/12 max-w-5xl'>
          <h3 className='font-bold text-lg'>
            You sure you wana delete this Product ?
          </h3>
          <div className='modal-action'>
            <form method='dialog'>
              <button className='btn btn-secondary'>Close</button>
            </form>
            <button
              onClick={handelDelete}
              className=' btn btn-error text-white'
            >
              Delete
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DeleteProduct;
