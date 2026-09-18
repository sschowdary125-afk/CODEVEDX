function EmptyState({ filter }) {
  const message =
    filter === "All"
      ? "No tasks yet"
      : `No ${filter.toLowerCase()} tasks`;

  const description =
    filter === "All"
      ? "Add your first task to get started."
      : "Try changing the filter to see other tasks.";

  return (
    <div className="empty-state">
      <div className="empty-icon">✓</div>

      <h2>{message}</h2>

      <p>{description}</p>
    </div>
  );
}

export default EmptyState;