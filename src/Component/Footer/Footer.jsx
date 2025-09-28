import React from "react";
import amazonPay from "../../assets/Images/amazon-pay.png";
import masterCard from "../../assets/Images/mastercard.webp";
import payPal from "../../assets/Images/paypal.png";
import american from "../../assets/Images/American-Express-Color.png";
import appleStore from "../../assets/Images/get-apple-store.png";
import googlePlay from "../../assets/Images/get-google-play.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-slate-100  w-full py-8">
        <div className="container space-y-5 ">
          <div>
            <h3 className="text-2xl">Get the FreshCart App</h3>
            <p className="text-md text-slate-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At dolore
              aliquid ipsam esse accusantium tempora!
            </p>
          </div>

          <div className="flex justify-between gap-4 items-center">
            <input
              className="form-control grow"
              type="email"
              placeholder="Email.."
            />
            <button className="btn text-white hover:bg-green-600 cursor-pointer">
              Share App Link
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <h3 className="text-2xl">Payment Partners</h3>
              <img className="w-[80px]" src={amazonPay} alt="" />
              <img className="w-[80px]" src={american} alt="" />
              <img className="w-[80px]" src={payPal} alt="" />
              <img className="w-[80px]" src={masterCard} alt="" />
            </div>
            <div className="flex gap-4 items-center">
              <h3 className="text-2xl">Get Deliveries With FreshCart</h3>
              <img className="w-[80px]" src={appleStore} alt="" />
              <img className="w-[80px]" src={googlePlay} alt="" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
