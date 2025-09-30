import React, { useState } from "react";

function OtpModal({ isOpen, onClose, onVerify }) {
  const [otp, setOtp] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-11/12 max-w-md p-6 relative">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Modal header */}
        <h2 className="text-2xl font-semibold text-center mb-4">
          Enter OTP
        </h2>
        <p className="text-center text-gray-500 mb-6">
          We have sent a one-time password to your registered number.
        </p>

        {/* OTP input */}
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
          className="w-full text-center border-2 border-gray-300 rounded-xl py-3 text-xl focus:outline-none focus:border-red-700 mb-6"
          placeholder="Enter 6-digit OTP"
        />

        {/* Verify button */}
        <button
          onClick={() => onVerify(otp)}
          className="w-full bg-red-700 text-white py-3 rounded-xl font-semibold hover:bg-red-800 transition-colors"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}

export default OtpModal;
