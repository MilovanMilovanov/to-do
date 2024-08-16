import { ChangeEvent } from "react";

interface SelectModel {
  id?: string;
  name: string;
  value: string;
  className?: string;
  filterDefaultText: string;
  options: string[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}
function Select({
  filterDefaultText,
  name,
  id,
  value,
  options,
  className = "",
  onChange,
}: SelectModel) {
  console.log(value);

  return (
    <select
      name={name}
      id={id}
      className={className}
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
    >
      <option value="" disabled>
        {filterDefaultText}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;
