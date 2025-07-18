import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";

import AlertMap from "../AlertMap";

const AdminDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);

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
    <div>
      <h2>Active SOS Alerts</h2>
      <div ref={mapRef}>
        <AlertMap alerts={alerts} selectedAlert={selectedAlert} />
      </div>
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
            <br />
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (
                  alert.location &&
                  alert.location.latitude &&
                  alert.location.longitude
                ) {
                  setSelectedAlert(alert);
                  mapRef.current?.scrollIntoView({ behavior: "smooth" });
                } else {
                  alert("This alert has no location data.");
                }
              }}
            >
              📍 View on Map
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
