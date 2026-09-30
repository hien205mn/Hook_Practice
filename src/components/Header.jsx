import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="header">
      <h2>Mini Task Manager</h2>
      <button onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </div>
  );
}

export default Header;
