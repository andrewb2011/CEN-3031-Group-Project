import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import { signIn } from "../services/authService";
import Button from "../../../components/ui/Button"; 
import { InputField } from "../../../components/ui/InputField"; 
import { twMerge } from "tailwind-merge";

function Login({ className }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();

    if (!email || !password) return;
    try {
      setIsLoading(true);
      const { error } = await signIn({ email, password });

      if (error) {
        alert("Failed to log in: " + error.message);
      } else {
        alert("Successfully logged in!");
        navigate("/feed");
      }
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={twMerge("w-1/2", className)}>
      <h1 className="text-4xl text-center font-abrilfatface">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-6 mt-4">
        <InputField
          labelName="Email Address"
          type="email"
          placeholder="Your-email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          labelName="Password"
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        >
          <FontAwesomeIcon
            data-testid="eyeTest"
            className="absolute right-0 p-1 cursor-pointer"
            icon={isPasswordVisible ? faEye : faEyeSlash}
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        </InputField>
        <div className="flex justify-center">
          <Button
            disabled={isLoading}
            type="submit"
            className="px-6 py-2 text-xl font-bold font-robotoslab hover:bg-green-500"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </div>
        <div className="text-center">
          Don't have an account? <span></span> 
          <Link to="/register" className="font-bold text-blue-500 hover:underline">
             Create one!
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
