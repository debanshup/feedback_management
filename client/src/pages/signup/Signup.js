import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { redirect, useNavigation } from "react-router-dom";
import SignupForm from "../../components/SignupForm";

import { Navigate } from "react-router-dom";
const Signup = () => {
  const [redirectTo, setRedirectTo] = useState(null);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // declare validators

  async function createAccountHandler(e) {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    // Validate password length
    const passwordValidator = /^.{4,}$/;
    if (!passwordValidator.test(user.password)) {
     alert("Password must be at least 4 characters long")
     return

    }
    try {
   
      const signupRes = await axiosInstance.post("/signup", user);
      if (signupRes.data.success) {
        alert(signupRes.data.message);
        setRedirectTo("/login");
      }
      
    } catch (error) {
      alert(error.response.data.message);
    }
  }
  if (redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <SignupForm
        user={user}
        setUser={setUser}
        createAccountHandler={createAccountHandler}
      />
    </div>
  );
};

export default Signup;
