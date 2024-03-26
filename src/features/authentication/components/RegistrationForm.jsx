import { useReducer, useState } from "react";
import { signOut, signUp } from "../services/authService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { twMerge } from "tailwind-merge";

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

function TextInputField({
  labelName,
  type,
  value,
  onChange,
  placeholder = "",
  children = "",
  disableTransition = false,
  className = "",
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  return (
    <div
      className={twMerge("relative", className)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <input
        className="border rounded p-1 outline-none border-solid border-[#808080] bg-transparent w-full "
        type={type}
        placeholder={""}
        value={value}
        onChange={(e) => {
          e.target.value.length > 0
            ? setHasContent(true)
            : setHasContent(false);
          onChange(e);
        }}
      />
      <span
        className={twMerge(
          "absolute left-0 p-2 text-sm uppercase pointer-events-none font-robotoslab text-footer transition",
          (isFocused || hasContent) &&
            !disableTransition &&
            "text-black text-xs translate-x-2 -translate-y-2 py-0 bg-secondary tracking-widest   "
        )}
      >
        {labelName}
      </span>
      {children}
    </div>
  );
}

function RegistrationForm({ className }) {
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
    if (!email || !password || !user_name || !organization_name) return;
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
    <div className={twMerge("w-1/2", className)}>
      <h1 className="text-4xl text-center font-abrilfatface">Create Account</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-6 mt-4">
        <TextInputField
          labelName="Email Address"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            dispatch({ type: "SET_EMAIL", payload: e.target.value })
          }
        />
        <TextInputField
          labelName="Username"
          type="text"
          placeholder="user_name"
          value={user_name}
          onChange={(e) =>
            dispatch({ type: "SET_USER_NAME", payload: e.target.value })
          }
        />

        <TextInputField
          labelName={"Password"}
          type={isPasswordVisible ? "text" : "password"}
          placeholder="password"
          value={password}
          onChange={(e) =>
            dispatch({ type: "SET_PASSWORD", payload: e.target.value })
          }
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
        </TextInputField>
        <TextInputField
          labelName="Organization Name"
          type="text"
          placeholder="organization name"
          value={organization_name}
          onChange={(e) =>
            dispatch({ type: "SET_ORGANIZATION_NAME", payload: e.target.value })
          }
        />
        <TextInputField
          labelName="Are you a donor?"
          type="checkbox"
          value={role}
          onChange={(e) =>
            dispatch({ type: "SET_ROLE", payload: e.target.value })
          }
          disableTransition={true}
          className="flex items-center "
        />

        <Link to="/login" className="font-bold">
          Already have an account?{" "}
          <span className="text-blue-500">Sign in</span>
        </Link>
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
