import React from "react";

const ExportLg = ({ action }) => {
  const { exportType, scope, clickHandler, changeExportType, changeScope } =
    action;
  // alert(scope)
  return (
    <div className="flex flex-wrap justify-end p-4 gap-4 w-full">
    <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
      {/* Label */}
      <label
        htmlFor="exportScope"
        className="text-gray-600 text-sm font-medium"
      >
        Export
      </label>
  
      {/* Scope */}
      <select
        id="exportScope"
        value={scope}
        onChange={changeScope}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
      >
        <option value="ALL">All</option>
        <option value="CURRENT">Current</option>
      </select>
  
      <span className="text-gray-600 text-sm font-medium">as</span>
  
      {/* Format  */}
      <select
        id="exportType"
        value={exportType}
        onChange={changeExportType}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
      >
        <option value="PDF">PDF</option>
        <option value="EXCEL">Excel</option>
      </select>
  
      {/* Download Button */}
      <div className="mt-2 md:mt-0">
        <button
          onClick={clickHandler}
          className="bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 shadow-md transition-all"
        >
          Download
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default ExportLg;
