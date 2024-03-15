import React from "react";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-between w-12 h-6 p-1 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden"
      aria-label="Toggle theme"
    >
      {/* Sun Icon */}
      <div
        className={`w-4 h-4 transform ${
          theme === "light" ? "translate-x-6" : "translate-x-0"
        } transition-transform duration-300`}
      >
        <svg
          className="w-4 h-4 text-yellow-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.293-.293l1.414 1.414M6.343 17.657l1.414-1.414M17.657 6.343l-1.414 1.414M7.757 7.757l1.414-1.414M12 5a7 7 0 000 14 7 7 0 000-14z"
          />
        </svg>
      </div>
      {/* Moon Icon */}
      <div
        className={`w-4 h-4 transform ${
          theme === "dark" ? "translate-x-6" : "translate-x-0"
        } transition-transform duration-300`}
      >
        <svg
          className="w-4 h-4 text-gray-800 dark:text-gray-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12.79A9 9 0 0111.21 3 7 7 0 0012 21a9 9 0 009-8.21z"
          />
        </svg>
      </div>
    </button>
  );
};

export default ThemeToggler;
