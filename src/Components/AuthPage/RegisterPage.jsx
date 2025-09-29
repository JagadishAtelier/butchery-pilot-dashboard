import React, { useState } from "react";
import { FaBicycle, FaBiking, FaCar, FaChevronLeft, FaIdCard, FaUpload } from "react-icons/fa";
import BottomNav from "../BottomNav";

function RegisterPage() {
  const [fileName, setFileName] = useState("");
  const [vehicle, setVehicle] = useState("bike");

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen">
      {/* Header */}
      <div className="bg-white flex justify-between items-center px-5 py-3 border-b border-gray-200">
        <div className="flex gap-2 items-center">
          <FaChevronLeft className="text-gray-600 cursor-pointer" />
          <h1 className="text-lg font-medium">Register</h1>
        </div>
        <p className="text-base cursor-pointer">Cancel</p>
      </div>

      {/* Form */}
      <form className="px-5 flex flex-col gap-5 py-5">
        {/* Name Input */}
        <div className="flex flex-col gap-2">
          <p className=" font-medium">Your Name</p>
          <input
            type="text"
            placeholder="Enter your name"
            className="py-3 ps-5 rounded-md border-0 outline-none"
          />
        </div>

        {/* File Upload */}
        <div className="flex flex-col gap-2">
          <p className=" font-medium">Your Driving License</p>

          <label
            htmlFor="license"
            className="flex items-center gap-3 border-0 bg-white
                       p-3 rounded-md cursor-pointer transition"
          >
            <FaIdCard className="text-blue-600 text-lg" />
            {fileName ? (
              <span className="text-gray-700">{fileName}</span>
            ) : (
              <span className="text-gray-500 flex items-center gap-2">
                <FaUpload /> Upload License
              </span>
            )}
          </label>

          <input
            type="file"
            id="license"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

 {/* Vehicle Input */}
 <div className="flex flex-col gap-2">
          <p className="font-medium">Select Your Vehicle</p>
          <div className="flex justify-between gap-2">
                        {/* Bike */}
                        <label
              className={`w-full ps-5 py-5 flex flex-col gap-2 relative rounded-md cursor-pointer border 
              ${vehicle === "bike" ? "bg-red-700 text-white border-red-700" : "bg-white text-gray-700 border-0"}`}
            >
              <FaBiking />
              <p className="text-sm">Bike</p>
              <input
                type="radio"
                name="vehicle"
                value="bike"
                checked={vehicle === "bike"}
                onChange={(e) => setVehicle(e.target.value)}
                className="absolute top-5 right-5  accent-red-700"
              />
            </label>
            {/* Car */}
            <label
              className={`w-full ps-5 py-5 flex flex-col gap-2 relative rounded-md cursor-pointer border 
              ${vehicle === "car" ? "bg-red-700 text-white border-red-700" : "bg-white text-gray-700 border-0"}`}
            >
              <FaCar />
              <p className="text-sm">Car</p>
              <input
                type="radio"
                name="vehicle"
                value="car"
                checked={vehicle === "car"}
                onChange={(e) => setVehicle(e.target.value)}
                className="absolute top-5 right-5 accent-red-700"
              />
            </label>

            {/* Bicycle */}
            <label
              className={`w-full ps-5 py-5 flex flex-col gap-2 relative rounded-md cursor-pointer border 
              ${vehicle === "bicycle" ? "bg-red-700 text-white border-red-700" : "bg-white text-gray-700 border-0"}`}
            >
              <FaBicycle />
              <p className="text-sm">Bi-Cycle</p>
              <input
                type="radio"
                name="vehicle"
                value="bicycle"
                checked={vehicle === "bicycle"}
                onChange={(e) => setVehicle(e.target.value)}
                className="absolute top-5 right-5 accent-red-700"
              />
            </label>
          </div>
        </div>

                {/* Vehicle Input */}
        <div className="flex flex-col gap-2">
          <p className=" font-medium">Vehicle Number</p>
          <input
            type="text"
            placeholder="Enter Vehicle Number"
            className="py-3 ps-5 rounded-md border-0 outline-none"
          />
        </div>
      </form>

      <div className='bg-white fixed bottom-0 w-full h-1/4 text-center px-5 pt-5 pb-10'>
      <div className='bg-white relative -top-7 mx-auto h-5 w-1/2 rounded-2xl'></div>
        <button onClick={()=>navigate('/register')}
          className=" bg-red-700 text-white py-3 rounded-md transition w-full"
        >
          Register
        </button>
        </div>
    {/* <BottomNav/> */}
    </div>
  );
}

export default RegisterPage;
