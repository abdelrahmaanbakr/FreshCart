import axios from "axios";
import { createContext, useContext, useState } from "react";
import { TokenContext } from "./Token.context";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const { token } = useContext(TokenContext);
  const [cartInfo, setCartInfo] = useState(null);

  async function addToCart(productId) {
    const loading = toast.loading("loading..");
    try {
      const option = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "post",
        data: { productId },
        headers: { token },
      };

      const { data } = await axios.request(option);
      if (data.status == "success") {
        toast.success(data.message);
      }
      console.log("Cart Response:", data);
      displayToCart();
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Error adding to cart");
    } finally {
      toast.dismiss(loading);
    }
  }

  async function displayToCart() {
    const option = {
      url: "https://ecommerce.routemisr.com/api/v1/cart",
      method: "get",
      headers: {
        token,
      },
    };
    const { data } = await axios.request(option);
    setCartInfo(data);
  }

  async function deleteItem(itemId) {
    const loading = toast.loading("loading..");

    try {
      const option = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${itemId}`,
        method: "delete",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(option);

      setCartInfo(data);
      toast.success("item removed successfully");
    } catch (error) {
      toast.error("error..");
    } finally {
      toast.dismiss(loading);
    }
  }

  async function clearAllCart() {
    const option = {
      url: "https://ecommerce.routemisr.com/api/v1/cart",
      method: "delete",
      headers: {
        token,
      },
    };
    const { data } = await axios.request(option);
    console.log(data);
    setCartInfo({
      numOfCartItems: 0,
    });
  }

 async function updateCount(productID,count){
  const loading= toast.loading('loading..')
  try {
     const option={
      url:`https://ecommerce.routemisr.com/api/v1/cart/${productID}`,
      method:'put',
      data:{
        count,
      },
      headers:{
        token,
      }
    }
    const{data}= await axios.request(option)
    setCartInfo(data)
    toast.success('Count Updated')
  } catch (error) {
    toast.error('Error Updata')
  }finally{
    toast.dismiss(loading)
  }
   
  }

  return (
    <CartContext.Provider
      value={{ addToCart, displayToCart, cartInfo, deleteItem, clearAllCart , updateCount }}
    >
      {children}
    </CartContext.Provider>
  );
}
