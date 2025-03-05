import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";


const PrivateRoute = () => {
  const [authState, setAuthState] = useState({
    isLoading: true,
    success: false,
    role: null,
  });

  useEffect(() => {
    const checkCookie = async () => {
      try {
        const res = await axiosInstance.post("/check-pulse");
        setAuthState({ isLoading: false, ...res.data }); // Update state with API response
      } catch (error) {
        // alert("err");
        setAuthState({ isLoading: false, success: false, role: null }); // Handle error gracefully
      }
    };

    checkCookie();
  }, []); 

  if (authState.isLoading) {
    return <div>Loading...</div>; // Show a loader during the check
  }

  if (authState.role !== "user") {
    return <Navigate to={"/login"} replace />;
  }

  // alert(authState.role)
  return <Outlet />;
};

export default PrivateRoute;
