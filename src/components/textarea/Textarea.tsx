import { ChangeEvent, useEffect, useRef } from "react";
import { InputModel } from "../input/Input";

function Textarea({
  id,
  name,
  value,
  placeholder,
  rowSize,
  className = "",
  onChange,
}: InputModel) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      style={{ overflow: "hidden", maxHeight: "10rem" }}
      id={id}
      name={name}
      rows={rowSize}
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={onChange as (e: ChangeEvent<HTMLElement>) => void}
    />
  );
}

export default Textarea;
