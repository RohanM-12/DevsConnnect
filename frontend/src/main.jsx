import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App"; // Import your main App component here
import { Toaster } from "react-hot-toast";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>
);
