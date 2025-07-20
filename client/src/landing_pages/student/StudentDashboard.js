import React from "react";

import { useState, useEffect } from "react";
import axios from "axios";
import "./Student.css";
import { BiSend, BiSolidZap } from "react-icons/bi";

const StudentDashboard = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [user, setUser] = useState(null);
  const [animateStatus, setAnimateStatus] = useState(false);

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
          setAnimateStatus(true);
          setTimeout(() => setAnimateStatus(false), 4000); // Animation duration
        } catch (err) {
          setStatus("Error in Sending SOS");
          setAnimateStatus(true);
          setTimeout(() => setAnimateStatus(false), 4000);
        }
      },
      (err) => {
        alert("Geolocation error. Please allow location access");
      }
    );
  };

  const predefinedMessages = [
    "Medical Emergency !",
    "Fire Alert !",
    "Suspicious Activity !",
    "Accident Report !",
    "Need Immediate Help !",
  ];

  const handlePredefinedClick = (msg) => {
    setMessage(msg);
  };

  return (
    <div className="px-6 ">
      <div className=" emergency-bg p-1 rounded-xl shadow-lg mt-3 relative">
        <div className="text-center text-7xl font-extrabold mt-14 mb-4 py-10 fade-in">
          <h1>
            Hello ,{" "}
            <span className="gradient-text">
              {user ? user.name : "student"}
            </span>{" "}
          </h1>
        </div>
        <div className="text-center text-gray-300 text-3xl font-semibold mb-8">
          <h2>Any Emergency ? Send SOS here !</h2>
        </div>
        <div className="text-center py-16">
          <h2 className="text-lg font-semibold mb-2">
            Send Emergency Alerts !
          </h2>

          {/* Predefined SOS messages */}
          <div className="flex justify-center gap-4 mb-6 flex-wrap">
            {predefinedMessages.map((msg, idx) => (
              <button
                key={idx}
                type="button"
                className="bg-red-700 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition all duration-300 ease-out"
                onClick={() => handlePredefinedClick(msg)}
              >
                {msg}
              </button>
            ))}
          </div>

          <div className="relative ">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What's the emergency?"
              rows={3}
              className="w-2/3 px-54 resize-none rounded-3xl border border-blue-500 bg-black p-4 text-base shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all duration-200 outline-none"
              maxLength={500}
            />
            <span className="absolute bottom-4 right-72 text-gray-400 text-xs">
              {message.length}/500
            </span>
          </div>
          <div className="relative ">
            <button
              className=" absolute right-72 bottom-12 bg-red-600 text-2xl hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4 transition-all duration-300 ease-out shadow-lg hover:scale-105 hover:shadow-2xl"
              onClick={sendSOS}
            >
              <BiSend className="" />
            </button>
          </div>

          {animateStatus && (
            <div className="sos-zap-animation text-2xl mt-28 font-extrabold">
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
