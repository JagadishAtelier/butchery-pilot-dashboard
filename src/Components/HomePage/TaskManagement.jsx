import React, { useEffect, useState } from 'react';
import { FaBox, FaMapMarker } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  getUnclaimedOrders,
  getPilotHistory,
  getOrdersByUser,
  claimOrder,
  updateOrderStatus,
} from '../../api/ordersApi';

function TaskManagement({ search = '' }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Order');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('pilotToken') : null;
  const pilotUser = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('pilotUser') || 'null') : null;
  const userId = pilotUser?.id || pilotUser?._id || null;

  const tabs = ['Order', 'Accept Order', 'Completed', 'Draft'];

  const loadData = async (tab) => {
    setLoading(true);
    setError('');
    try {
      if (tab === 'Order') {
        const res = await getUnclaimedOrders(token);
        setOrders(res.data ?? []);
      } else if (tab === 'Accept Order') {
        const res = await getPilotHistory(token);
        setOrders((res.data ?? []).filter((o) => o.status === 'claimed'));
      } else if (tab === 'Completed') {
        const res = await getPilotHistory(token);
        setOrders((res.data ?? []).filter((o) => o.status === 'delivered'));
      } else if (tab === 'Draft') {
        if (!userId) setOrders([]);
        else {
          const res = await getOrdersByUser(userId, token);
          setOrders((res.data ?? []).filter((o) => o.status === 'draft' || o.status === 'saved'));
        }
      }
    } catch (err) {
      console.error('Load orders error:', err);
      setError(err?.message || 'Failed to load orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(activeTab);
  }, [activeTab]);

  const handleAccept = async (order) => {
    setError('');
    if (!token) return setError('You must be logged in as a pilot to accept orders.');
    const orderId = order._id || order.id || order.orderId;
    try {
      setActionLoadingId(orderId);
      const res = await claimOrder(orderId, token);
      await loadData(activeTab);
      const claimedOrderId = res.data?._id || order._id || order.id || order.orderId;
      navigate(`/order-details/${claimedOrderId}`);
    } catch (err) {
      console.error('Claim error:', err);
      setError(err?.message || 'Failed to claim order');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handlePickup = async (order) => {
    setError('');
    if (!token) return setError('You must be logged in as a pilot to pickup orders.');
    const orderId = order._id || order.id || order.orderId;
    try {
      setActionLoadingId(orderId);
      const res = await updateOrderStatus(orderId, { status: 'picked_up' }, token);
      await loadData(activeTab);
      const updatedId = res.data?._id || order._id || order.id;
      navigate(`/order-details/${updatedId}`);
    } catch (err) {
      console.error('Pickup error:', err);
      setError(err?.message || 'Failed to update order status');
    } finally {
      setActionLoadingId(null);
    }
  };

  // Filter orders based on search
  const filtered = orders.filter((order) => {
    if (!search) return true;
    const q = search.toLowerCase();
    const orderId = (order.orderId || order._id || '').toString().toLowerCase();
    const defaultAddr = order.buyer?.addresses?.find(a => a.isDefault);
    const pickup = defaultAddr ? `${defaultAddr.street}, ${defaultAddr.city}, ${defaultAddr.state}` : '';
    return orderId.includes(q) || pickup.toLowerCase().includes(q);
  });

  // Default store address (left side)
  const storeAddress = 'Irachi Kadai, Coimbatore';

  return (
    <div>
      {/* Tabs */}
      <div className="flex my-5 mx-3 justify-between bg-blue-50 rounded-3xl">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 text-sm ${activeTab === tab ? 'bg-red-700 text-white rounded-3xl py-2' : 'bg-transparent'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading && <p className="mx-3 text-sm text-gray-500">Loading...</p>}
      {error && <p className="mx-3 text-sm text-red-600">{error}</p>}

      <div className="mb-24">
        {filtered.length === 0 && !loading && <p className="mx-3 text-sm text-gray-500">No orders to show.</p>}

        {filtered.map((order) => {
          const orderId = order.orderId || order._id || order.id || '—';
          const orderedTime = order.createdAt ? new Date(order.createdAt).toLocaleString() : '';
          const km = order.km || (order.distance ? `${order.distance}km` : '—');

          // default buyer address
          const defaultAddr = order.buyer?.addresses?.find(a => a.isDefault);
          const buyerAddress = defaultAddr
            ? `${defaultAddr.street}, ${defaultAddr.city}, ${defaultAddr.state} - ${defaultAddr.pincode}`
            : '—';

          const buyerInfo = {
            name: order.buyerDetails?.name || '—',
            phone: order.buyerDetails?.phone || '—',
            email: order.buyerDetails?.email || '—',
          };

          const payment = order.finalAmount ?? order.total ?? order.payment ?? '—';

          const isOrderTab = activeTab === 'Order';
          const isAcceptTab = activeTab === 'Accept Order';

          return (
            <div key={orderId} className="bg-blue-50 mx-3 p-3 mb-3 rounded shadow-sm">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="bg-white p-2 rounded-full w-fit">
                    <FaBox />
                  </div>
                  <p className="text-sm">{orderId}</p>
                </div>
                <p className="text-sm">{orderedTime}</p>
              </div>

              <div className="flex items-center justify-between w-full gap-2 my-3">
                <FaMapMarker className="text-red-700" />
                <div className="flex-1 border-t border-dotted border-gray-400" />
                <p className="text-sm whitespace-nowrap">{km}</p>
                <div className="flex-1 border-t border-dotted border-gray-400" />
                <FaMapMarker className="text-red-700" />
              </div>

              {/* Mobile view: left store address, right buyer info */}
              <div className="flex justify-between border-b border-gray-200 pb-3">
                {/* Left: Store address */}
                <div className="w-1/2 text-sm text-start">
                  <p className="font-semibold">{storeAddress}</p>
                </div>

                {/* Right: Buyer info */}
                <div className="w-1/2 text-sm text-justify pl-3">
                  <p className="font-semibold">{buyerInfo.name}</p>
                  {/* <p>{buyerInfo.email}</p> */}
                  {/* <p>{buyerInfo.phone}</p> */}
                  <p>{buyerAddress}</p>
                </div>
              </div>



              <div className="flex justify-between border-b border-gray-200 pb-3 mt-3">
                <p className="text-start text-sm">Payment-Cash</p>
                <p className="text-end text-sm">{payment}</p>
              </div>

              <div className="flex justify-between mt-3">
                <button className="border border-gray-200 bg-white py-1 px-5 rounded-3xl">skip</button>

                {isOrderTab && (
                  <button
                    onClick={() => handleAccept(order)}
                    className="border border-gray-200 bg-red-700 text-white py-1 px-5 rounded-3xl"
                    disabled={actionLoadingId === (order._id || order.id || order.orderId)}
                  >
                    {actionLoadingId === (order._id || order.id || order.orderId) ? 'Accepting...' : 'Accept order'}
                  </button>
                )}

                {isAcceptTab && (
                  <button
                    onClick={() => handlePickup(order)}
                    className="border border-gray-200 bg-red-700 text-white py-1 px-5 rounded-3xl"
                    disabled={actionLoadingId === (order._id || order.id || order.orderId)}
                  >
                    {actionLoadingId === (order._id || order.id || order.orderId) ? 'Updating...' : 'Pickup Order'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TaskManagement;
