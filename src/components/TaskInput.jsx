import { useState } from "react";

function TaskInput({ onAddTask }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    onAddTask(title.trim());
    setTitle("");
  };

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <button type="submit">
        Add
      </button>
    </form>
  );
}

export default TaskInput;