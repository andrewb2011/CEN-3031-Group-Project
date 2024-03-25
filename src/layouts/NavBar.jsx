import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../features/authentication/hooks/useAuth";
import { signOut } from "../features/authentication/services/authService";
function NavBar() {
  const { session, loadingSessionData } = useAuth();

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
    <nav className="flex h-20 items-center justify-between bg-primary p-6 ">
      <h3 className="font-abrilfatface text-3xl text-white">NourishLink</h3>
      {renderLogoutButton && <button onClick={handleLogout}>Logout</button>}

      {session && (
        <div className="mr-20 flex w-96 items-center justify-evenly font-robotoslab text-xl font-bold text-white">
          <NavLink
            to={"/login"}
            className={({ isActive }) =>
              isActive ? "underline decoration-orange underline-offset-8" : ""
            }
          >
            Feed
          </NavLink>
          <NavLink
            to={"/register"}
            className={({ isActive }) =>
              isActive ? "underline decoration-orange underline-offset-8" : ""
            }
          >
            View Past Donation
          </NavLink>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="basis-12 text-black"
          >
            <path d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
