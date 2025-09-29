import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import { FaBook, FaBox, FaChartBar, FaChevronRight, FaLocationArrow, FaMapMarked, FaMapMarker, FaPhone } from 'react-icons/fa';
import BottomNav from '../BottomNav';

const customIcon = new L.Icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

function TakeOrder() {
    const position = [25.276987, 55.296249];

  return (
    <div>
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
    <div className="flex justify-between my-5">
        <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">2.8 mile</p>
            <h1 className="text-sm ">distance</h1>
        </div>
        <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">2:23 min</p>
            <h1 className="text-sm ">Time left</h1>
        </div>
        <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">9:44 AM</p>
            <h1 className="text-sm">Arrival</h1>
        </div>
    </div>

    <div className="flex items-center justify-between w-full gap-2 my-5">
  <FaBox className="text-red-700" />
  <div className="flex-1 border-2 border-gray-200"></div>

<FaChevronRight/>

  <div className="flex-1 border-2 border-red-700"></div>

  <FaMapMarker className="text-red-700" />
</div>


<div className='flex justify-between items-center border-b border-gray-200 pb-5 my-5'>
                <div className='flex gap-2 items-center'>
                    <div className='bg-blue-50 p-2 rounded-full w-fit' ><FaBox/></div>
                    <p className='text-sm'>#ORD1</p>
                </div>
                <button onClick={()=>navigate('/accpted-order')} className='border border-gray-200 bg-red-700 text-white py-1 px-5 rounded-3xl'>10AM - 13AM</button>
    </div>

<div className='flex justify-between items-center'>
    <div className='flex flex-col gap-2 items-start'>
        <p className='text-sm mb-0'>Customer</p>
        <h1 className='text-base font-semibold'>Holden</h1>
    </div>
    <div className='p-3 rounded-full bg-red-700'><FaBook className='text-white'/></div>
</div>


<div className='flex justify-between items-center my-5'>
    <div className='flex flex-col gap-2 items-start'>
        <p className='text-sm mb-0'>Delivery Address</p>
        <div className='flex gap-2 items-center'><FaMapMarker/><h1 className='text-base font-semibold'>1234,Royal Ln,Mesa</h1></div>
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

    <div className="flex mt-5 gap-2">
        <button className="border border-gray-300 w-full py-3 rounded-3xl">Chat with support</button>
        <button className="bg-red-700 text-white rounded-full p-4">
            <FaPhone/>
        </button>
    </div>

    <div className="flex mt-5 mb-24 relative">
    <button className="bg-red-700 text-white rounded-full p-4 flex absolute top-0 z-10">
            <FaChevronRight/>
            <FaChevronRight/>

        </button>
        <button className="bg-black w-full py-3 rounded-3xl text-white">Slide to confirm delivery</button>
    </div>


    </div>
<BottomNav/>
    </div>
  )
}

export default TakeOrder
