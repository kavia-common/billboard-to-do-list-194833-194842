import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { loadTasks, saveTasks } from "./utils/storage";

function createTask({ title, notes }) {
  const now = Date.now();
  return {
    id: `t_${now}_${Math.random().toString(16).slice(2)}`,
    title,
    notes: notes || "",
    createdAt: now,
    completed: false,
  };
}

// PUBLIC_INTERFACE
function App() {
  /** Billboard Todo single-page app (localStorage persistence; no backend). */
  const [tasks, setTasks] = useState(() => loadTasks());

  // Persist on changes
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const sortedTasks = useMemo(() => {
    // Incomplete first; within each, newest first
    return [...tasks].sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return b.createdAt - a.createdAt;
    });
  }, [tasks]);

  const handleAddTask = ({ title, notes }) => {
    setTasks((prev) => [createTask({ title, notes }), ...prev]);
  };

  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdate = (id, updates) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  return (
    <div className="bb-app">
      <div className="bb-bg" aria-hidden="true" />
      <Header />

      <main className="bb-main" role="main">
        <div className="bb-container">
          <TaskForm onAddTask={handleAddTask} />
          <TaskList
            tasks={sortedTasks}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
          <footer className="bb-footer" aria-label="Footer">
            <span className="bb-muted">
              Stored locally in your browser. No account. No backend.
            </span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
