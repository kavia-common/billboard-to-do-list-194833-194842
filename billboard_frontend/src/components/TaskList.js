import React from "react";
import TaskItem from "./TaskItem";

// PUBLIC_INTERFACE
export default function TaskList({ tasks, onToggleComplete, onDelete, onUpdate }) {
  /** Scrollable list of tasks. */
  return (
    <section className="bb-surface bb-list" aria-label="Tasks">
      <div className="bb-list__header">
        <div className="bb-list__title">Tasks</div>
        <div className="bb-list__count" aria-label={`${tasks.length} tasks`}>
          {tasks.length}
        </div>
      </div>

      <div className="bb-list__scroll" role="region" aria-label="Task list" tabIndex={0}>
        {tasks.length === 0 ? (
          <div className="bb-empty" role="status">
            No tasks yet. Add one above.
          </div>
        ) : (
          <ul className="bb-tasks" aria-label="Tasks list">
            {tasks.map((t) => (
              <TaskItem
                key={t.id}
                task={t}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
