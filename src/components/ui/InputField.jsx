import { useState } from "react";
import { twMerge } from "tailwind-merge";

export function InputField({
  labelName,
  type,
  value,
  onChange,
  placeholder = "",
  children = "",
  disableTransition = false,
  className = "",
  error = "", // This is the error message on submit, if applicable
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  function HandleErrorField() {}

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
      {error && <span className="text-sm text-red-500 ">{error}</span>}
    </div>
  );
}
