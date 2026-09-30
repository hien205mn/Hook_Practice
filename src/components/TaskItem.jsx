function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <label className={task.completed ? "done" : ""}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        {task.title}
      </label>
      <button onClick={() => onDelete(task.id)}>Xóa</button>
    </li>
  );
}

export default TaskItem;
