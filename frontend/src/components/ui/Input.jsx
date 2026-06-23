import { useState } from "react";
import {
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

function Input({
  label,
  type = "text",
  value,
  onChange,
  name,
  placeholder,
}) {

  const [show, setShow] =
    useState(false);

  const inputType =
    type === "password"
      ? show
        ? "text"
        : "password"
      : type;

  return (
    <div className="mb-6">

      <label className="block mb-2 font-medium text-gray-700">

        {label}

      </label>

      <div className="relative">

        <input
          type={inputType}
          value={value}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          className="
          w-full
          rounded-xl
          border
          border-gray-200
          bg-gray-50
          px-5
          py-3
          outline-none
          transition-all
          duration-300
          focus:bg-white
          focus:border-orange-500
          focus:ring-4
          focus:ring-orange-100
          "
        />

        {type === "password" && (

          <button
            type="button"
            onClick={() =>
              setShow(!show)
            }
            className="
            absolute
            right-4
            top-4
            text-gray-500
            "
          >
            {show ? (
              <FiEyeOff />
            ) : (
              <FiEye />
            )}
          </button>

        )}

      </div>

    </div>
  );
}

export default Input;