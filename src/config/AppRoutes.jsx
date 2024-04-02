import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../features/authentication/hooks/useAuth";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Spinner from "../components/ui/Spinner";
import Welcome from "../pages/Welcome";
import Feed from "../pages/Feed"

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
        path="/feed"
        element={
          loadingSessionData ? (
            <Spinner />
          ) : session ? (
            <Feed user={session.user}/>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default AppRoutes;
