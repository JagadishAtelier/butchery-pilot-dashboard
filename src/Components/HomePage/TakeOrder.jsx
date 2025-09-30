import React, { useState,useRef  } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import { 
  FaBook, FaBox, FaChevronRight, 
  FaMapMarker, FaPhone 
} from 'react-icons/fa';
import BottomNav from '../BottomNav';
import SlideToConfirm from './SlideToConfirm';
import OtpModal from './OtpModal';
import { useNavigate } from 'react-router-dom';
const customIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function TakeOrder() {
  const navigate = useNavigate()
  const [orderPicked, setOrderPicked] = useState(false); 
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const position = [25.276987, 55.296249];

  const handleOtpVerify = (otp) => {
    console.log("OTP entered:", otp);
    setShowOtpModal(false);
    alert("OTP Verified!");
    navigate('/home')
  };

  return (
    <div>
      {/* Top Header */}
      <div className='flex justify-between items-center px-3 my-5'>
        <h1 className='text-lg font-semibold'>Pickup Order</h1>
        <div className='flex gap-2 items-center'>
          <div className='bg-blue-50 p-2 rounded-full w-fit'><FaBox/></div>
          <p className='text-sm'>#ORD1</p>
        </div>
      </div>

      {/* Map is always visible */}
      <div className="px-3">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          className="w-full h-[50vh] rounded-xl shadow-md"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={customIcon}>
            <Popup>Delivery Location</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Below the map — changes depending on orderPicked */}
      <div className="px-3 pt-5">
        {!orderPicked ? (
          // Step 1: Before picking
          <>
            <p className='text-base mb-3'>Click the button to start your delivery</p>
            <button 
              className='w-full bg-red-700 py-2 rounded-md text-white mb-5'
              onClick={() => setOrderPicked(true)}
            >
              Order Picked
            </button>
          </>
        ) : (
          // Step 2: After picking
          <>
            {/* Distance / Time / Arrival */}
            <div className="flex justify-between my-5">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">2.8 mile</p>
                <h1 className="text-sm">Distance</h1>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">2:23 min</p>
                <h1 className="text-sm">Time left</h1>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">9:44 AM</p>
                <h1 className="text-sm">Arrival</h1>
              </div>
            </div>

            {/* Progress bar */}
            <div className="flex items-center justify-between w-full gap-2 my-5">
              <FaBox className="text-red-700" />
              <div className="flex-1 border-2 border-gray-200"></div>
              <FaChevronRight/>
              <div className="flex-1 border-2 border-red-700"></div>
              <FaMapMarker className="text-red-700" />
            </div>

            {/* Order Info */}
            <div className='flex justify-between items-center border-b border-gray-200 pb-5 my-5'>
              <div className='flex gap-2 items-center'>
                <div className='bg-blue-50 p-2 rounded-full w-fit'><FaBox/></div>
                <p className='text-sm'>#ORD1</p>
              </div>
              <button className='border border-gray-200 bg-red-700 text-white py-1 px-5 rounded-3xl'>10AM - 13AM</button>
            </div>

            {/* Customer Info */}
            <div className='flex justify-between items-center'>
              <div className='flex flex-col gap-2 items-start'>
                <p className='text-sm mb-0'>Customer</p>
                <h1 className='text-base font-semibold'>Holden</h1>
              </div>
              <div className='p-3 rounded-full bg-red-700'><FaBook className='text-white'/></div>
            </div>

            {/* Delivery Address */}
            <div className='flex justify-between items-center my-5'>
              <div className='flex flex-col gap-2 items-start'>
                <p className='text-sm mb-0'>Delivery Address</p>
                <div className='flex gap-2 items-center'><FaMapMarker/><h1 className='text-base font-semibold'>1234, Royal Ln, Mesa</h1></div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-blue-50 py-3 px-5 rounded-2xl flex flex-col gap-2 mb-5">
              <div className="flex "><p className="w-full">Quantity</p><p className="w-full font-semibold">1</p></div>
              <div className="flex "><p className="w-full">Weight</p><p className="w-full font-semibold">2kg</p></div>
              <div className="flex "><p className="w-full">Order Cost</p><p className="w-full font-semibold">₹ 250</p></div>
              <div className="flex "><p className="w-full">Payment Method</p><p className="w-full font-semibold">Card</p></div>
              <div className="flex "><p className="w-full">Status</p><p className="w-full font-semibold">Paid</p></div>
            </div>

            {/* Support / Call */}
            <div className="flex mt-5 gap-2">
              <button className="border border-gray-300 w-full py-3 rounded-3xl">Chat with support</button>
              <button className="bg-red-700 text-white rounded-full p-4"><FaPhone/></button>
            </div>

          <SlideToConfirm onConfirm={() => setShowOtpModal(true)} />
          <OtpModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onVerify={handleOtpVerify}
      />
          </>
        )}
      </div>
      <BottomNav/>
    </div>
  )
}

export default TakeOrder
