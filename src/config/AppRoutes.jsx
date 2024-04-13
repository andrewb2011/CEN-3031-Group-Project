import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../features/authentication/hooks/useAuth";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Spinner from "../components/ui/Spinner";
import Welcome from "../pages/Welcome";
import Feed from "../pages/Feed";
import PastDonations from "../pages/PastDonations";
import { PostsProvider } from "../features/donation/contexts/PostsContext";

import PastDetailedCardView from "../features/donation/components/PastDetailedCardView";
import ActiveDetailedCardView from "../features/donation/components/ActiveDetailedCardView";

function AppRoutes() {
  const [session, loadingSessionData] = useAuth();

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
            <Feed user={session.user} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route index element={<Navigate replace to="/feed" />} />
        <Route path=":id" element={<ActiveDetailedCardView />} />
      </Route>
      {/*This is also a protected route */}

      <Route
        path="/past-donations"
        element={
          loadingSessionData ? (
            <Spinner />
          ) : session ? (
            <PostsProvider>
              <PastDonations user={session.user} />
            </PostsProvider>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route index element={<Navigate replace to="/past-donations" />} />
        <Route path=":id" element={<PastDetailedCardView />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
