import React from "react";
import AdminDashboard from "./landing_pages/admin/AdminDashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentDashboard from "./landing_pages/student/StudentDashboard";
import Login from "./landing_pages/Login";
import Signup from "./landing_pages/Signup";
import Home from "./landing_pages/homePage/Home";
import ProtectedRoute from "./ProtectedRoute";
import PagenotFound from "./PagenotFound";
import Navbar from "./Navbar";
import Footer from "./Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route path="*" element={<PagenotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
