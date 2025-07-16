import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";

const AdminDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8000/alerts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAlerts(res.data));

    //socket.io
    const socket = socketIOClient("http://localhost:8000");
    socket.on("newAlert", (newAlert) => {
      setAlerts((prev) => [newAlert, ...prev]);
    });

    return () => socket.disconnect();
  }, [token]);

  return (
    <div>
      <h2>Active SOS Alerts</h2>
      <ul>
        {alerts.map((alert) => (
          <li key={alert.alertId}>
            {alert.user.email} - {alert.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
