import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSales, updateSales } from "../redux/features/salesSlice";
import { FaRegUser, FaRegMoneyBill1 } from "react-icons/fa6";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { AiOutlineCrown } from "react-icons/ai";

import { Loading } from "../components";

const SalesDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { data, isLoading } = useSelector((state) => state.sales.salesDetails);

  console.log(data);
  useEffect(() => {
    dispatch(getSingleSales(id));
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  const handleClick = () => {
    dispatch(updateSales(id));
  };

  return (
    <>
      <h1 className=' text-right p-5 text-xl'>
        <span className=' badge badge-accent badge-lg'>Data:</span>{" "}
        {String(data?.createdAt).split("T")[0]}
      </h1>
      <div className=' w-screen h-screen flex-col md:flex-row flex items-center gap-10 justify-center md:justify-evenly'>
        {/* left */}
        <div className=' md:w-1/2 p-4'>
          <div className=' flex gap-2 flex-col md:flex-row '>
            <div className=' md:w-1/2 '>
              <img src={data.product?.image?.url} />
            </div>
            <div>
              <ul>
                <li className=' text-xl font-semibold '>
                  Product: {data.product?.name}
                </li>
                <li className=' text-xl font-semibold font-mono text-green-500'>
                  Price: ₹{data.product?.price}
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* right */}
        <div className=' flex flex-col gap-4 text-lg lg:text-2xl p-2'>
          <h1 className=' capitalize flex items-center gap-2'>
            <FaRegUser className=' text-primary' />
            customer Name:
            <span className=' mx-2'>{data?.cName}</span>
          </h1>
          <h1 className=' capitalize flex items-center gap-2'>
            <BsFillTelephoneOutboundFill className=' text-primary' />
            phNumber:
            <span className=' mx-2'>{data?.cPhNumber}</span>
          </h1>
          <h1 className=' capitalize flex items-center gap-2'>
            <FaRegMoneyBill1 className=' text-primary' />
            Total Price:
            <span className=' mx-2 font-mono badge badge-warning '>
              ₹ {data?.totalPrice}
            </span>
          </h1>
          <h1 className=' capitalize flex items-center gap-2'>
            <AiOutlineCrown className=' text-primary' />
            Payment Status:
            <span
              className={
                data?.paymentStatus === "paid"
                  ? "badge badge-success"
                  : "badge badge-error"
              }
            >
              {data?.paymentStatus}
            </span>
          </h1>
          <h1 className=' capitalize flex items-center gap-2'>
            <AiOutlineCrown className=' text-primary' />
            Purchased quantity:
            <span className=' font-mono text-accent'>
              {data?.quantity}
              {"/-"}
            </span>
          </h1>
          {data?.paymentStatus === "pendding" && (
            <div className=' flex w-full items-center justify-end'>
              <button
                onClick={handleClick}
                className=' btn btn-warning text-white'
              >
                Update
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SalesDetails;
