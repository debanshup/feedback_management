import React from "react";
import ExportLg from "./ExportLg";

const FilterOptions = ({ filterState, count, exportAction }) => {
  const { filter, setFilter } = filterState;

  return (
    <div className="p-4 bg-gray-100 rounded-lg bg-white shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Time Filter */}
        <div className="flex flex-col">
          <select
            id="time"
            value={filter.time}
            onChange={(e) => setFilter({ ...filter, time: e.target.value })}
            className="p-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 hover:shadow-md transition-all"
          >
            <option value="7days">Last 7 Days</option>
            <option value="4weeks">Last 4 Weeks</option>
            <option value="12months">Last 12 Months</option>
            <option value="60months">Last 60 Months</option>
          </select>
        </div>

        {/* Service Category Filter */}
        <div className="flex flex-col">
          <select
            id="serviceCategory"
            value={filter.serviceCategory}
            onChange={(e) =>
              setFilter({ ...filter, serviceCategory: e.target.value })
            }
            className="p-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 hover:shadow-md transition-all"
          >
            <option value="">Service</option>
            <option value="Wordpress Solution">WordPress Solution</option>
            <option value="Web Development">Web Development</option>
            <option value="Cloud Services">Cloud Services</option>
            <option value="SEO Optimization">SEO Optimization</option>
            <option value="App Development">App Development</option>
            <option value="Database Service">Database Service</option>
          </select>
        </div>

        {/* Experience Filter */}
        <div className="flex flex-col">
          <select
            id="experience"
            value={filter.experience}
            onChange={(e) =>
              setFilter({ ...filter, experience: e.target.value })
            }
            className="p-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 hover:shadow-md transition-all"
          >
            <option value="">Experience</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="average">Average</option>
            <option value="poor">Poor</option>
          </select>
        </div>

        {/* Priority Level Filter */}
        <div className="flex flex-col">
          <select
            id="priorityLevel"
            value={filter.priorityLevel}
            onChange={(e) =>
              setFilter({ ...filter, priorityLevel: e.target.value })
            }
            className="p-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 hover:shadow-md transition-all"
          >
            <option value="">Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2 text-sm text-gray-600">
        <h2 className="font-bold">
          Feedback Count: <span className="font-semibold">{count}</span>
        </h2>
        <span className="justify-self-start md:justify-self-end sm:justify-self-center w-full">
          <ExportLg action={exportAction} />
        </span>
      </div>
    </div>
  );
};

export default FilterOptions;
