import React,{useState} from 'react'
import { FaBox, FaGift, FaMapMarker } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
const assignedData = [
    { orderId : "ORD1" ,
    orderedTime : "5min ago",
    km : "1km",
    pickupAdd : "346,AI Nandha-2,Dubai",
    deliveryAdd : "346,AI Nandha-2,Dubai",
    payment : "100"      
},
    { orderId : "ORD2" ,
    orderedTime : "5min ago",
    km : "1km",
    pickupAdd : "346,AI Nandha-2,Dubai",
    deliveryAdd : "346,AI Nandha-2,Dubai",
    payment : "100"      
},
    { orderId : "ORD3" ,
    orderedTime : "5min ago",
    km : "1km",
    pickupAdd : "346,AI Nandha-2,Dubai",
    deliveryAdd : "346,AI Nandha-2,Dubai",
    payment : "100"      
},
]
const pendingData = [
    {
      orderId: "ORD4",
      orderedTime: "15min ago",
      km: "3km",
      pickupAdd: "101, Al Barsha, Dubai",
      deliveryAdd: "202, JLT, Dubai",
      payment: "150"
    },
    {
      orderId: "ORD5",
      orderedTime: "20min ago",
      km: "5km",
      pickupAdd: "303, Downtown, Dubai",
      deliveryAdd: "404, Creek Harbour, Dubai",
      payment: "250"
    },
  ]
  
  const completedData = [
    {
      orderId: "ORD6",
      orderedTime: "30min ago",
      km: "4km",
      pickupAdd: "505, Business Bay, Dubai",
      deliveryAdd: "606, Deira, Dubai",
      payment: "300"
    },
    {
      orderId: "ORD7",
      orderedTime: "45min ago",
      km: "6km",
      pickupAdd: "707, Dubai Hills, Dubai",
      deliveryAdd: "808, Arabian Ranches, Dubai",
      payment: "350"
    },
  ]
  
  const draftData = [
    {
      orderId: "ORD8",
      orderedTime: "Saved 1hr ago",
      km: "2km",
      pickupAdd: "909, Karama, Dubai",
      deliveryAdd: "1010, Satwa, Dubai",
      payment: "120"
    },
    {
      orderId: "ORD9",
      orderedTime: "Saved 2hr ago",
      km: "8km",
      pickupAdd: "1111, Al Nahda, Dubai",
      deliveryAdd: "1212, Sharjah Border, Dubai",
      payment: "500"
    },
  ]
function TaskManagement() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("Assigned")

    const tabs = {
        Assigned: assignedData,
        Pending: pendingData,
        Completed: completedData,
        Draft: draftData
      }
  return (
    <div>
      {/* Tabs */}
      <div className="flex my-5 mx-2 justify-between bg-blue-50 rounded-3xl">
        {Object.keys(tabs).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 text-sm ${
              activeTab === tab
                ? "bg-red-700 text-white rounded-3xl py-2"
                : "bg-transparent"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className='mb-24'>
        {tabs[activeTab].map((order) => (
          <div
            key={order.orderId}
            className={`bg-blue-50 mx-2 p-3 mb-3 rounded shadow-sm`}
          >
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <div className='bg-white p-2 rounded-full w-fit' ><FaBox/></div>
                    <p className='text-sm'>{order.orderId}</p>
                </div>
                <p className='text-sm'>{order.orderedTime}</p>
            </div>

            <div className="flex items-center justify-between w-full gap-2 my-3">
  <FaMapMarker className="text-red-700" />
  <div className="flex-1 border-t border-dotted border-gray-400"></div>

  <p className="text-sm whitespace-nowrap">{order.km}</p>

  <div className="flex-1 border-t border-dotted border-gray-400"></div>

  <FaMapMarker className="text-red-700" />
</div>

<div className='flex justify-between border-b border-gray-200 pb-3'>
    <p className='text-start w-1/4'>{order.pickupAdd}</p>
    <p className='text-end w-1/4'>{order.deliveryAdd}</p>
    </div>
<div className='flex justify-between border-b border-gray-200 pb-3 mt-3'>
    <p className='text-start'>Payment-Cash</p>
    <p className='text-end'>{order.payment}</p>
    </div>
<div className='flex justify-between mt-3'>
    <button className='border border-gray-200 bg-white py-1 px-5 rounded-3xl'>skip</button>
    <button onClick={()=>navigate('/order-details')} className='border border-gray-200 bg-red-700 text-white py-1 px-5 rounded-3xl'>Accept order</button>
    </div>


          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskManagement
