import { useState, useEffect } from "react";

// Custom hook: giống useState nhưng tự động lưu dữ liệu vào localStorage
function useLocalStorage(key, initialValue) {
  // Lấy dữ liệu đã lưu (nếu có), nếu chưa có thì dùng initialValue
  const savedData = localStorage.getItem(key);
  const [value, setValue] = useState(
    savedData ? JSON.parse(savedData) : initialValue
  );

  // Mỗi khi value thay đổi thì lưu lại vào localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
