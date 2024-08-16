import { ChangeEvent } from "react";

export interface InputModel {
  value: string | number;
  name: string;
  id?: string;
  tabIndex?: number;
  className?: string;
  type?: string;
  rowSize?: number;
  placeholder?: string;
  required?: boolean;
  isDisabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
function Input({
  value,
  name,
  id,
  placeholder,
  required,
  isDisabled,
  className = "",
  onChange,
}: InputModel) {
  return (
    <input
      id={id}
      name={name}
      value={value}
      className={className}
      placeholder={placeholder}
      required={required}
      disabled={isDisabled}
      onChange={onChange}
    />
  );
}

export default Input;
