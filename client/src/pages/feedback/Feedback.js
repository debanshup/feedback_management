/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import FeedbackForm from "../../components/FeedbackForm";
function Feedback() {
  const [user, setUser] = useState({ name: "", email: "" });

  const [data, setData] = useState({
    serviceCategory: "",
    priorityLevel: "",
    experience: "",
    message: "",
  });

  async function getUser() {
    try {
      const res = await axiosInstance.get("/find-user", data);
      if (res.data.success) {
        setUser({
          ...user,
          name: res.data.user.name,
          email: res.data.user.email,
        });
      } else {
        alert("NO user found");
      }
    } catch (error) {
      alert("Internal server error");
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/submit-feedback", data);
      // alert(res.data.success);
      if (res.data.success) {
        // feedback submitted successfully
        alert("Feedback submitted successfully");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* <header className="bg-blue-600 text-white py-4 shadow">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold">DC InfoTech - Feedback Portal</h1>
          <p>Your opinions help us improve!</p>
        </div>
      </header> */}

      <main className="container mx-auto my-8 px-4 flex-grow">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">
            Welcome, {user.name}!
          </h2>
          <p className="text-gray-600 mb-6">
            We're excited to hear from you. Your feedback will be submitted as
            <span className="text-gray-900 font-medium"> {user.email}</span>.
          </p>
          <div className="border-t border-gray-200 pt-6">
            {/* Feedback form */}
            <FeedbackForm
              data={data}
              setData={setData}
              submitHandler={submitHandler}
            />
          </div>
        </div>
      </main>

      {/* <footer className="bg-blue-600 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 DC InfoTech Pvt Ltd. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
}

export default Feedback;
