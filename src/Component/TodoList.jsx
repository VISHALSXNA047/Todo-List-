import React, { useState, useEffect } from "react";
import "./style.css";
import todoImage from "../image/todo.png";

const TodoList = () => {
  const [tasks, setTasks] = useState([
     {
    id: 1,
    title: "Learn React",
    completed: false,
  },
  {
    id: 2,
    title: "Build Todo App",
    completed: true,
  },
  {
    id: 3,
    title: "Practice JavaScript",
    completed: false,
  },
  {
    id: 4,
    title: "Apply for MERN Jobs",
    completed: false,
  },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [editTaskId, setEditTaskId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (darkMode) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
  }, [darkMode]);


  const handleInputChange = (e) => setInputValue(e.target.value);

const handleAddTask = () => {
  if (inputValue.trim() === "") return;

  const newTask = {
    id: Date.now(),
    title: inputValue,
    completed: false,
  };

  setTasks((prev) => [...prev, newTask]);
  setInputValue("");
  // toast.success("Task added successfully");
};

  const handleTaskCheckboxChange = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    // toast.success("Task deleted successfully");
  };

  const handleEditTask = (taskId) => {
    setEditTaskId(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setInputValue(taskToEdit.title);
  };

 const handleUpdateTask = () => {
  if (inputValue.trim() === "") return;

  setTasks((prev) =>
    prev.map((task) =>
      task.id === editTaskId
        ? { ...task, title: inputValue }
        : task,
    ),
  );

  setInputValue("");
  setEditTaskId(null);
  // toast.success("Task updated successfully");
};

  const handleCompleteAll = () => {
    setTasks((prev) => prev.map((task) => ({ ...task, completed: true })));
  };

  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  const handleFilterChange = (filterType) => setFilter(filterType);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "uncompleted") return !task.completed;
    return true;
  });

  return (
    <div className="container">
      <ToastContainer />
      <div className="todo-app">
        <div className="top-bar">
          <h2>
            <img src={todoImage} alt="todo" />
            Todo list
          </h2>
          <div
            className="theme-toggle-wrapper"
            onClick={() => setDarkMode(!darkMode)}
            role="button"
            aria-label="Toggle dark mode"
          >
            <span className="theme-icon">{darkMode ? "☀️" : "🌙"}</span>
            <div className={`toggle-track ${darkMode ? "active" : ""}`}>
              <div className="toggle-thumb"></div>
            </div>
            <span className="theme-label">{darkMode ? "Light" : "Dark"}</span>
          </div>
        </div>

        <div className="row">
          <div className="input-wrap">
            <input
              type="text"
              className="add-task"
              placeholder="Add your todo"
              autoFocus
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                (editTaskId ? handleUpdateTask() : handleAddTask())
              }
            />
          </div>
          <button
            id="btn"
            onClick={editTaskId ? handleUpdateTask : handleAddTask}
          >
            {editTaskId ? "Update" : "Add"}
          </button>
        </div>

        <div className="mid">
          <p id="complete-all" onClick={handleCompleteAll}>
            ✓ Complete all tasks
          </p>
          <p id="clear-all" onClick={handleClearCompleted}>
            Delete comp tasks
          </p>
        </div>

        <ul id="list">
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                id={`task-${task.id}`}
                className="custom-checkbox"
                checked={task.completed}
                onChange={() => handleTaskCheckboxChange(task.id)}
              />
              <label htmlFor={`task-${task.id}`}>{task.title}</label>
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1159/1159633.png"
                  className="edit"
                  alt="edit"
                  onClick={() => handleEditTask(task.id)}
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3096/3096673.png"
                  className="delete"
                  alt="delete"
                  onClick={() => handleDeleteTask(task.id)}
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="filters">
          <div className="dropdown">
            <button
              className="dropbtn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Filter
            </button>
            {dropdownOpen && (
              <div className="dropdown-content">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleFilterChange("all");
                    setDropdownOpen(false);
                  }}
                >
                  All
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleFilterChange("uncompleted");
                    setDropdownOpen(false);
                  }}
                >
                  Uncompleted
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleFilterChange("completed");
                    setDropdownOpen(false);
                  }}
                >
                  Completed
                </a>
              </div>
            )}
          </div>
          <div className="completed-task">
            <p>
              Completed: <span>{tasks.filter((t) => t.completed).length}</span>
            </p>
          </div>
          <div className="remaining-task">
            <p>
              <span id="total-tasks">
                Total tasks: <span id="tasks-counter">{tasks.length}</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
