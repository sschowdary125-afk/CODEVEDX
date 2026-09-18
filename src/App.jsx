import { useEffect, useState } from "react";

import "./App.css";

import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import FilterTabs from "./components/FilterTabs";
import EmptyState from "./components/EmptyState";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleTheme = () => {
    setDarkMode((currentMode) => {
      const newMode = !currentMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title: title,
      completed: false,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  };

  const editTask = (id, newTitle) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, title: newTitle }
          : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") {
      return task.completed;
    }

    if (filter === "Pending") {
      return !task.completed;
    }

    return true;
  });

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <main className="dashboard">
        <Header
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
        />

        <TaskInput onAddTask={addTask} />

        <div className="task-stats">
          <div className="stat-item">
            <span>{totalTasks}</span>
            <p>Total</p>
          </div>

          <div className="stat-item">
            <span>{pendingTasks}</span>
            <p>Pending</p>
          </div>

          <div className="stat-item">
            <span>{completedTasks}</span>
            <p>Completed</p>
          </div>
        </div>

        <FilterTabs
          currentFilter={filter}
          onFilterChange={setFilter}
        />

        {filteredTasks.length > 0 ? (
          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        ) : (
          <EmptyState filter={filter} />
        )}
      </main>
    </div>
  );
}

export default App;