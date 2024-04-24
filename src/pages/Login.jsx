import LoginForm from "../features/authentication/components/LoginForm";

function Login() {
  return (
    <div className="flex h-full">
      {/* Change image for larger screens */}
      <div className="hidden min-[900px]:block min-[900px]:flex-[2_0_auto]">
        <div className='bg-[url("../../src/assets/pexels-pixabay-262967.jpg")] bg-cover w-full h-full xl:bg-center xl:w-[80%] min-[1800px]:w-[60%]'></div>
      </div>
      {/* LoginForm container for flex layout */}
      <div className="flex items-center justify-center flex-grow xl:justify-start">
        <LoginForm />
      </div>  
    </div>
  );
}

export default Login;
