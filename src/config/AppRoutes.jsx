import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../features/authentication/hooks/useAuth";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Spinner from "../components/ui/Spinner";
import Welcome from "../pages/Welcome";

function AppRoutes() {
  const { session, loadingSessionData } = useAuth();

  return (
    <Routes>
      <Route index element={<Navigate to="/welcome" replace />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Protected routes go below */}
      <Route
        path="/home"
        element={
          loadingSessionData ? (
            <Spinner />
          ) : session ? (
            <Home />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default AppRoutes;
