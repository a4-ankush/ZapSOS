import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="mt-3">
      <Link to="/">
        <h1 className="text-5xl leading-7 font-extrabold ">Zap</h1>
        <span className="text-red-600 ">SOS</span>
        <i class="fa-solid fa-tower-broadcast text-sm ml-1 text-red-600"></i>
      </Link>
    </div>
  );
};

export default Logo;
