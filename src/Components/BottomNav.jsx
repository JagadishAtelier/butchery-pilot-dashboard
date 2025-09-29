import React from 'react'
import { FaBox, FaCheckCircle, FaHome, FaList, FaNotesMedical, FaPlus, FaTruck, FaUser, FaWallet } from 'react-icons/fa'

function BottomNav() {
  return (
    <div className='flex gap-3 bg-white fixed bottom-0 justify-around w-full py-5 px-5'>
      <div className='flex flex-col gap-1 items-center text-gray-800'>
        <FaBox/>
      </div>
      <div className='flex flex-col gap-1 items-center text-white bg-red-700 rounded-full p-3 absolute -top-5'>
        <FaPlus/>
      </div>
      <div className='flex flex-col gap-1 items-center text-gray-800'>
        <FaUser/>
      </div>
    </div>
  )
}

export default BottomNav
