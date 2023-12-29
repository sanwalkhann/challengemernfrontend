// Dashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import TaskFilter from "./TaskFilter";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const navigate = useNavigate();

  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);

  const handlePriorityFilter = (priority) => {
    const filtered = tasks.filter((task) => task.priority === priority);
    setFilteredTasks(filtered);
    setActiveFilter(priority);
  };

  const handleClearFilter = () => {
    setFilteredTasks([]);
    setActiveFilter(null);
  };

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://weekfivehackathonbd.vercel.app/tasks", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      setError("Error fetching tasks. Please try again.");
      console.error(error.message);
    }
  };
  

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (editMode && editTaskId) {
        const response = await axios.put(
          `https://weekfivehackathonbd.vercel.app/tasks/${editTaskId}`,
          {
            title: taskTitle,
            description: taskDescription,
            priority: taskPriority,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          await fetchTasks();
          setTaskTitle("");
          setTaskDescription("");
          setTaskPriority("");
          setEditMode(false);
          setEditTaskId(null);
          setError("");
        } else {
          setError("Error updating task. Please try again.");
          console.error("Error updating task:", response.statusText);
        }
      } else {
        const response = await axios.post(
          "https://weekfivehackathonbd.vercel.app/tasks",
          {
            title: taskTitle,
            description: taskDescription,
            priority: taskPriority,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          await fetchTasks();
          setTaskTitle("");
          setTaskDescription("");
          setTaskPriority("");
          setError("");
        } else {
          setError("Error creating task. Please try again.");
          console.error("Error creating task:", response.statusText);
        }
      }
    } catch (error) {
      setError(
        editMode
          ? "Error updating task. Please try again."
          : "Error creating task. Please try again."
      );
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task._id === taskId);

    if (taskToEdit) {
      setTaskTitle(taskToEdit.title || "");
      setTaskDescription(taskToEdit.description || "");

      const validPriority = ["high", "medium", "low"].includes(
        taskToEdit.priority
      )
        ? taskToEdit.priority
        : "";

      setTaskPriority(validPriority);
      setEditMode(true);
      setEditTaskId(taskId);
    }
  };

  const handleCancelEdit = () => {
    setTaskTitle("");
    setTaskDescription("");
    setTaskPriority("");
    setEditMode(false);
    setEditTaskId(null);
    setError("");
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`https://weekfivehackathonbd.vercel.app/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log(response);
  
      if (response.status === 200) {
        await fetchTasks();
      } else {
        console.error("Error deleting task:", response);
        if (response.headers["content-type"]?.includes("application/json")) {
          const errorData = response.data;
          setError(errorData.message || "Error deleting task. Please try again.");
        } else {
          setError("Error deleting task. Please try again.");
        }
      }
    } catch (error) {
      setError("Error deleting task. Please try again.");
      console.error(error.message);
    }
  };
  

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          await fetchTasks();
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error checking authentication:", error.message);
        setError("Error fetching tasks. Please try again.");
      }
    };

    checkAuthentication();
  }, [navigate]);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-screen-lg mx-auto bg-white rounded-md shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Your Tasks</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white rounded-md py-2 px-4 transition duration-300 hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading && <p>Loading...</p>}

        <form onSubmit={handleCreateTask} className="mb-6" disabled={loading}>
          <div className="mb-4">
            <label
              htmlFor="taskTitle"
              className="block text-gray-600 text-sm mb-1"
            >
              Title:
            </label>
            <input
              type="text"
              id="taskTitle"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full border-gray-300 border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="taskDescription"
              className="block text-gray-600 text-sm mb-1"
            >
              Description:
            </label>
            <textarea
              id="taskDescription"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full border-gray-300 border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="taskPriority"
              className="block text-gray-600 text-sm mb-1"
            >
              Priority:
            </label>
            <select
              id="taskPriority"
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              className="w-full border-gray-300 border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className={`${
                editMode ? "bg-yellow-500" : "bg-blue-500"
              } text-white rounded-md py-2 px-4 transition duration-300 hover:bg-opacity-80`}
              disabled={loading}
            >
              {loading ? "Saving..." : editMode ? <FaSave /> : "Create Task"}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-red-500 text-white rounded-md py-2 px-4 transition duration-300 hover:bg-red-600"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </form>

        <TaskFilter
          onPriorityFilter={handlePriorityFilter}
          onClearFilter={handleClearFilter}
          activeFilter={activeFilter}
        />

        <ul className="list-disc pl-6 mb-6">
          {(activeFilter ? filteredTasks : tasks).map((task) => (
            <li
              key={task._id}
              className="mb-4 border-b border-gray-300 pb-2 hover:border-blue-500 transition duration-300"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                <div className="mb-2 lg:mb-0 lg:mr-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <p className="text-sm text-gray-600">
                    Priority: {task.priority}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleEditTask(task._id)}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
