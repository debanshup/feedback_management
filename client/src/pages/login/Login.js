import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Navigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
const Login = () => {
  const [redirectTo, setRedirectTo] = useState(null);

  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "user",
  });

  async function loginHandler(e) {
    e.preventDefault();

    try {
      if (user.role === "user") {
        const loginRes = await axiosInstance.post("/login-user", user);
        if (loginRes.data.success) {
          setRedirectTo("/feedback");
        }
      } else if (user.role === "admin") {
        // alert(user.role)
        const loginRes = await axiosInstance.post("/login-admin", user);
        if (loginRes.data.success) {
          setRedirectTo("/dashboard");
          
        }
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  }


  if (redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm user={user} setUser={setUser} loginHandler={loginHandler} />
    </div>
  );
};

export default Login;
