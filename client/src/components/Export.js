import React from "react";

const Export = ({exportType, clickHandler, changeHandler}) => {

  return (
    <div className="flex justify-end p-4">
      <div className="flex items-center space-x-2">
        {/*export Label */}
        <label htmlFor="exportType" className="text-gray-700 text-sm font-light">
          Export as:
        </label>

        {/* Select export type */}
        <select
          id="exportType"
          value={exportType}
          onChange={changeHandler}
          className="border border-gray-300 rounded-lg px-2 py-1 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="PDF">PDF</option>
          <option value="EXCEL">EXCEL</option>
        </select>

        {/* download button */}
        <button
          onClick={clickHandler}
          className="bg-green-600 text-white font-bold rounded-lg text-sm py-1 px-3 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Export;
