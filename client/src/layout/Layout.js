import React, { useEffect } from "react";
import { Outlet } from "react-router";
import axiosInstance from "../utils/axiosInstance";
import { redirect } from "react-router-dom";
const Layout = () => {
  // async function sayHi() {
  //   await axiosInstance.get("/");
  // }
  // useEffect(() => {
  //   sayHi();
  // }, []);

  // useEffect(() => {

  //   redirect("/login")

  // }, [])

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;
