import "./index.css";
import { Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { lazy } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <div className="min-h-screen bg-[#faf8f3] text-slate-900">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="*"
          element={<h1 className="text-3xl font-bold">404 Not Found</h1>}
        />
      </Routes>
    </div>
  );
}

export default App;
