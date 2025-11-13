import React from "react";
import Label from "@components/form/Label";

const InputArea = ({
  name,
  label,
  type,
  Icon,
  register,
  readOnly,
  defaultValue,
  autocomplete,
  placeholder,
  required = true,
  pattern, // Added pattern as a prop
  patternMessage = "Invalid input", // Optional: Custom error message for pattern validation
}) => {
  return (
    <>
      <Label label={label} />
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-leather-charcoal-600 focus-within:text-leather-black sm:text-base">
              <Icon />
            </span>
          </div>
        )}
        <input
          {...register(`${name}`, {
            required: required ? `${label} is required!` : false,
            pattern: pattern
              ? {
                  value: pattern,
                  message: patternMessage, // Show a custom error message for pattern mismatch
                }
              : undefined,
          })}
          type={type}
          name={name}
          readOnly={readOnly}
          defaultValue={defaultValue}
          placeholder={placeholder}
          autoComplete={autocomplete}
          className={`${
            Icon ? "py-2 pl-10" : "py-2 px-4 md:px-5"
          } w-full appearance-none border text-sm opacity-75 text-input rounded-leather placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-leather-brown h-11 md:h-12 ${
            readOnly
              ? "bg-gray-100 cursor-not-allowed text-leather-charcoal-600"
              : ""
          }`}
        />
      </div>
    </>
  );
};

export default InputArea;
