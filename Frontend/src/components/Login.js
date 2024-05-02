import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";

function Login() {
  const [auth, setAuth] = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/signin`,
        formData
      );
      if (res && res.data.success) {
        console.log(res.data);

        localStorage.setItem("auth", JSON.stringify(res.data));
        setAuth({ ...auth, user: res.data.user, token: res.data.accessToken });
        toast.success(res.data && res.data.message);

        navigate("/dashboard");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
