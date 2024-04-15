import React from "react";
import ReactDOM from "react-dom/client";
import "@radix-ui/themes/styles.css";
import App from "./App.jsx";
import { MessageProvider } from "./hooks/useMessage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MessageProvider>
      <App />
    </MessageProvider>
  </React.StrictMode>
);
