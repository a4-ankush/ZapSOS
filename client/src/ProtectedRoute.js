import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ allowedRole, children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/me`, {
        withCredentials: true,
      })
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

  if (isAuth === null) return null;

  return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
