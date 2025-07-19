import React from "react";
import { Link } from "react-router-dom";

const PagenotFound = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-7xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">
        Page Not Found
      </h2>
      <p className="text-center text-gray-400 mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-red-600 hover:bg-red-700 transition rounded-md text-white font-medium"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default PagenotFound;
