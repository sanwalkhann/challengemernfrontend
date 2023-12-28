import React from "react";

const TaskFilter = ({
  onFilter,
  onPriorityFilter,
  onClearFilter,
  onCompletedFilter,
  activeFilter,
}) => {
  return (
    <div className="mb-6 flex justify-between">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Filter Tasks
        </h3>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <button
            onClick={() => onPriorityFilter("high")}
            className={`${
              activeFilter === "high" ? "bg-blue-700" : "bg-blue-500"
            } text-white rounded-md py-2 px-4 transition duration-300 hover:bg-opacity-80`}
          >
            High
          </button>
          <button
            onClick={() => onPriorityFilter("medium")}
            className={`${
              activeFilter === "medium" ? "bg-green-700" : "bg-green-500"
            } text-white rounded-md py-2 px-4 transition duration-300 hover:bg-opacity-80`}
          >
            Medium
          </button>
          <button
            onClick={() => onPriorityFilter("low")}
            className={`${
              activeFilter === "low" ? "bg-gray-700" : "bg-gray-500"
            } text-white rounded-md py-2 px-4 transition duration-300 hover:bg-opacity-80`}
          >
            Low
          </button>
          <button
            onClick={onClearFilter}
            className="bg-gray-500 text-white rounded-md py-2 px-4 transition duration-300 hover:bg-opacity-80"
          >
            All
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;
