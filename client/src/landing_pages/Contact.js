import React from "react";

const Contact = () => {
  return (
    <div className=" flex flex-col items-center py-12 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 mt-10 max-w-md w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Want to sign up as <span className="text-purple-600">Admin</span>?
        </h2>
        <p className="text-center text-gray-500 mb-3">
          Please contact to developer:
        </p>
        <a
          href="mailto:work.ankushkajla@gmail.com"
          className="text-blue-600 font-medium hover:underline"
        >
          work.ankushkajla@gmail.com
        </a>
      </div>
    </div>
  );
};

export default Contact;
