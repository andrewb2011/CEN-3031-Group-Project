import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/authentication/hooks/useAuth";
import { signOut } from "../features/authentication/services/authService";
function NavBar() {
  const [session, loadingSessionData] = useAuth();

  const navigate = useNavigate();
  async function handleLogout() {
    const confirm = window.confirm("Are you sure you wish to logout?");
    if (confirm) {
      await signOut();
      navigate("/login");
    }
  }

  const renderLogoutButton = !loadingSessionData && session;
  return (
    <nav>
      <h3>NourishLink</h3>
      {renderLogoutButton && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

export default NavBar;
