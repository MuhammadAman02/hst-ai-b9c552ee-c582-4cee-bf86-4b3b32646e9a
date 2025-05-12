import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./index.css";
import { ThemeProvider } from "./components/theme/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="cu-shield-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);