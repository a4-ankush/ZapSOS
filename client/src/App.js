import React from "react";
import AdminDashboard from "./landing_pages/admin/AdminDashboard";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import StudentDashboard from "./landing_pages/student/StudentDashboard";
import Login from "./landing_pages/Login";
import Signup from "./landing_pages/Signup";
import Home from "./landing_pages/homePage/Home";
import ProtectedRoute from "./ProtectedRoute";
import PagenotFound from "./PagenotFound";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ZapAI from "./landing_pages/zapai/ZapAI";
import Contact from "./landing_pages/Contact";

function AppContent() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/zapai"
          element={
            <ProtectedRoute allowedRole="student">
              <ZapAI />
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
      {location.pathname !== "/zapai" && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
