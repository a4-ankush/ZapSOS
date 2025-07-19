import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="px-11">
      <div className="flex justify-between items-center bg-white text-black  h-20 mt-4  rounded-2xl">
        <div className=" flex ml-24 items-center ">
          <h1 className="text-2xl">ZapSOS</h1>
          <Link className="ml-12 font-medium-" to="/">
            Home
          </Link>
        </div>
        <div className="font-medium">
          <Link className="mr-28" to="/login">
            login
          </Link>
          <Link className="mr-28" to="/signup">
            signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
