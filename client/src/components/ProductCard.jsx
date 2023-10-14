import { BiSolidEdit } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const ProductCard = ({ item }) => {
  return (
    <div className='card w-full bg-base-100 shadow-xl'>
      <figure>
        <img src={item.image.url} alt={item.name} />
      </figure>
      <div className='card-body'>
        <h2 className='card-title capitalize'>{item.name}</h2>
        <div className='card-actions justify-end'>
          <div className='badge badge-secondary font-semibold font-mono text-lg'>
            ₹ {item.price}
          </div>
          <div className='text-white font-semibold badge badge-warning'>
            Stock: {item.stock}
          </div>
          <div className='text-white font-semibold badge badge-info'>
            Category: {item.category}
          </div>
          <span className=' btn btn-error btn-outline btn-sm my-3 text-white'>
            <NavLink to={`${item._id}`} className={" flex items-center gap-1"}>
              Edit
              <BiSolidEdit />
            </NavLink>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
