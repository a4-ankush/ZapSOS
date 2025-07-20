import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo/Logo";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = () => {
    axios
      .get("http://localhost:8000/auth/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => setUser(null));
  };

  useEffect(() => {
    fetchUser();

    // Listen for login/signup events
    window.addEventListener("userChanged", fetchUser);

    return () => {
      window.removeEventListener("userChanged", fetchUser);
    };
  }, []);

  const handleLogout = async () => {
    await axios.post(
      "http://localhost:8000/auth/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
    navigate("/login");
    // Optionally, dispatch event to update other components
    window.dispatchEvent(new Event("userChanged"));
  };

  return (
    <div className="px-6">
      <div className="flex justify-between items-center bg-white text-black h-20 mt-8 rounded-2xl">
        <div className="flex ml-6 items-center">
          <Logo />
          <Link
            className="ml-12 font-semibold text-lg hover:bg-slate-300 p-1 px-2 rounded-md"
            to="/"
          >
            Home
          </Link>
          {user && user.role === "admin" ? (
            <Link
              className="ml-12 font-semibold text-lg hover:bg-red-500 hover:text-white p-1 px-2 rounded-md transition-all duration-200 ease-out"
              to="/admin"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              className="ml-12 font-semibold text-lg hover:bg-red-500 hover:text-white p-1 px-2 rounded-md transition-all duration-200 ease-out"
              to="/student"
            >
              Send SOS
            </Link>
          )}
        </div>
        <div className="font-medium flex items-center">
          {user ? (
            <>
              <span className="mr-4 text-black-lg font-semibold">
                {user.name}
              </span>
              <button
                className="mr-6 text-lg bg-black p-3 px-5 text-white rounded-full hover:bg-zinc-60 transition-all duration-300 ease-out shadow-lg hover:scale-105 hover:shadow-2xl"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
