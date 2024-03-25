import { useReducer } from "react";
import { signOut, signUp } from "../services/authService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import styles from "./RegistrationForm.module.css";

function reducer(state, action) {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_ROLE":
      return { ...state, role: action.payload };
    case "SET_USER_NAME":
      return { ...state, user_name: action.payload };
    case "SET_ORGANIZATION_NAME":
      return { ...state, organization_name: action.payload };
    case "TOGGLE_PASSWORD_VISIBILITY":
      return { ...state, isPasswordVisible: !state.isPasswordVisible };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      throw new Error("Invalid action type");
  }
}

const initialState = {
  email: "",
  password: "",
  role: "",
  user_name: "",
  organization_name: "",
  isPasswordVisible: false,
  isLoading: false,
};

function RegistrationForm() {
  const [
    {
      email,
      password,
      role,
      user_name,
      organization_name,
      isPasswordVisible,
      isLoading,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  async function handleRegister(event) {
    event.preventDefault();

    //If either of these attributes is blank then don't proceed
    if (!email || !password || !role || !user_name || !organization_name)
      return;
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const userData = {
        email,
        password,
        options: {
          data: {
            role,
            user_name,
            organization_name,
          },
        },
      };

      const { data, error } = await signUp(userData);
      console.log(data);
      if (error) {
        throw new Error(error.error_description || error.message);
      } else {
        //if successfully logged in, then ...
        await signOut();

        alert("Successfully Registered an Account!");

        navigate("/login");
      }
    } catch (message) {
      alert(message);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <input
        type="email"
        placeholder="Your-email@example.com"
        value={email}
        onChange={(e) =>
          dispatch({ type: "SET_EMAIL", payload: e.target.value })
        }
        required
        style={{ outline: "none" }}
      />
      <input
        type="text"
        placeholder="user_name"
        value={user_name}
        onChange={(e) =>
          dispatch({ type: "SET_USER_NAME", payload: e.target.value })
        }
        required
        style={{ outline: "none" }}
      />
      <div
        style={{
          display: "flex",
          margin: " 10px 0 20px 0",
          padding: "15px",
          alignItems: "center",
          columnGap: "5px",
          width: "75%",
          border: "1px solid #ccc",
          boxSizing: "border-box",
          outline: "none",
        }}
      >
        <input
          type={isPasswordVisible ? "text" : "password"}
          style={{
            width: "100%",
            border: "none",
            padding: 0,
            margin: 0,
            outline: "none",
          }}
          placeholder="Password"
          minLength="8"
          value={password}
          onChange={(e) =>
            dispatch({ type: "SET_PASSWORD", payload: e.target.value })
          }
          required
        />

        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          icon={isPasswordVisible ? faEye : faEyeSlash}
          size="xl"
          onClick={() =>
            dispatch({
              type: "TOGGLE_PASSWORD_VISIBILITY",
            })
          }
        />
      </div>
      <input
        type="text"
        placeholder="organization name"
        value={organization_name}
        onChange={(e) =>
          dispatch({ type: "SET_ORGANIZATION_NAME", payload: e.target.value })
        }
        required
        style={{ outline: "none" }}
      />
      <div>
        <label htmlFor="role-type">Are you a donor or recipient?</label>
        <select
          id="role-type"
          value={role}
          onChange={(e) =>
            dispatch({ type: "SET_ROLE", payload: e.target.value })
          }
        >
          <option value="">---Please choose an option--</option>
          <option value="donor">Donor</option>
          <option value="recipient">Recipient</option>
        </select>
      </div>
      <Link style={{ display: "inline-block" }} to="/login">
        Already have an account? Sign in.
      </Link>
      <Button disabled={isLoading} type="submit">
        Submit
      </Button>
    </form>
  );
}

export default RegistrationForm;
