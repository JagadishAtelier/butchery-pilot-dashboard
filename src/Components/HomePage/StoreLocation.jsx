import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
// Fix default marker issue
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import { FaMapMarker,FaBox } from 'react-icons/fa';
import BottomNav from '../BottomNav';

const customIcon = new L.Icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

function StoreLocation() {
    const navigate = useNavigate()
    const position = [25.276987, 55.296249];
  return (
    <div>
        <div className='flex justify-between items-center px-3 my-5'>
            <h1 className='text-lg font-semibold'>Go To Store</h1>
            <div className='flex gap-2 items-center'>
                    <div className='bg-blue-50 p-2 rounded-full w-fit' ><FaBox/></div>
                    <p className='text-sm'>#ORD1</p>
                </div>
        </div>
          <div className="px-3">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-[30vh] rounded-xl shadow-md"
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

<div className='px-3 py-5 overflow-hidden mb-24'>

    <div className="flex items-center justify-between w-full gap-2 my-3">
  <FaMapMarker className="text-red-700" />
  <div className="flex-1 border-t border-dotted border-gray-400"></div>

  <p className="text-sm whitespace-nowrap">1km</p>

  <div className="flex-1 border-t border-dotted border-gray-400"></div>

  <FaMapMarker className="text-red-700" />
</div>
    <div className='flex justify-between border-b border-gray-200 pb-3'>
    
    <div className='flex flex-col gap-2'>
        <p className='text-start'>RS Puram</p>
        <p className='text-start'>2nd Street</p>
    </div>
    <div className='flex flex-col gap-2'>
        <p className='text-end'>Near Bus Stand</p>
        <p className='text-end'>Gandhipuram</p>
    </div>
    </div>
    
    <div className='flex gap-2 pt-5'>
        <button className='w-full text-black border border-gray-300 rounded-md bg-white py-2'>View Map</button>
        <button onClick={()=>navigate('/accpted-order')} className='w-full rounded-md text-white bg-red-700 py-2'>Reached</button>
    </div>
    
    </div>
    <BottomNav/>

    </div>
  )
}

export default StoreLocation
