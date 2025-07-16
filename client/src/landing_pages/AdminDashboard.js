import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";

import AlertMap from "../AlertMap";

const AdminDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const token = localStorage.getItem("token"); // don't forget : add at /auth/login route
  console.log("Token from localStorage:", token);

  const handleResolve = async (alertId) => {
    try {
      console.log("Resolving alert with id:", alertId);
      await axios.patch(
        `http://localhost:8000/alerts/${alertId}/resolve`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAlerts((prev) =>
        prev.map((a) => (a._id === alertId ? { ...a, status: "resolved" } : a))
      );
    } catch (err) {
      console.error("Failed to resolve alert", err);
    }
  };

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const res = await axios.get("http://localhost:8000/alerts", {
          headers: { Authorization: `Bearer ${token}` },
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
  }, [token]);

  return (
    <div>
      <h2>Active SOS Alerts</h2>
      <AlertMap alerts={alerts} />
      <ul>
        {alerts.map((alert) => (
          <li key={alert._id}>
            <strong>{alert.user?.name || "Unknown user"} </strong>:{" "}
            {alert.message}
            <br />
            Status: {alert.status}
            {alert.status === "active" && (
              <button onClick={() => handleResolve(alert._id)}>
                Mark as Resolved
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
