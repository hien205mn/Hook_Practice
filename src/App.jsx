import { useState, useContext } from "react";
import "./App.css";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { ThemeContext } from "./context/ThemeContext";
import useLocalStorage from "./hooks/useLocalStorage";
import { initialTasks } from "./tasks";

function App() {
  const { theme } = useContext(ThemeContext);

  // Danh sách công việc được lưu vào localStorage
  const [tasks, setTasks] = useLocalStorage("tasks", initialTasks);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Thêm công việc mới
  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title: title,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  // Đổi trạng thái hoàn thành / chưa làm
  const toggleTask = (id) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  // Xóa công việc
  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  // Lọc theo trạng thái và từ khóa tìm kiếm
  const filteredTasks = tasks.filter((task) => {
    if (filter === "todo" && task.completed) return false;
    if (filter === "done" && !task.completed) return false;
    return task.title.toLowerCase().includes(search.toLowerCase());
  });

  // Thống kê
  const total = tasks.length;
  const doneCount = tasks.filter((task) => task.completed).length;
  const todoCount = total - doneCount;

  return (
    <div className={`app ${theme}`}>
      <div className="container">
        <Header />

        <TaskForm onAdd={addTask} />

        <div className="toolbar">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Tất cả</option>
            <option value="todo">Chưa làm</option>
            <option value="done">Hoàn thành</option>
          </select>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <p className="stats">
          Tổng: {total} | Chưa làm: {todoCount} | Hoàn thành: {doneCount}
        </p>

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;
