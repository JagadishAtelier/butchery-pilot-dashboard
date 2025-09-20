import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "../../api/ordersApi";
import { getProductById } from "../../api/productApi";
import { ArrowLeft } from "lucide-react";

function OrderDetailsPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [productsData, setProductsData] = useState({});

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getOrderById(orderId);
        const orderData = res.data.data;
        setOrder(orderData);
  
        // Fetch each product details by productId._id
        const productPromises = orderData.products.map(async (p) => {
          const prodRes = await getProductById(p.productId._id);
          console.log("Fetched Products Data:", prodRes.data);
          return { productId: p.productId._id, data: prodRes.data };
        });
  
        const products = await Promise.all(productPromises);
  
        // Map products by productId._id
        const productsMap = {};
        products.forEach((p) => (productsMap[p.productId] = p.data));
  
        setProductsData(productsMap);
      } catch (err) {
        console.error("Failed to fetch order", err);
      }
    };
  
    fetchOrder();
  }, [orderId]);
  

  if (!order)
    return <div className="p-6 text-center text-gray-500">Loading order details...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10">
      {/* Header & Back */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800 transition"
        >
          <ArrowLeft size={20} /> Back to Orders
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Order #{order.orderId}</h1>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column: Buyer & Payment Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Buyer Info */}
            <div className="bg-white shadow rounded-xl p-6 border-l-4 border-indigo-500 hover:shadow-lg transition">
              <h2 className="font-semibold text-lg mb-3 text-gray-700">Buyer Information</h2>
              <p><span className="font-medium">Name:</span> {order.buyer?.name}</p>
              <p><span className="font-medium">Email:</span> {order.buyer?.email}</p>
              <p><span className="font-medium">Location:</span> {order.location}</p>
              <p><span className="font-medium">Instructions:</span> {order.deliveryInstructions}</p>
            </div>
            {/* Payment Info */}
            <div className="bg-white shadow rounded-xl p-6 border-l-4 border-green-500 hover:shadow-lg transition">
              <h2 className="font-semibold text-lg mb-3 text-gray-700">Payment Information</h2>
              <p><span className="font-medium">Method:</span> {order.paymentMethod}</p>
              <p><span className="font-medium">Status:</span> {order.paymentStatus}</p>
              <p><span className="font-medium">Paid On:</span> {new Date(order.paymentDate).toLocaleString()}</p>
            </div>
          </div>

          {/* Products List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-800 border-b pb-2">Products</h2>
            {order.products.map((p) => {
const productInfo = productsData[p.productId._id];
const imageUrl = productInfo?.images?.[0] || "/placeholder.png";

              return (
                <div
                  key={p._id}
                  className="flex gap-4 items-center bg-white shadow rounded-xl p-4 hover:shadow-xl transition border border-gray-100"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={p.productId?.name}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.src = "/placeholder.png")}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="font-semibold text-gray-800">{p.productId?.name}</h3>
                      <div className="flex gap-4 text-gray-500 mt-1">
                        <span>Weight: {p.weight} g</span>
                        <span>Qty: {p.quantity}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-700">Price: ₹{p.price}</p>
                      <p className="font-bold text-indigo-600 text-lg">
                        Subtotal: ₹{p.price * p.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="sticky top-6">
          <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-indigo-500">
            <h2 className="font-semibold text-lg text-gray-700 mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total</span>
                <span>₹{order.total}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>₹{order.discount}</span>
              </div>
              <div className="flex justify-between font-bold text-indigo-600 text-lg mt-2">
                <span>Final Amount</span>
                <span>₹{order.finalAmount}</span>
              </div>
            </div>
            <div className="mt-6">
              <span className={`px-3 py-1 rounded-full font-medium text-sm
                ${order.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                {order.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;
