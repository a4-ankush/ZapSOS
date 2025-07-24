import React, { useState, useEffect } from "react";
import axios from "axios";
import "./zapAI.css";
import { BsStars } from "react-icons/bs";
import ReactMarkdown from "react-markdown";

const ZapAI = () => {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! I'm ZapAI. Your AI assistent, How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3500); // 3.5s
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/ai-chat",
        { message: input },
        { withCredentials: true }
      );
      setMessages((msgs) => [...msgs, { sender: "ai", text: res.data.reply }]);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        { sender: "ai", text: "Sorry, I couldn't process your request." },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <div className="relative flex flex-col items-center justify-center py-6 rounded-xl overflow-hidden">
        {/* Animated background */}
        <div className="animated-gradient-ltr absolute inset-0 w-full h-full z-0 rounded-xl" />
        {/* Content above the background */}
        <div className="relative z-10 w-full">
          {showSplash && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#181c2f]/80 backdrop-blur-[6px] transition-all duration-700">
              <BsStars
                className="text-purple-400 drop-shadow-2xl animate-splash-spin"
                size={120}
              />
            </div>
          )}
          <div
            className={`${
              showSplash
                ? "pointer-events-none blur-[6px] scale-105"
                : "blur-0 scale-100"
            } transition-all duration-700 w-full max-w-7xl mx-auto rounded-3xl shadow-2xl bg-[#181c2f]/90 border border-[#3b0764] backdrop-blur-lg flex flex-col h-[95vh]`}
          >
            <header className="flex justify-center items-center gap-3 py-6 px-6 border-b border-[#312e81]">
              <div className="  p-1 shadow-lg">
                <BsStars className="text-purple-400" size={28} />
              </div>
              <h2 className="mr-10 text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
                ZapAI Chat
              </h2>
            </header>
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scrollbar-thin scrollbar-thumb-[#312e81]/70 scrollbar-track-transparent">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-md text-base sm:text-lg font-medium
                ${
                  msg.sender === "user"
                    ? "bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 text-white border border-blue-900 animate-fade-in-right"
                    : "bg-gradient-to-br from-[#312e81] via-[#1e293b] to-[#0f172a] text-blue-200 border border-[#3b0764] animate-fade-in-left"
                }
              `}
                    style={{
                      wordBreak: "break-word",
                    }}
                  >
                    {msg.sender === "ai" ? (
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="max-w-[75%] px-5 py-3 rounded-2xl bg-gradient-to-br from-[#312e81] via-[#1e293b] to-[#0f172a] text-blue-200 border border-[#3b0764] animate-pulse">
                    ZapAI is typing...
                  </div>
                </div>
              )}
              <div id="chat-end" />
            </div>
            <form
              onSubmit={sendMessage}
              className="flex items-center px-4 py-3 bg-[#20243a]/80 rounded-full shadow-lg border border-[#312e81]/40 mt-2 mb-4 mx-4"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message ZapAI..."
                className="flex-1 bg-transparent text-blue-100 placeholder-blue-400 px-4 py-3 rounded-full focus:outline-none focus:ring-0 text-base"
                disabled={loading}
                autoFocus
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className={`ml-2 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:to-purple-800 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label="Send"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="text-white"
                >
                  <path
                    d="M2 21l21-9-21-9v7l15 2-15 2v7z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </form>
            <div className="text-center text-gray-400 text-sm px-6 pb-4">
              <h3>ZapAI can make mistakes, so double-check it ! </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZapAI;
