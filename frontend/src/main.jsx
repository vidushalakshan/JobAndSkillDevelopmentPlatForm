import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ToastProvider from "./common/ToastProvider";
import { UserProvider } from "./context/context";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="442757743683-mvaqtacfefq3b7vhduv8t4nmr8tg55vl.apps.googleusercontent.com">
        <ToastProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </ToastProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
);
