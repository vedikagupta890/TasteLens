import { Routes, Route } from "react-router-dom";

import Login from "./Login.jsx";
import Signup from "./signup.jsx";
import Logout from "./Logout.jsx";
import Home from "./Home";
import UserProfile from "./Profile";
import Dashboard from "./Dashboard";
import DishPage from "./DishPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dish/:id" element={<DishPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}

export default App;
