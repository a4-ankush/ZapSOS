import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post(
        "http://localhost:8000/auth/register",
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );
      alert("Signup successful ! You can now login.");
      window.dispatchEvent(new Event("userChanged"));
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Sign failed");
    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="ml-36">
          <Logo />
        </div>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Signup for a new account.
        </h2>
      </div>
      <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="p-4">
          <label
            htmlFor="Name"
            className="block text-sm/6 font-medium text-white"
          >
            Name
          </label>
          <div className="mt-2">
            <input
              id="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block outline w-full rounded-md bg-slate-900 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-blue-800 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
        <div className="p-4">
          <div>
            <label
              htmlFor="Email"
              className="block text-sm/6 font-medium text-white"
            >
              Email address
            </label>
            <div className="text-sm mt-2">
              <input
                id="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block outline w-full rounded-md bg-slate-900 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-blue-800 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
        <div className="p-4">
          <div>
            <label
              htmlFor="Password"
              className="block text-sm/6 font-medium text-white"
            >
              Password
            </label>
            <div className="text-sm mt-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block outline w-full rounded-md bg-slate-900 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-blue-800 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
        <div className=" text-center">
          <p className="text-sm text-gray-500">
            If you are an admin, please{" "}
            <Link to="/contact" className="text-blue-500 hover:underline">
              Contact us
            </Link>
          </p>
        </div>

        <div className="p-4">
          <button
            className="mt-1 flex w-full justify-center rounded-xl bg-white px-3 py-1.5 text-sm/6 font-semibold text-black shadow-xs hover:bg-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSignup}
          >
            Register
          </button>
        </div>
        <div className="px-4">
          <button
            className="  flex w-full justify-center rounded-xl bg-white px-3 py-1.5 text-sm/6 font-semibold text-black shadow-xs hover:bg-gradient-to-r hover:from-red-500 hover:via-yellow-400 hover:via-blue-500 hover:to-green-500 hover:text-white transition-all duration-300"
            onClick={() =>
              (window.location.href = "http://localhost:8000/auth/google")
            }
          >
            <FcGoogle className="mr-2 text-xl " />
            <span className="mr-2">Sign up with Google</span>
          </button>
        </div>
        <div className="p-4 text-center">
          <p className="text-sm text-white">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
