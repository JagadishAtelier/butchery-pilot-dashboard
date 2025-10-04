import React from "react";
import image from "../assets/d1.png"; // make sure it's a transparent PNG
import { useNavigate } from "react-router-dom";
import logo from '../assets/images/logo.svg'
function LoginPage() {
  const navigate = useNavigate()
  return (
    <div className="lg:hidden md:hidden  relative h-screen flex justify-center items-center bg-gray-100 pb-5">
      <div
        className="absolute bottom-0 left-0 w-full h-1/2 bg-red-700 z-0
                   [clip-path:polygon(0_40%,100%_0,100%_100%,0%_100%)]"
      ></div>
      <div className="relative z-10 text-center">
        <img src={logo} className="mx-auto mb-5 h-40 w-40 aspect-square" />
        <img src={image} alt="Delivery" className="mx-auto h-[50vh] mb-5" />
        <h1 className="text-white text-2xl font-bold">Welcome to Delivery</h1>
        <p className="text-white text-base w-3/4 mx-auto mt-5">
          Manage your delivery partners on your finger tips.
        </p>

        <button onClick={() => navigate("/login")} className="bg-white text-black py-2 px-20 border-0 mt-5 rounded-2xl">Continue</button>
      </div>
    </div>
  );
}

export default LoginPage;
