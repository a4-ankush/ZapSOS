import React from "react";
import { Link } from "react-router-dom";

const PagenotFound = () => {
  return (
    <div className="bg-[#1a1a1a] text-white min-h-screen flex items-center justify-center overflow-hidden font-sans relative">
      {/* Background shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="shape shape1 w-[150px] h-[150px] top-[10%] left-[15%]"></div>
        <div className="shape shape2 w-[80px] h-[80px] top-[70%] left-[80%]"></div>
        <div className="shape shape3 w-[50px] h-[50px] top-[40%] left-[50%]"></div>
      </div>

      <div className="text-center z-10 p-4">
        <h1 className="text-[10rem] font-bold leading-none errorCode">404</h1>
        <h2 className="text-4xl font-semibold -mt-8">Oops! Page Not Found</h2>
        <p className="mt-4 text-lg text-gray-400">
          It seems you've taken a wrong turn in the digital universe.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center px-8 py-3 text-lg font-semibold text-black bg-[#ff0057] rounded-full shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PagenotFound;
