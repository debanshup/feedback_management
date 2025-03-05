import React, { useEffect, useState } from "react";
import FeedbackChart from "../../components/FeedbackChart";
import FilterOptions from "../../components/FilterOptions";
import axiosInstance from "../../utils/axiosInstance";
import Accordion from "../../components/Accordion";

const Dashboard = () => {
  // filters

  const [filter, setFilter] = useState({
    time: "7days",
    serviceCategory: "",
    experience: "",
    priorityLevel: "",
  });

  // feedback data state
  const [feedbackData, setFeedbackData] = useState({
    graph: [],
    record: [],
    count: 0,
  });

  const [scope, setScope] = useState("CURRENT");

  const [exportType, setExportType] = useState({
    feedback: "PDF",
    analytics: "PDF",
  });

  // loading state for feedback data
  const [loading, setLoading] = useState(true);

  // fetch feedback data based on filters
  async function getFeedback() {
    setLoading(true);
    try {
      const feedbackRes = await axiosInstance.get("/get-feedback", {
        params: filter,
      });
      const { success, graph, record, count } = feedbackRes.data;
      if (success) {
        setFeedbackData({ graph, record, count });
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  }

  async function exportFeedbackHandler({ id, type }) {
    try {
      const queryString = new URLSearchParams({ id, type }).toString();
      // alert(queryString);
      window.open(`http://localhost:3000/export-feedback?${queryString}`);
    } catch (error) {
      alert(error.message);
    }
  }

  async function exportAnalyticskHandler({ filter, type, scope }) {
    try {
      // alert(type)
      const queryString = new URLSearchParams({
        scope,
        type,
        ...filter,
      }).toString();
      // alert(queryString);
      window.open(`http://localhost:3000/export-analytics?${queryString}`);
    } catch (error) {
      alert(error.message);
    }
  }

  function changeScope(e) {
    setScope(e.target.value);
  }

  function changeFeedbackExportType(e) {
    setExportType({ ...exportType, feedback: e.target.value });
  }
  function changeAnalyticsExportType(e) {
    // console.log(e.target.value);

    setExportType({ ...exportType, analytics: e.target.value });
  }

  useEffect(() => {
    getFeedback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filter.time,
    filter.experience,
    filter.priorityLevel,
    filter.serviceCategory,
  ]);

  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="p-4 sm:p-6 lg:p-8 ">
      <div className="w-full">
        <div className="border border-gray-300 shadow-lg rounded-lg">
          <FeedbackChart data={feedbackData.graph} />
        </div>
      </div>

      <div className="my-4 sticky top-0 z-10 rounded-lg">

        <div
          className="flex justify-between items-center cursor-pointer px-4 py-2 bg-white  border border-gray-300 rounded-lg w-full max-w-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Filters Header */}
          <div className="flex flex-col">
            <h2 className="font-semibold text-gray-700 flex items-center">
              Filters
            </h2>
            <div className="flex flex-wrap gap-2 mt-1">
              {Object.entries(filter)
                .filter(([key, value]) => value) // Show only filters with a value
                .map(([key, value]) => (
                  <span
                    key={key}
                    className="inline-flex items-center px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-full text-sm font-semibold text-gray-600 transition-all"
                  >
                    <span className="capitalize">{key}:</span>
                    <span className="ml-1">{value}</span>
                  </span>
                ))}
            </div>
          </div>

          {/* Toggle Icon */}
          <button className="text-gray-500 hover:text-gray-700 transition-all">
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 15l6-6 6 6H6z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 9l6 6 6-6H6z" />
              </svg>
            )}
          </button>
        </div>

        {/* Collapsible Content */}
        {isOpen && (
          <div className="">
            <FilterOptions
              filterState={{ filter, setFilter }}
              count={feedbackData.count}
              exportAction={{
                exportType: exportType.analytics,
                clickHandler: () => {
                  exportAnalyticskHandler({
                    filter,
                    type: exportType.analytics,
                    scope,
                  });
                },
                changeExportType: changeAnalyticsExportType,
                scope,
                changeScope,
              }}
            />
          </div>
        )}
      </div>


      {/* Feedback Records */}
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-xl font-bold mb-6 text-gray-800">Feedbacks</h1>

        {/* Loading ...*/}
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="w-10 h-10 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : feedbackData.record.length > 0 ? (
          feedbackData.record.map((feedback, index) => (
            <Accordion
              key={index}
              data={feedback}
              changeHandler={changeFeedbackExportType}
              clickHandler={() => {
                exportFeedbackHandler({
                  id: feedback._id,
                  type: exportType.feedback,
                });
              }}
              exportType={exportType.feedback}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No feedback found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
