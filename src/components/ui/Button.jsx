import { twMerge } from "tailwind-merge";

function Button({ children, disabled, onClick = "", className = "" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        "text-l rounded bg-primary p-2 text-white ",
        className,
      )}
    >
      {children}
    </button>
  );
}
export default Button;
