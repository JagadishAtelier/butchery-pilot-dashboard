import React from 'react'
import { FaBell, FaSearch } from 'react-icons/fa'
import TaskManagement from './TaskManagement'
import BottomNav from '../BottomNav'

function Home() {
  return (
    <div className='md:hidden lg:hidden'>
      <div className='bg-black mx-3 text-white p-5 rounded-lg flex flex-col gap-4'>
        <div className='bg-gray-600 p-2 rounded-full w-fit ms-auto'><FaBell/></div>
        <h1 className='text-3xl font-semibold'>My Shipments</h1>
        <div className="flex flex-col gap-2">
          <div className="relative ">
            <FaSearch className=" absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
            <input
              type="text"
              placeholder="Search Shipment"
              className=" w-full py-2 pl-10 pr-3 rounded-3xl  outline-none bg-gray-600 text-white"
            />
          </div>
        </div>
      </div>
      <TaskManagement/>
      <BottomNav/>
    </div>
  )
}

export default Home
