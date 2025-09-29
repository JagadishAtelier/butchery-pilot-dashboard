import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
// Fix default marker issue
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import { FaBox, FaPhone, FaWhatsapp } from "react-icons/fa";
import BottomNav from "../BottomNav";

const customIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function ViewOrderDetails() {
    const navigate = useNavigate()
  const position = [25.276987, 55.296249];

  return (
    <div className="">
    <div className="">
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
    <div className="px-2 pt-5">
        <h1 className="text-2xl font-semibold mb-3">Order Details</h1>
    <div className='flex justify-between items-center border-b border-gray-200 pb-5'>
                <div className='flex gap-2 items-center'>
                    <div className='bg-blue-50 p-2 rounded-full w-fit' ><FaBox/></div>
                    <p className='text-sm'>#ORD1</p>
                </div>
                <button onClick={()=>navigate('/accpted-order')} className='border border-gray-200 bg-red-700 text-white py-1 px-5 rounded-3xl'>Accept order</button>
    </div>

    <div className="flex justify-between my-5">
        <div className="flex flex-col gap-2">
            <p className="text-sm">Shipped by : </p>
            <h1 className="text-sm font-semibold mb-3">My Name</h1>
        </div>
        <div className="flex flex-col gap-2">
            <p className="text-sm">Order Cost</p>
            <h1 className="text-sm font-semibold mb-3">₹ 250</h1>
        </div>
        <div className="flex flex-col gap-2">
            <p className="text-sm">Ordered</p>
            <h1 className="text-sm font-semibold mb-3">29/09/2025</h1>
        </div>
    </div>

    <div className="bg-blue-50 py-3 px-5 rounded-2xl flex flex-col gap-2 mb-5">
        <div className="flex ">
            <p className="w-full">Quantity</p>
            <p className="w-full font-semibold">1</p>
        </div>
        <div className="flex ">
            <p className="w-full">Weight</p>
            <p className="w-full font-semibold">2kg</p>
        </div>
        <div className="flex ">
            <p className="w-full">Order Cost</p>
            <p className="w-full font-semibold">₹ 250</p>
        </div>
        <div className="flex ">
            <p className="w-full">Payment Method</p>
            <p className="w-full font-semibold">Card</p>
        </div>
        <div className="flex ">
            <p className="w-full">Status</p>
            <p className="w-full font-semibold">Paid</p>
        </div>
    </div>

    <div className="flex mt-5 gap-2 mb-24">
        <button className="border border-gray-300 w-full py-3 rounded-3xl">Chat with support</button>
        <button className="border border-gray-300 rounded-full p-4">
            <FaPhone/>
        </button>
    </div>


    </div>
    <BottomNav/>
    </div>
  );
}

export default ViewOrderDetails;
