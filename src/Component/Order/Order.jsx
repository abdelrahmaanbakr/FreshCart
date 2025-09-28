import React, { use, useContext, useEffect, useState } from "react";
import { TokenContext } from "../Context/Token.context";
import {jwtDecode}from 'jwt-decode'
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router";

export default function Order() {


  const{token}=useContext(TokenContext)
  const {id}= jwtDecode(token)
  const[orders,setOrder]=useState(null)

 async function getUserOrders(){

    const option={
      url:`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method:'get'
    }
    const{data}= await axios.request(option)
    console.log(data);
    
    setOrder(data)

  }

  useEffect(()=>{
    getUserOrders()
  },[])



  return (

    <>
    
    {orders==null?<Loader/>:    orders.map((order)=>

   
    <div key={order.id} className="border-3 border-gray-500/40 my-10">
      <div className="p-4 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-light">order ID:</h3>
          <h3 className="text-xl font-light">{order.id}</h3>
        </div>
        <div>
          <button className="px-4 mx-3 py-2 bg-red-500 text-lg text-white font-semibold rounded-md">
           {order.isDelivered==false?'UnderDeliry':'Deliverd'}
          </button>
          <button className={`px-4 py-2 ${order.isPaid? `bg-green-500`:`bg-red-500`}  text-lg text-white font-semibold rounded-md`}>
        {order.isPaid==false?'Not Paid':'Paid'}
          </button>
        </div>
      </div>
      

     

      {order.cartItems.map((product)=>
<>

  <div className="grid grid-cols-6 p-6 gap-5 ">
        <div key={product.product.id} className="border-3 space-y-4 border-gray-500/50 rounded-md  ">
          <img
            className="w-full "
            src={product.product.imageCover}
            alt=""
          />
          <div className="space-y-2 p-2">
            <Link to={`/product/${product.product.id}`} >
             <h3 className="text-xl font-semibold line-clamp-1 ">
              product title: {product.product.title}
            </h3>
            </Link>
           
            <h3 className="text-xl font-semibold ">
              product category: {product.product.category.name}
            </h3>
            <h3 className="text-xl font-semibold ">
              product price:{product.price} EGP
            </h3>
            <h3 className="text-xl font-semibold ">
              product Count:{product.count}
            </h3>
          </div>
        </div>
      </div>
      
      
</>
      )}

    <h3 className="text-xl p-4 font-semibold">total price:{order.totalOrderPrice} EGP</h3>
    </div>
    
    )}
    
    </>
  );
}
