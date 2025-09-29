import React from 'react'
import { FaKey, FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate()
  return (
    <div className='bg-blue-50'>
    <div className="min-h-screen flex justify-center items-center">
      {/* Form */}
      <form className="px-5 flex flex-col gap-5 w-full max-w-md">
        <div>
            <h1 className='text-3xl font-semibold'>Welcome Back</h1>
            <p className='text-base'>Login to your account</p>
        </div>
        
        {/* Username Input */}
        <div className="flex flex-col gap-2">
          <p className="font-medium">User Name</p>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full py-3 pl-10 pr-3 rounded-md  outline-none"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="flex flex-col gap-2">
           <div className='flex justify-between'> 
          <p className="font-medium">Password</p>
          <a href='/forgot-pass' className="font-base border-b-2 border-gray-300">Forgot Password</a>
          </div>
          <div className="relative">
            <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Enter your password"
              className="w-full py-3 pl-10 pr-3 rounded-md  outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-red-700 text-white py-3 rounded-md transition hover:bg-red-800"
        >
          Login
        </button>


      </form>
    </div>
    <div className='bg-white fixed bottom-0 w-full h-1/4 text-center px-5 pt-5 pb-10'>
          <p>Don't have an account</p>
        <button onClick={()=>navigate('/register')}
          className=" text-black border border-gray-200 py-3 rounded-md transition w-full"
        >
          Register
        </button>
        </div>
    </div>
  )
}

export default Login
