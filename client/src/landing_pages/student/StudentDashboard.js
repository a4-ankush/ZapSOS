import React from "react";

import { useState, useEffect } from "react";
import axios from "axios";

const StudentDashboard = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser({ name: "Student" }));
  }, []);

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/auth/logout",
        {},
        { withCredentials: true }
      );
      localStorage.clear();
      window.location.href = "/login";
      window.location.reload();
    } catch (err) {
      alert("logout failed");
    }
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
            { withCredentials: true }
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
      <div>
        <div className="text-center text-7xl font-extrabold mt-14 mb-4 py-10">
          <h1>Hello , {user ? user.name : "student"}</h1>
        </div>
      </div>
      <h2>📢 Send Emergency Alert</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="What's the emergency?"
        rows={3}
      />
      <br />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={sendSOS}
      >
        Send SOS
      </button>
      <p>{status}</p>
      <br />
      <button onClick={logout}>LogOut</button>
    </div>
  );
};

export default StudentDashboard;
