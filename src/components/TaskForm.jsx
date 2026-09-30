import { useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      alert("Vui lòng nhập tên công việc!");
      return;
    }

    onAdd(title.trim());
    setTitle(""); // xóa ô input sau khi thêm
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nhập tên công việc..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Thêm</button>
    </form>
  );
}

export default TaskForm;
