import React from "react";

import { useState } from "react";
import axios from "axios";

const StudentDashboard = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const sendSOS = () => {
    if (!message) {
      return alert("Please enter a message.");
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const location = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };

        try {
          const res = await axios.post(
            "http://localhost:8000/alerts",
            {
              message,
              location,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          setStatus("SOS sent successfully!");
          setMessage("");
        } catch (err) {
          setStatus("Error in Sending SOS");
        }
      },
      (err) => {
        alert("Geolocation error. Please allow location access");
      }
    );
  };
  return (
    <div>
      <h2>📢 Send Emergency Alert</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="What's the emergency?"
        rows={3}
      />
      <br />
      <button onClick={sendSOS}>Send SOS</button>
      <p>{status}</p>
      <br />
      <button onClick={logout}>LogOut</button>
    </div>
  );
};

export default StudentDashboard;
