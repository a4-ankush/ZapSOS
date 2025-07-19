import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo/Logo";

const Navbar = () => {
  return (
    <div className="px-6">
      <div className="flex justify-between items-center bg-white text-black  h-20 mt-8  rounded-2xl">
        <div className=" flex ml-6 items-center ">
          <Logo />
          <Link
            className="ml-12 font-semibold text-lg hover:bg-slate-300 p-1 px-2 rounded-md"
            to="/"
          >
            Home
          </Link>
          <Link
            className="ml-12 font-semibold text-lg hover:bg-slate-300 p-1 px-2 rounded-md"
            to="/student"
          >
            Send SOS
          </Link>
        </div>
        <div className="font-medium">
          <Link
            className="mr-6 text-lg bg-black p-3 px-5 text-white rounded-full hover:bg-zinc-60 transition-all duration-300 ease-out shadow-lg hover:scale-105 hover:shadow-2xl"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="mr-10 text-lg bg-black p-3 px-5 text-white rounded-full hover:bg-zinc-60 transition-all duration-300 ease-out shadow-lg hover:scale-105 hover:shadow-2xl"
            to="/signup"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
