import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { CartContext } from "../Context/Cart.context";
import { TokenContext } from "../Context/Token.context";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
  const { cartInfo } = useContext(CartContext);
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);

 async function makeOnlineOrder(values) {
    const test = {
      shippingAddress: values,
    };
    const ayhaga = toast.loading("loading...");

    try {
       const option = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=http://localhost:5173`,
      method: "post",
       data: test,
        headers: {
          token,
        },

    };
    const { data } = await axios.request(option);
      toast.success("online order created");

      location.replace(data.session.url)


    } catch (error) {
      console.log(error)
    }finally {
      toast.dismiss(ayhaga);
    }
   

  }

  async function makeCashOrder(values) {
    const test = {
      shippingAddress: values,
    };
    const ayhaga = toast.loading("loading...");
    try {
      const option = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
        method: "post",
        data: test,
        headers: {
          token,
        },
      };
      const { data } = await axios.request(option);
      console.log(data);
      toast.success("cash order created");
      setTimeout(() => {
        navigate("/allOrder");
      }, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(ayhaga);
    }
  }

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: (values) => {
      if (payment == "cash") {
        makeCashOrder(values);
      } else {
        makeOnlineOrder(values);
      }
    },
  });

  return (
    <div className=" mb-10">
      <h2 className="text-2xl font-semibold py-5">Fill Your Details</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className=" form-control">
          <label htmlFor="">City</label>
          <input
            className=" w-full rounded-md bg-slate-100 px-6 py-3 "
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            type="text"
          />
        </div>
        <div className=" form-control">
          <label htmlFor="">Phone</label>
          <input
            className=" w-full rounded-md bg-slate-100 px-6 py-3 "
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            type="text"
          />
        </div>
        <div className=" form-control">
          <label htmlFor="">Details</label>
          <input
            className=" w-full rounded-md bg-slate-100 px-6 py-3 "
            name="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            type="text"
          />
        </div>

        <div className="my-4 space-x-4">
          <button
            onClick={() => {
              setPayment("cash");
            }}
            type="submit"
            className="bg-blue-600 text-white text-xl px-4 py-2 rounded-md "
          >
            Create Cash Order
          </button>
          <button
            onClick={() => {
              setPayment("online");
            }}
            type="submit"
            className="bg-main text-white text-xl px-4 py-2 rounded-md"
          >
            Create Online Order
          </button>
        </div>
      </form>
    </div>
  );
}
