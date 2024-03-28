import { useReducer, useState } from "react";
import { signOut, signUp } from "../services/authService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { twMerge } from "tailwind-merge";
import { InputField } from "../../../components/ui/InputField";

function reducer(state, action) {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_ROLE":
      return { ...state, role: !state.role };
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
  role: false,
  user_name: "",
  organization_name: "",
  isPasswordVisible: false,
  isLoading: false,
};

function RegistrationForm({ className }) {
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [usernameErrorMessage, setUserNameErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [orgNameErrorMessage, setOrgNameErrorMessage] = useState("");

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
    setEmailErrorMessage("");
    setUserNameErrorMessage("");
    setPasswordErrorMessage("");
    setOrgNameErrorMessage("");

    //If either of these attributes is blank then don't proceed
    if (!email || !password || !user_name || !organization_name) {
      if (!email) setEmailErrorMessage("Email is required");
      if (!password) setPasswordErrorMessage("Password is required");
      if (!user_name) setUserNameErrorMessage("Username is required");
      if (!organization_name)
        setOrgNameErrorMessage("Organization name is required");
      return;
    }
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const userData = {
        email,
        password,
        options: {
          data: {
            //test this to see if it works
            role: role ? "donor" : "recipient",
            user_name,
            organization_name,
          },
        },
      };

      const { data, error } = await signUp(userData);

      if (error) {
        //console.log(error.message);
        throw new Error(error.message);
      } else {
        //if successfully logged in, then ...

        await signOut();

        alert("Successfully Registered an Account!");

        navigate("/login");
      }
    } catch (error) {
      // if email is already registered, set email error to this string
      if (error.message === "User already registered")
        setEmailErrorMessage("This email already exists");
      if (
        // if username is already registered, set email error to this string
        error.message ===
        `duplicate key value violates unique constraint "profiles_user_name_key"`
      )
        setUserNameErrorMessage("This username already exists");
      if (
        error.message ===
        `duplicate key value violates unique constraint "profiles_organization_name_key"`
      )
        setOrgNameErrorMessage("Organization name already exists");
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  return (
    <div className={twMerge("w-1/2", className)}>
      <h1 className="text-4xl text-center font-abrilfatface">Create Account</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-6 mt-4">
        <InputField
          labelName="Email Address"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            dispatch({ type: "SET_EMAIL", payload: e.target.value })
          }
          errorMessage={emailErrorMessage}
        />
        <InputField
          labelName="Username"
          type="text"
          placeholder="user_name"
          value={user_name}
          onChange={(e) =>
            dispatch({ type: "SET_USER_NAME", payload: e.target.value })
          }
          erroMessage={usernameErrorMessage}
        />

        <InputField
          labelName={"Password"}
          type={isPasswordVisible ? "text" : "password"}
          placeholder="password"
          value={password}
          onChange={(e) =>
            dispatch({ type: "SET_PASSWORD", payload: e.target.value })
          }
          errorMessage={passwordErrorMessage}
        >
          <FontAwesomeIcon
            className="absolute right-0 p-1 cursor-pointer"
            icon={isPasswordVisible ? faEye : faEyeSlash}
            size="xl"
            onClick={() =>
              dispatch({
                type: "TOGGLE_PASSWORD_VISIBILITY",
              })
            }
          />
        </InputField>
        <InputField
          labelName="Organization Name"
          type="text"
          placeholder="organization name"
          value={organization_name}
          onChange={(e) =>
            dispatch({ type: "SET_ORGANIZATION_NAME", payload: e.target.value })
          }
          error={orgNameErrorMessage}
        />
        <InputField
          labelName="Are you a donor?"
          type="checkbox"
          value={role}
          onChange={(e) =>
            dispatch({ type: "SET_ROLE", payload: e.target.value })
          }
          disableTransition={true}
          className="flex items-center "
        />
        <div className="flex gap-2">
          <p>Already have an account? </p>
          <Link to="/login" className="font-bold">
            <span className="text-blue-500">Sign in</span>
          </Link>
        </div>
        <Button
          disabled={isLoading}
          type="submit"
          className="self-center px-6 font-bold font-robotoslab hover:bg-green-500 lg:text-xl"
        >
          Create
        </Button>
      </form>
    </div>
  );
}

export default RegistrationForm;
