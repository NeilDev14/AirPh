"use client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollarCircle } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}
const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollarCircle
          size={25}
          className="text-neutral-400 absolute top-5 left-2"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`peer w-full mt-5 p-4 pt-5 font-light bg-white border-2 rounded-lg outline-none transition disabled:opacity-70 disabled:cursor-not-allowed 
        ${formatPrice ? "pl-9" : "pl-4"} 
        ${errors[id] ? "border-red-500" : "border-neutral-300"} 
          ${errors[id] ? "text-zinc-400" : "focus:border-zinc-500"}
          `}
      />
      <div className="ml-2 text-red-500">{`${
        errors[id] ? "Please fill required field." : ""
      }`}</div>
      <label
        className={`absolute text-sm duration-150 transform -translate-y-3 top-9 z-10 origin-[0] ${
          formatPrice ? "left-9" : "left-4"
        } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 perr-focus:scale-75 peer-focus:-translate-y-4
        ${errors[id] ? "text-red-500" : "text-zinc-400"}
        `}
      >
        {label}&nbsp;
        {`${errors[id] ? "*" : ""}`}
      </label>
    </div>
  );
};

export default Input;
