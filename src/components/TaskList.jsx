import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle, onDelete, onEdit }) {
      return (
    <section className="task-list">
      {tasks.map((task) => (
        <TaskItem
  key={task.id}
  task={task}
  onToggle={onToggle}
  onDelete={onDelete}
  onEdit={onEdit}
/>
      ))}
    </section>
  );
}

export default TaskList;