import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../Logo/Logo.js";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      const user = res.data.user;

      localStorage.setItem("role", user?.role);

      if (user?.role === "admin") {
        window.dispatchEvent(new Event("userChanged"));
        navigate("/admin");
      } else if (user?.role) {
        window.dispatchEvent(new Event("userChanged"));
        navigate("/student");
      } else {
        alert("User role not found in response.");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "login failed");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="ml-36">
          <Logo />
        </div>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Login to your account
        </h2>
      </div>
      <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="p-4">
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-white"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block outline w-full rounded-md bg-slate-900 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-blue-800 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
        <div className="p-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-white"
            >
              Password
            </label>
            <div className="text-sm mt-2">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block outline w-full rounded-md bg-slate-900 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-blue-800 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        </div>

        <div className="p-4 ">
          <button
            className="mt-1 flex w-full justify-center rounded-xl bg-white px-3 py-1.5 text-sm/6 font-semibold text-black shadow-xs hover:bg-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <p className="text-center mb-1">Or</p>
        <div className="px-4">
          <button
            className="  flex w-full justify-center rounded-xl bg-white px-3 py-1.5 text-sm/6 font-semibold text-black shadow-xs hover:bg-gradient-to-r hover:from-red-500 hover:via-yellow-400 hover:via-blue-500 hover:to-green-500 hover:text-white transition-all duration-300"
            onClick={() =>
              (window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`)
            }
          >
            <FcGoogle className="mr-2 text-xl " />
            <span className="mr-2">Login with Google</span>
          </button>
        </div>
        <div className="p-4 text-center">
          <p className="text-sm/6 text-white">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
