import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Home() {
  return (
    <div className="min-h-screen ">
      <Navbar />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
