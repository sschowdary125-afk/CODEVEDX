import { useState } from "react";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = () => {
    if (!editTitle.trim()) {
      return;
    }

    onEdit(task.id, editTitle.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <>
          <input
            className="edit-input"
            type="text"
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
            autoFocus
          />

          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <button
            className="task-check"
            onClick={() => onToggle(task.id)}
            aria-label="Mark task as completed"
          >
            {task.completed ? "✓" : ""}
          </button>

          <span className="task-title">
            {task.title}
          </span>

          <button
            className="edit-button"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>

          <button
            className="delete-button"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default TaskItem;