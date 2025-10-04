import React, { useState } from "react";
import { FaKey, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import image from "../../assets/d1.png";
import { loginPilot } from "../../api/pilotauthApi"; // ✅ import our API

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginPilot({
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("pilotToken", res.token);
      localStorage.setItem("pilotUser", JSON.stringify(res.pilot));

      navigate("/home");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen pt-24 relative">
      <img
        src={image}
        className="mx-auto absolute opacity-10 w-full"
        alt="background"
      />
      <div className="flex justify-center items-center">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="px-5 flex flex-col gap-5 w-full max-w-md"
        >
          <div>
            <h1 className="text-3xl font-semibold">Welcome Back</h1>
            <p className="text-base">Login to your account</p>
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <p className="font-medium">Email</p>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full py-3 pl-10 pr-3 rounded-md outline-none"
              />
            </div>
          </div>
          
          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="font-medium">Password</p>
              <a
                href="/forgot-pass"
                className="text-sm border-b-2 border-gray-300"
              >
                Forgot Password
              </a>
            </div>
            <div className="relative">
              <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full py-3 pl-10 pr-3 rounded-md outline-none"
              />
            </div>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-red-700 text-white py-3 rounded-md transition hover:bg-red-800 relative z-10 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      {/* Bottom section */}
      <div className="bg-white fixed bottom-0 w-full h-1/4 text-center px-5 pt-5 pb-5">
        <div className="bg-white relative -top-7 mx-auto h-5 w-1/2 rounded-2xl"></div>
        <p>Don't have an account?</p>
        <button
          onClick={() => navigate("/register")}
          className="text-black border border-gray-200 py-3 rounded-md transition w-full"
        >
          Register
        </button>
        <p className="text-sm my-2">Powered by Atelier</p>
      </div>
    </div>
  );
}

export default Login;
