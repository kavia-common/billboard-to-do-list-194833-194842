import React, { useMemo, useState } from "react";

// PUBLIC_INTERFACE
export default function TaskForm({ onAddTask }) {
  /** Form to add a new task (title required, notes optional). */
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [touched, setTouched] = useState(false);

  const titleError = useMemo(() => {
    if (!touched) return "";
    if (title.trim().length === 0) return "Title is required.";
    return "";
  }, [title, touched]);

  const canSubmit = title.trim().length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);

    if (!canSubmit) return;

    onAddTask({
      title: title.trim(),
      notes: notes.trim(),
    });

    setTitle("");
    setNotes("");
    setTouched(false);
  };

  return (
    <section className="bb-surface bb-form" aria-label="Add a task">
      <form onSubmit={handleSubmit} className="bb-form__grid">
        <div className="bb-field">
          <label className="bb-label" htmlFor="task-title">
            Task title <span className="bb-required">*</span>
          </label>
          <input
            id="task-title"
            className={`bb-input ${titleError ? "bb-input--error" : ""}`}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="e.g., Plan next week"
            aria-invalid={Boolean(titleError)}
            aria-describedby={titleError ? "task-title-error" : undefined}
            autoComplete="off"
          />
          {titleError ? (
            <div id="task-title-error" className="bb-error" role="alert">
              {titleError}
            </div>
          ) : (
            <div className="bb-help">Press Enter to add.</div>
          )}
        </div>

        <div className="bb-field">
          <label className="bb-label" htmlFor="task-notes">
            Notes <span className="bb-muted">(optional)</span>
          </label>
          <textarea
            id="task-notes"
            className="bb-textarea"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add details…"
            rows={3}
          />
        </div>

        <div className="bb-form__actions">
          <button className="bb-btn bb-btn--primary" type="submit" disabled={!canSubmit}>
            Add
          </button>
        </div>
      </form>
    </section>
  );
}
