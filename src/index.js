import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { IconContext } from "react-icons";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <IconContext.Provider value={{ className: "react-icons" }}>
        <App />
      </IconContext.Provider>
    </ThemeProvider>
  </React.StrictMode>
);
