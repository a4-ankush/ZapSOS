import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-8 mt-12 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-white text-2xl font-semibold">ZapSOS</h2>
          <p className="text-sm mt-2">
            Real-Time AI-Powered Emergency Response System
          </p>
        </div>

        <div>
          <h3 className="text-white text-lg mb-3">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <br />
            <li>
              <Link to="/student" className="hover:text-white">
                Student
              </Link>
            </li>
            <br />
            <li>
              <Link to="/admin" className="hover:text-white">
                Admin
              </Link>
            </li>
            <br />
            <li>
              <Link to="/zapai" className="hover:text-white">
                ZapAI Chat
              </Link>
            </li>
            <br />
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg mb-3">Contact</h3>
          <p className="text-sm">Jaipur, India</p>
          <br />
          <p className="text-sm">support@zapsos.com</p>
          <br />
          <p className="text-sm">+91 12345 67890</p>
        </div>
      </div>

      <hr className="my-6 border-gray-600" />
      <div className="text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} ZapSOS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
