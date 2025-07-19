import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-8 mt-12 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Name */}
        <div>
          <h2 className="text-white text-2xl font-semibold">ZapSOS</h2>
          <p className="text-sm mt-2">Real-Time Emergency Response System</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg mb-3">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="/features" className="hover:text-white">
                Features
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-lg mb-3">Contact</h3>
          <p className="text-sm">📍 Jaipur, India</p>
          <p className="text-sm">📧 support@zapsos.com</p>
          <p className="text-sm">📞 +91 12345 67890</p>
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
