import { ReactNode } from "react";

type BtnType = "submit" | "reset" | "button";

interface ButtonModel {
  className?: string;
  type?: BtnType;
  isDisabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

function Button({
  type = "button",
  className,
  isDisabled = false,
  children,
  onClick,
}: ButtonModel) {
  return (
    <button
      className={className}
      type={type}
      disabled={isDisabled}
      onClick={() => onClick?.()}
    >
      {children}
    </button>
  );
}

export default Button;
