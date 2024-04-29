import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/navbar";
import "./App.css";

import HomePage from "./Pages/homePage";
import Login from "./Pages/login";
import Register from "./Pages/register";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="Content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
