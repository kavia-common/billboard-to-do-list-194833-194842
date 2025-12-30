import React, { useEffect, useMemo, useRef, useState } from "react";

function formatTimestamp(ts) {
  const d = new Date(ts);
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// PUBLIC_INTERFACE
export default function TaskItem({ task, onToggleComplete, onDelete, onUpdate }) {
  /** A single task row with inline editing. */
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);
  const [draftNotes, setDraftNotes] = useState(task.notes || "");
  const [touched, setTouched] = useState(false);

  const titleInputRef = useRef(null);

  useEffect(() => {
    // Keep drafts synced when task changes (e.g., after save).
    if (!isEditing) {
      setDraftTitle(task.title);
      setDraftNotes(task.notes || "");
      setTouched(false);
    }
  }, [isEditing, task.title, task.notes]);

  useEffect(() => {
    if (isEditing) titleInputRef.current?.focus();
  }, [isEditing]);

  const titleError = useMemo(() => {
    if (!touched) return "";
    if (draftTitle.trim().length === 0) return "Title is required.";
    return "";
  }, [draftTitle, touched]);

  const handleStartEdit = () => {
    setIsEditing(true);
    setTouched(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setDraftTitle(task.title);
    setDraftNotes(task.notes || "");
    setTouched(false);
  };

  const handleSave = () => {
    setTouched(true);
    if (draftTitle.trim().length === 0) return;

    onUpdate(task.id, {
      title: draftTitle.trim(),
      notes: draftNotes.trim(),
    });
    setIsEditing(false);
    setTouched(false);
  };

  const handleKeyDown = (e) => {
    if (!isEditing) return;
    if (e.key === "Escape") {
      e.preventDefault();
      handleCancelEdit();
    }
  };

  const notesDisplay = (task.notes || "").trim();
  const createdText = formatTimestamp(task.createdAt);

  return (
    <li className={`bb-task ${task.completed ? "bb-task--completed" : ""}`} aria-label="Task">
      <div className="bb-task__left">
        <label className="bb-toggle">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            aria-label={task.completed ? "Mark task incomplete" : "Mark task complete"}
          />
          <span className="bb-toggle__box" aria-hidden="true" />
        </label>
      </div>

      <div className="bb-task__main" onKeyDown={handleKeyDown}>
        {!isEditing ? (
          <>
            <div className="bb-task__titleRow">
              <div className="bb-task__title">{task.title}</div>
              <div className="bb-task__meta" aria-label={`Created ${createdText}`}>
                {createdText}
              </div>
            </div>

            {notesDisplay ? (
              <div className="bb-task__notes bb-truncate" title={notesDisplay}>
                {notesDisplay}
              </div>
            ) : (
              <div className="bb-task__notes bb-muted">No notes</div>
            )}
          </>
        ) : (
          <div className="bb-edit" aria-label="Edit task">
            <div className="bb-field">
              <label className="bb-label" htmlFor={`edit-title-${task.id}`}>
                Title <span className="bb-required">*</span>
              </label>
              <input
                id={`edit-title-${task.id}`}
                ref={titleInputRef}
                className={`bb-input ${titleError ? "bb-input--error" : ""}`}
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                onBlur={() => setTouched(true)}
                aria-invalid={Boolean(titleError)}
                aria-describedby={titleError ? `edit-title-error-${task.id}` : undefined}
              />
              {titleError ? (
                <div id={`edit-title-error-${task.id}`} className="bb-error" role="alert">
                  {titleError}
                </div>
              ) : (
                <div className="bb-help">Press Esc to cancel.</div>
              )}
            </div>

            <div className="bb-field">
              <label className="bb-label" htmlFor={`edit-notes-${task.id}`}>
                Notes
              </label>
              <textarea
                id={`edit-notes-${task.id}`}
                className="bb-textarea"
                value={draftNotes}
                onChange={(e) => setDraftNotes(e.target.value)}
                rows={3}
              />
            </div>

            <div className="bb-edit__actions">
              <button className="bb-btn bb-btn--primary" type="button" onClick={handleSave}>
                Save
              </button>
              <button className="bb-btn" type="button" onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bb-task__right">
        {!isEditing ? (
          <button className="bb-btn bb-btn--ghost" type="button" onClick={handleStartEdit}>
            Edit
          </button>
        ) : null}

        <button
          className="bb-btn bb-btn--danger"
          type="button"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
