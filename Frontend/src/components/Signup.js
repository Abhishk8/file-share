import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/signup`,
        formData
      );
      console.log(res);
      if (res && res.data) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.response?.data?.err);
      toast.error(error.response?.data?.err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
