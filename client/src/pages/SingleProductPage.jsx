import { useParams } from "react-router-dom";
import { DeleteProduct, EditProduct } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../redux/features/productSlice";
import { useEffect } from "react";

const SingleProductPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { data, isLoading } = useSelector(
    (state) => state.product.singelProduct
  );

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch]);

  return (
    <main className=' h-screen p-5'>
      {!isLoading && (
        <div className=' flex flex-col lg:flex-row bg-base-100 shadow-xl mt-5'>
          <figure className=' lg:w-1/3'>
            <img src={data.image && data.image?.url} alt={data.image} />
          </figure>
          <div className='card-body'>
            <h2 className='card-title'>{data.name}</h2>
            <div className=' flex items-center flex-wrap gap-2'>
              <button className='btn'>
                Stock
                <div className='badge badge-secondary'>{data.stock}</div>
              </button>
              <button className='btn'>
                Price
                <div className='badge badge-warning'>₹ {data.price}</div>
              </button>
              <button className='btn'>
                Category
                <div className='badge badge-warning'>{data.category}</div>
              </button>
            </div>
            <div className='card-actions justify-end'>
              <EditProduct item={data} id={id} isLoading={isLoading} />
              <DeleteProduct id={id} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default SingleProductPage;
