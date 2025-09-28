import axios from "axios";
import { Star } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { CartContext } from "../Context/Cart.context";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";


export default function ProductDetails() {
 const{addToCart}=   useContext(CartContext)
  const [productDetails, setProductDetails] = useState(null);

  const { id } = useParams();

  async function getProductDetails() {
    const loading= toast.loading("loading..")
    try {
         const option = {
      url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      method: "get",
    };
    const { data } = await axios.request(option);
    setProductDetails(data.data);

  }
  catch (error) {
        console.log(error)
    }finally{
        toast.dismiss(loading)
    }
    } 
   

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <>
    {productDetails==null?<Loader/>:<div className="grid grid-cols-12 py-10 gap-8">
        <div className="col-span-4">
          <img
            className="w-full"
            src={productDetails.imageCover}
            alt=""
          />
        </div>
        <div className="col-span-8 py-5 space-y-5">
          <div>
            <h2 className="text-3xl font-semibold">{productDetails.title}</h2>
            <h3 className="text-xl font-semibold text-main">
             {productDetails.category.name}
            </h3>
          </div>

          <p className="text-2xl">
           {productDetails.description}
          </p>
          <div className="flex justify-between items-center">
            <h4 className="text-xl">{productDetails.price} EGP</h4>
            <div className="flex gap-2 items-center">
              <h4>
                {productDetails.ratingsAverage}
              </h4>
              <span>{" "}
                <Star className="text-amber-300 " /></span>
            </div>
          </div>
          <button onClick={()=>{addToCart(id)}} className="btn cursor-pointer bg-main w-full text-white text-xl">
            add to cart
          </button>
        </div>
      </div> }
    </>
  );
}
