import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";
import { IoMdRefreshCircle } from "react-icons/io";
import { HiBellAlert } from "react-icons/hi2";
import { IoLocation } from "react-icons/io5";
import AlertMap from "./AlertMap";
import { Link } from "react-router-dom";
import { BsStars } from "react-icons/bs";

const AdminDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [users, setUsers] = useState([]);

  const mapRef = useRef(null);

  const handleResolve = async (alertId) => {
    try {
      console.log("Resolving alert with id:", alertId);
      await axios.patch(
        `http://localhost:8000/alerts/${alertId}/resolve`,
        {},
        { withCredentials: true }
      );
      setAlerts((prev) =>
        prev.map((a) =>
          a.alertId === alertId ? { ...a, status: "resolved" } : a
        )
      );
    } catch (err) {
      console.error("Failed to resolve alert", err);
    }
  };

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get("http://localhost:8000/alerts/users", {
          withCredentials: true,
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    }
    fetchUsers();

    async function fetchAlerts() {
      try {
        const res = await axios.get("http://localhost:8000/alerts", {
          withCredentials: true,
        });
        setAlerts(res.data);
        console.log("Fetched alerts:", res.data);
      } catch (err) {
        console.error("Failed to fetch alerts:", err);
        // Optionally, set an error state here
      }
    }
    fetchAlerts();

    //socket.io
    const socket = socketIOClient("http://localhost:8000");
    socket.on("newAlert", (newAlert) => {
      setAlerts((prev) => [newAlert, ...prev]);
      console.log("Received new alert:", newAlert);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-5 gap-4 bg-white p-4 text-black rounded-xl ">
        <div className=" bg-slate-200 p-4 rounded-xl">
          <div>
            <h2 className="text-center text-2xl font-extrabold mb-6 mt-2">
              Admin Dashboard
            </h2>
            <p className="text-center mb-4">
              Welcome, Admin! Here you can manage all SOS alerts.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="flex ml-9 bg-black text-white  px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300"
            >
              Refresh Alerts
              <IoMdRefreshCircle className="text-2xl ml-3" />
            </button>
          </div>

          <div className="bg-white text-center text-xl p-4 rounded-lg mt-4 border  shadow-sm hover:bg-slate-100 transition-all duration-300">
            <div className="text-5xl py-2 font-extrabold">
              {alerts.filter((a) => a.status === "active").length}
            </div>
            <hr />
            active Alerts
          </div>
          <div className="bg-white text-center text-xl p-4 rounded-lg mt-8 border  shadow-sm  hover:bg-slate-100 transition-all duration-300">
            <div className="text-5xl py-2 font-extrabold">
              {alerts.filter((a) => a.status === "resolved").length}
            </div>
            <hr />
            resolved Alerts
          </div>
          <div className="bg-white text-center text-xl p-4 rounded-lg mt-8 border  shadow-sm  hover:bg-slate-100 transition-all duration-300">
            <div className="text-5xl py-2 font-extrabold">{users.length}</div>
            <hr />
            Total Users
          </div>
          <div className="bg-white text-center text-xl p-4 rounded-lg mt-8 border  shadow-sm  hover:bg-slate-100 transition-all duration-300">
            <div className="text-5xl py-2 font-extrabold">{alerts.length}</div>
            <hr />
            Total Alerts
            <br />
            <span style={{ fontSize: "1rem", color: "#555" }}>
              {new Date().toISOString().slice(0, 10)}
            </span>
          </div>
        </div>
        <div className="col-span-4 bg-slate-200 p-4 rounded-xl">
          <div>
            <div className="flex items-center text-center mb-4">
              <h2 className="  text-2xl font-extrabold mt-2 mr-2">
                Active SOS Locations
              </h2>
              <IoLocation className="text-2xl " />
            </div>

            <div
              ref={mapRef}
              className="rounded-2xl overflow-hidden mb-4 border border-gray-300 shadow-sm hover:shadow-lg hover:border-blue-600 transition-all duration-300  "
            >
              <AlertMap alerts={alerts} selectedAlert={selectedAlert} />
            </div>
            <div className="h-full bg-black text-white p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
              <h2 className="text-2xl font-extrabold mb-4">All Alerts</h2>
              <div className="h-80 overflow-y-auto pr-2">
                {" "}
                {/* scrollable container */}
                <ul>
                  {alerts.map((alert) => (
                    <li
                      className="flex justify-between border border-white p-4 px-8 rounded-xl mb-2 hover:bg-slate-900 transition-all duration-300 cursor-pointer hover:hover:border hover:border-indigo-600"
                      key={alert._id}
                    >
                      {" "}
                      <div className="text-xl">
                        Name :
                        <strong> {alert.user?.name || "Unknown user"} </strong>
                        <br />
                        Message :<strong> {alert.message}</strong>
                        <br />
                        Status :&nbsp;&nbsp;&nbsp;
                        <span
                          className={
                            alert.status === "active"
                              ? " text-sm text-red-600 border border-red-600 rounded-full p-1 px-3 hover:bg-red-600 hover:text-white transition-all duration-300"
                              : "text-sm text-slate-200 border border-slate-200 rounded-full p-1 px-3 hover:bg-slate-200 hover:text-white transition-all duration-300"
                          }
                        >
                          {alert.status}
                        </span>
                        <br />
                        <div className="text-sm mt-2 flex transition-all duration-300 rounded-full p-2 w-36 shadow hover:bg-gray-700 ">
                          <BsStars className="text-lg mr-2 text-blue-500" />
                          <Link to="#">
                            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-semibold hover:text-white transition-all duration-300">
                              AI suggestions
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="text-center">
                        {alert.status === "active" && (
                          <button
                            onClick={() => handleResolve(alert._id)}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300 shadow-sm hover:shadow-lg"
                          >
                            Mark as Resolved
                          </button>
                        )}
                        <br />
                        <br />
                        <Link
                          className="text-blue-500 hover:underline p-2"
                          to="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (
                              alert.location &&
                              alert.location.latitude &&
                              alert.location.longitude
                            ) {
                              setSelectedAlert(alert);
                              mapRef.current?.scrollIntoView({
                                behavior: "smooth",
                              });
                            } else {
                              alert("This alert has no location data.");
                            }
                          }}
                        >
                          View Location
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
