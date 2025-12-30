/**
 * Local storage helpers for the Billboard Todo app.
 * Intentionally contains no references to any backend env vars.
 */

const STORAGE_KEY = "billboard:tasks:v1";

/**
 * Generates a small set of sample tasks for first run.
 * Kept deterministic and simple.
 */
function getSampleTasks() {
  const now = Date.now();
  return [
    {
      id: `t_${now}_1`,
      title: "Welcome to Billboard",
      notes: "Add tasks, edit inline, and they’ll persist in this browser.",
      createdAt: now - 1000 * 60 * 10,
      completed: false,
    },
    {
      id: `t_${now}_2`,
      title: "Try editing a task",
      notes: "Click Edit, change the title/notes, then Save. Press Esc to cancel.",
      createdAt: now - 1000 * 60 * 6,
      completed: false,
    },
    {
      id: `t_${now}_3`,
      title: "Mark a task complete",
      notes: "",
      createdAt: now - 1000 * 60 * 3,
      completed: true,
    },
  ];
}

// PUBLIC_INTERFACE
export function loadTasks() {
  /** Load tasks from localStorage. If empty/missing, return sample tasks. */
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getSampleTasks();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return getSampleTasks();
    return parsed;
  } catch {
    // If storage is unavailable/corrupt, fall back to samples (no crash).
    return getSampleTasks();
  }
}

// PUBLIC_INTERFACE
export function saveTasks(tasks) {
  /** Persist tasks to localStorage. */
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Ignore write errors (private mode, quota, etc.) to keep app functional.
  }
}
