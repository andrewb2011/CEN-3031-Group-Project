import RegistrationForm from "../features/authentication/components/RegistrationForm";

function Register() {
  return (
    <div className="register-container">
      <div className="left">
        <div className="image-container"></div>
      </div>
      <div className="right">
        <RegistrationForm />
        {/* Any other JSX can go here. For example, any other components or info that should display in the Registration page that is outside the RegistrationForm */}
      </div>
    </div>
  );
}

export default Register;
