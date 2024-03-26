import RegistrationForm from "../features/authentication/components/RegistrationForm";

function Register() {
  return (
    <div className="flex h-full ">
      <div className="hidden min-[900px]:block min-[900px]:flex-[2_0_auto]   ">
        <div className='bg-[url("../../public/images/registerPageImg.jpg")] bg-cover w-full h-full xl:bg-center xl:w-[80%] min-[1800px]:w-[60%]'></div>
      </div>
      <div className="flex items-center justify-center flex-grow xl:justify-start ">
        <RegistrationForm />
        {/* Any other JSX can go here. For example, any other components or info that should display in the Registration page that is outside the RegistrationForm */}
      </div>
    </div>
  );
}

export default Register;
