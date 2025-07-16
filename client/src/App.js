import React from "react";
import AdminDashboard from "../src/landing_pages/AdminDashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentDashboard from "./landing_pages/StudentDashboard";
import Login from "./landing_pages/Login";
import Signup from "./landing_pages/Signup";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
