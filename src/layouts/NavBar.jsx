import { NavLink, useNavigate } from "react-router-dom";
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
    <nav className="flex items-center justify-between h-20 p-6 bg-primary ">
      <h3 className="text-3xl text-white font-abrilfatface">NourishLink</h3>

      {session && (
        <div className="flex items-center mr-20 text-xl font-bold text-white w-96 justify-evenly font-robotoslab">
          <NavLink
            to={"/feed"}
            className={({ isActive }) =>
              isActive ? "underline decoration-orange underline-offset-8" : ""
            }
          >
            Feed
          </NavLink>
          <NavLink
            to={"/past-donations"}
            className={({ isActive }) =>
              isActive ? "underline decoration-orange underline-offset-8" : ""
            }
          >
            View Past Donations
          </NavLink>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="text-black basis-12"
          >
            <path d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          {renderLogoutButton && <button onClick={handleLogout}>Logout</button>}
        </div>
      )}
    </nav>
  );
}

export default NavBar;

