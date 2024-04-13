import { Routes, Route, Navigate, Outlet } from "react-router-dom";
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
import { SessionProvider, useSessionContext } from "../contexts/SessionContext";

function PrivateRoutes() {
  const { session, isLoadingSessionData } = useSessionContext();

  if (isLoadingSessionData) return <Spinner />;
  if (!session) return <Navigate to="/login" />;
  return <Outlet />;
}

function AppRoutes() {
  return (
    <SessionProvider>
      <Routes>
        <Route index element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected routes go below */}
        <Route element={<PrivateRoutes />}>
          <Route
            path="/feed"
            element={
              <PostsProvider>
                <Feed />
              </PostsProvider>
            }
          >
            <Route index element={<Navigate replace to="/feed" />} />
            <Route path=":id" element={<ActiveDetailedCardView />} />
          </Route>
          <Route
            path="/past-donations"
            element={
              <PostsProvider>
                <PastDonations />
              </PostsProvider>
            }
          >
            <Route index element={<Navigate replace to="/past-donations" />} />
            <Route path=":id" element={<PastDetailedCardView />} />
          </Route>
        </Route>
      </Routes>
    </SessionProvider>
  );
}

export default AppRoutes;
