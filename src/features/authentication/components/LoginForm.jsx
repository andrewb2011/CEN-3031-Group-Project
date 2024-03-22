import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { signIn } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();

    //If either of these attributes is blank then don't proceed
    if (!email || !password) return;
    try {
      setIsLoading(true);
      const userData = {
        email,
        password,
      };
      const { error } = await signIn(userData);

      if (error) {
        throw new Error(error.error_description || error.message);
      } else {
        //if successfully logged in, then ...
        alert("Successfully logged in!");
        navigate("/home");
      }
    } catch (message) {
      alert(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Your-email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          icon={isPasswordVisible ? faEye : faEyeSlash}
          size="xl"
          onClick={() => setIsPasswordVisible((state) => !state)}
        />
      </div>
      <Link to="/register">Create account</Link>
      <button
        style={{ marginBottom: "20px" }}
        disabled={isLoading}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}

export default Login;
