import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/navbar";
import "./App.css";

import HomePage from "./Pages/homePage";
import Login from "./Pages/login";
import Register from "./Pages/register";
import UploadPost from "./Pages/uploadPost";
import PageNotFound from "./Pages/PageNotFound";
import ExplorePosts from "./Pages/explorePosts";
import DetailPost from "./Pages/DetailPost";
import UserProfile from "./Pages/userProfile";
import PrivateRoute from "./Components/Routes/Private";

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
            <Route path="/createPost" element={<PrivateRoute />}>
              <Route path="" element={<UploadPost />} />
            </Route>
            <Route path="/explorePosts" element={<ExplorePosts />} />
            <Route path="/detailsPost/:id" element={<DetailPost />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
