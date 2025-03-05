import { useState } from "react";
import { parseDate } from "../utils/parser";
import Export from "./Export";
const Accordion = ({ data, exportType, clickHandler, changeHandler }) => {
  const {
    name,
    email,
    serviceCategory,
    priorityLevel,
    experience,
    message,
    date,
  } = data;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-md shadow-sm mb-4">
      <div
        className="flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <span className="font-medium text-gray-700">{parseDate(date)}</span>
          <p className="text-gray-500">{serviceCategory}</p>
          <p>
            <span
              className={`font-semibold ${
                experience === "excellent"
                  ? "text-green-700"
                  : experience === "good"
                  ? "text-green-500"
                  : experience === "average"
                  ? "text-yellow-500"
                  : "text-red-600"
              }`}
            >
              {experience.charAt(0).toUpperCase() + experience.slice(1)}
            </span>
          </p>

          <span className="text-sm text-gray-600">
            Priority: {priorityLevel}
          </span>
        </div>
        <button
          className="text-sm font-medium text-gray-600"
          aria-expanded={isOpen}
          aria-label="Expand or collapse"
        >
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
      {isOpen && (
        <div className="p-4 border-t bg-white">
          <div className="mt-2 text-sm text-gray-500">
            <p>
              <span className="font-bold text-sm">Name: </span>
              {name}
            </p>
            <p>
              <span className="font-bold text-sm">Email: </span> {email}
            </p>
          </div>
          <p className="text-gray-500">
            <span className="font-bold text-sm">Message: </span>
            {message}
          </p>
          <Export
            changeHandler={changeHandler}
            exportType={exportType}
            clickHandler={clickHandler}
          />
        </div>
      )}
    </div>
  );
};

export default Accordion;
