import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";
import { IoMdRefreshCircle } from "react-icons/io";

import { IoLocation } from "react-icons/io5";
import AlertMap from "./AlertMap";
import { Link } from "react-router-dom";
import { BsStars } from "react-icons/bs";

const AdminDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [users, setUsers] = useState([]);
  const [aiSuggestions, setAISuggestions] = useState({});
  const [openSuggestionId, setOpenSuggestionId] = useState(null);
  const [alertFilter, setAlertFilter] = useState("all");

  const mapRef = useRef(null);

  const handleResolve = async (alertId) => {
    try {
      console.log("Resolving alert with id:", alertId);
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/alerts/${alertId}/resolve`,
        {},
        { withCredentials: true }
      );
      setAlerts((prev) =>
        prev.map((a) => (a._id === alertId ? { ...a, status: "resolved" } : a))
      );
      console.log("Reloading window...");
      window.location.reload();
    } catch (err) {
      console.error("Failed to resolve alert", err);
    }
  };

  const fetchAISuggestions = async (alertId) => {
    setOpenSuggestionId(alertId);
    setAISuggestions((prev) => ({ ...prev, [alertId]: "Loading..." }));
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/alerts/${alertId}/ai-suggestions`,
        {},
        { withCredentials: true }
      );
      setAISuggestions((prev) => ({
        ...prev,
        [alertId]: res.data.suggestions,
      }));
    } catch (err) {
      setAISuggestions((prev) => ({
        ...prev,
        [alertId]: "Failed to get suggestions.",
      }));
    }
  };

  const closeAISuggestions = (alertId) => {
    setOpenSuggestionId(null);
  };

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/alerts/users`,
          {
            withCredentials: true,
          }
        );
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    }
    fetchUsers();

    async function fetchAlerts() {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/alerts`, {
          withCredentials: true,
        });
        setAlerts(res.data);
        console.log("Fetched alerts:", res.data);
      } catch (err) {
        console.error("Failed to fetch alerts:", err);
      }
    }
    fetchAlerts();

    //socket.io
    const socket = socketIOClient(process.env.REACT_APP_API_URL);
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

          <div className="bg-white text-center text-xl p-4 rounded-lg mt-8 border  shadow-sm  hover:bg-slate-100 transition-all duration-300">
            <div className="text-5xl py-2 font-extrabold">
              <p className="text-sm font-bold mb-2">Introducing</p>
              <div className="flex items-center justify-center mb-2 ml-4 fade-in">
                <h2 className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient-x ">
                  ZapAI
                </h2>{" "}
                <BsStars className="text-2xl ml-2 mb-6 text-purple-500" />
              </div>
            </div>
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
        <div className="second-col col-span-4 bg-slate-200 p-4 rounded-xl">
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
            <div
              className="
             bg-black text-white p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <h2 className="relative text-2xl  mb-4 flex items-center justify-between ">
                <span className="font-extrabold">All Alerts</span>{" "}
                <span className="absolute left-24 text-sm ml-2 mt-1 font-normal ">
                  - Powered by{" "}
                  <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient-x font-bold">
                    ZapAI
                  </span>
                </span>
                <span className="ml-6 flex gap-2">
                  <button
                    className={`px-3 text-sm  rounded ${
                      alertFilter === "all"
                        ? "bg-black border border-white text-white"
                        : "bg-gray-200 text-black"
                    }`}
                    onClick={() => setAlertFilter("all")}
                  >
                    All
                  </button>
                  <button
                    className={`px-3   text-sm rounded ${
                      alertFilter === "active"
                        ? "bg-black border border-white text-white"
                        : "bg-gray-200 text-black"
                    }`}
                    onClick={() => setAlertFilter("active")}
                  >
                    Active
                  </button>
                  <button
                    className={`px-3   text-sm rounded ${
                      alertFilter === "resolved"
                        ? "bg-black border border-white text-white"
                        : "bg-gray-200 text-black"
                    }`}
                    onClick={() => setAlertFilter("resolved")}
                  >
                    Resolved
                  </button>
                </span>
              </h2>
              <div className="h-80 overflow-y-auto pr-2">
                {" "}
                <ul>
                  {alerts.filter((alert) =>
                    alertFilter === "all" ? true : alert.status === alertFilter
                  ).length === 0 ? (
                    <li className="text-center text-gray-400 py-10">
                      {alertFilter === "active"
                        ? "There is no active alert."
                        : alertFilter === "resolved"
                        ? "There is no resolved alert."
                        : "No alerts found."}
                    </li>
                  ) : (
                    alerts
                      .filter((alert) =>
                        alertFilter === "all"
                          ? true
                          : alert.status === alertFilter
                      )
                      .map((alert) => (
                        <li
                          className="flex justify-between border border-white p-4 px-8 rounded-xl mb-2 hover:bg-slate-900 transition-all duration-300 cursor-pointer hover:hover:border hover:border-indigo-600"
                          key={alert._id}
                        >
                          {" "}
                          <div className="text-xl">
                            Name : {alert.user?.name || "Unknown user"}
                            <br />
                            <span className="text-red-500">Message </span> :
                            &nbsp;
                            {alert.message}
                            <br />
                            Contact : {alert.user?.email};
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
                              <button
                                onClick={() =>
                                  openSuggestionId === alert._id
                                    ? closeAISuggestions(alert._id)
                                    : fetchAISuggestions(alert._id)
                                }
                                className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-semibold hover:text-white transition-all duration-300"
                              >
                                AI suggestions
                              </button>
                            </div>
                            {openSuggestionId === alert._id && (
                              <div className="bg-white text-black text-sm rounded-lg p-4 mt-2 shadow-lg relative z-10">
                                <div style={{ whiteSpace: "pre-line" }}>
                                  {aiSuggestions[alert._id] === "Loading..." ? (
                                    <span
                                      className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient-x font-extrabold text-md"
                                      style={{
                                        display: "inline-block",
                                        animation: "gradient-x 2s linear 3",
                                      }}
                                    >
                                      Loading...
                                    </span>
                                  ) : (
                                    aiSuggestions[alert._id] || "Loading..."
                                  )}
                                </div>
                                <button
                                  onClick={() => closeAISuggestions(alert._id)}
                                  className=" bg-black rounded-md px-2 absolute top-2 right-2 text-white hover:bg-red-600 transition-all duration-300"
                                >
                                  ✕
                                </button>
                              </div>
                            )}
                          </div>
                          <div className="text-center">
                            <div className="mb-2 text-xs text-gray-300">
                              {alert.createdAt
                                ? new Date(alert.createdAt).toLocaleString()
                                : "No date"}
                            </div>
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
                      ))
                  )}
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
