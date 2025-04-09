import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ToastProvider from "./common/ToastProvider";
import { UserProvider } from "./context/context";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <UserProvider>
        <App />
        </UserProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>
);
