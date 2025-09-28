import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons"; // ✅ الاستيراد الصح
import React, { useContext, useEffect, useState } from "react";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { CartContext } from "../Context/Cart.context";
import {  Link } from "react-router-dom";
import { TokenContext } from "../Context/Token.context";
import axios from "axios";


export default function Card({props}) {
  const{token}=useContext(TokenContext)

  const{addToCart}=useContext(CartContext)

    const{title,price,id, description,imageCover,ratingsAverage,category}=props

    
  const[isFavour, setFavour]=useState(false)
  // const[wishList,setWishList]=useState(null)


  function toggleHeart(){
     if(isFavour){
    removeFromWhishList(id)
  } else {
    addToWhishList(id)
  }
  }

  async function addToWhishList(productId){
     const option={
      url:'https://ecommerce.routemisr.com/api/v1/wishlist',
      method:'post',
      headers:{
        token,

      },
      data:{productId}
     }
     const {data}= await axios.request(option)
     setFavour(true)
    //  setWishList(data)
  }



async function removeFromWhishList(productId){
  const option = {
    url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    method: 'delete',
    headers: { token },
  }
  const { data } = await axios.request(option)
  console.log("Removed from wishlist:", data)
  setFavour(false)
}


 
  return (
    <div>
      <div className="card bg-white shadow-lg group">
        <div className="card-img relative">
          <img
            src={imageCover}
            alt=""
          />
          <div className="absolute flex justify-center items-center gap-2 inset-0 bg-gray-500/40 group-hover:opacity-100  opacity-0 transition-all ">
           <Heart onClick={toggleHeart}  className={` ${isFavour?'text-red-500 fill-red-500 bg-white':null} w-8 h-8 text-white  rounded-full bg-main p-1 hover:text-main hover:bg-white cursor-pointer transition-all`} />
            
            <ShoppingCart onClick={()=>{addToCart(id)}} className="w-8 text-white h-8 rounded-full bg-main p-1 hover:text-main hover:bg-white cursor-pointer transition-all" />
            <Link to={`/productDetails/${id}`}><Eye onClick={()=>{}} className="w-8 h-8 text-white rounded-full bg-main p-1 hover:text-main hover:bg-white cursor-pointer transition-all" /></Link>
          </div>
        </div>

        <div className="card-body p-4 space-y-4">
          <div>
            <h2 className="text-xl font-semibold line-clamp-2">{title}</h2>
            <h3 className="text-lg line-2 font-semibold text-main">{category.name}</h3>
          </div>

          <p className="text-slate-500 line-clamp-2">
           {description}
          </p>
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">{price}</h3>
            <h3 className="font-semibold text-lg flex items-center gap-1">
              <FontAwesomeIcon className="text-yellow-500" icon={faStar} /> {ratingsAverage}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
