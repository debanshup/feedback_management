import React from "react";

const FeedbackForm = ({ data, setData, submitHandler }) => {
  return (
    <>
      <form
        id="feedbackForm"
        onSubmit={submitHandler}
        autoComplete="on"
        className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8"
      >
        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-gray-700 font-medium mb-2"
          >
            Select a Service Category{" "}
            <span className="text-sm">(required)</span>
          </label>
          <select
            value={data.serviceCategory}
            onChange={(e) => {
              setData({ ...data, serviceCategory: e.target.value });
            }}
            id="category"
            name="category"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          >
            <option value="">Select a service</option>
            <option value="Wordpress Solution">WordPress Solution</option>
            <option value="Web Development">Web Development</option>
            <option value="Cloud Services">Cloud Services</option>
            <option value="SEO Optimization">SEO Optimization</option>
            <option value="App Development">App Development</option>
            <option value="Database Service">Database Service</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="experience"
            className="block text-gray-700 font-medium mb-2"
          >
            What's your experience with our service?{" "}
            <span className="text-sm">(required)</span>
          </label>
          <select
            value={data.experience}
            onChange={(e) => {
              setData({ ...data, experience: e.target.value });
            }}
            id="experience"
            name="experience"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          >
            <option value="">Select an option</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="average">Average</option>
            <option value="poor">Poor</option>
          </select>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <label className="block text-gray-700 font-medium mb-2 sm:mb-0">
            Select Priority Level <span className="text-sm">(required)</span>
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="priority"
              value="high"
              required
              className="text-blue-600"
              onChange={(e) =>
                setData({ ...data, priorityLevel: e.target.value })
              }
            />
            <span>High</span>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="priority"
              value="medium"
              className="text-blue-600"
              onChange={(e) =>
                setData({ ...data, priorityLevel: e.target.value })
              }
            />
            <span>Medium</span>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="priority"
              value="low"
              className="text-blue-600"
              onChange={(e) =>
                setData({ ...data, priorityLevel: e.target.value })
              }
            />
            <span>Low</span>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="feedback"
            className="block text-gray-700 font-medium mb-2"
          >
            Your Feedback
          </label>
          <textarea
            value={data.message}
            onChange={(e) => {
              setData({ ...data, message: e.target.value });
            }}
            id="feedback"
            name="feedback"
            rows="5"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Describe your feedback"
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </>
  );
};

export default FeedbackForm;
