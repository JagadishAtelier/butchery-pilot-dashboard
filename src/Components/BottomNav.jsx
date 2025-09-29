import React from 'react'
import { FaCheckCircle, FaHome, FaList, FaNotesMedical, FaTruck, FaWallet } from 'react-icons/fa'

function BottomNav() {
  return (
    <div className='flex gap-3 bg-white fixed bottom-0 justify-between w-full py-2 px-5'>
      <div className='flex flex-col gap-1 items-center text-gray-800'>
        <FaHome/>
        <p className='text-sm'>Home</p>
      </div>
      <div className='flex flex-col gap-1 items-center text-gray-800'>
        <FaList/>
        <p className='text-sm'>Order</p>
      </div>
      <div className='flex flex-col gap-1 items-center text-gray-800'>
        <FaTruck/>
        <p className='text-sm'>OnGoing</p>
      </div>
      <div className='flex flex-col gap-1 items-center text-gray-800'>
        <FaCheckCircle/>
        <p className='text-sm'>Delivered</p>
      </div>
      <div className='flex flex-col gap-1 items-center text-gray-800'>
        <FaWallet/>
        <p className='text-sm'>Wallet</p>
      </div>
    </div>
  )
}

export default BottomNav
