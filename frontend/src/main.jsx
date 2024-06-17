import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App"; // Import your main App component here
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { AuthProvider } from "./contexts/authContext";

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_API;
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
    <Toaster />
  </React.StrictMode>
);
