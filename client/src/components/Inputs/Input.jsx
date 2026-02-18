import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <label className="text-[13px] text-slate-800">{label}</label>

      <div className={`input-box ${showPassword ? "border-primary" : ""}`}>
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm placeholder:text-slate-400"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={20}
                className="text-primary cursor-pointer hover:text-blue-600 transition-colors"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEyeSlash
                size={20}
                className="text-slate-400 cursor-pointer hover:text-slate-600 transition-colors"
                onClick={() => toggleShowPassword()}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Input;