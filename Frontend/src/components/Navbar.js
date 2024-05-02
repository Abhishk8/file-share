import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Navbar() {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    // Clear auth context
    setAuth(null);
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 bg-gray-800 text-white p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="text-xl font-bold">
          File Sharing App
        </Link>
      </div>
      <div className="flex space-x-4">
        {auth?.user ? (
          <>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/upload" className="hover:underline">
              Upload
            </Link>
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
