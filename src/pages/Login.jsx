import LoginForm from "../features/authentication/components/LoginForm";

function Login() {
  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-image-container"></div>
      </div>
      <div className="login-right">    
       <LoginForm />
        {/* Any other JSX can go here. For example, any other components or info that should display in the Login page that is outside the LoginForm */}
      </div>
    </div>
  );
}

export default Login;
