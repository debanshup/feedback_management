import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

// Helper function to check authentication

const ProtectedRoute = () => {
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
        setAuthState({ isLoading: false, success: false, role: null }); // Handle error gracefully
      }
    };

    checkCookie();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (authState.isLoading) {
    return <div>Loading...</div>; // Show a loader during the check
  }
  // alert(authState.role)

  if (authState.role !== "admin") {
    return <Navigate to={"/login"} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
