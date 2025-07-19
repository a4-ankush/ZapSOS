import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ allowedRole, children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/auth/me", { withCredentials: true })
      .then((res) => {
        const user = res.data.user;
        if (user && user.role === allowedRole) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      })
      .catch(() => setIsAuth(false));
  }, [allowedRole]);

  if (isAuth === null) return null; // or a loading spinner

  return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
