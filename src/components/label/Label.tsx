import { ReactNode } from "react";

interface LabelModel {
  htmlFor: string;
  className?: string;
  children?: ReactNode;
}

function Label(props: LabelModel) {
  const { htmlFor, className, children } = props;

  return (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  );
}
export default Label;
