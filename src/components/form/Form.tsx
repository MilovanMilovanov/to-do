import { FormEvent, ReactNode } from "react";
import styles from "./Form.module.scss";

interface FormModel {
  children: ReactNode;
  title: string;
  className?: string;
  buttons?: ReactNode;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

function Form({
  title,
  buttons,
  children,
  className = "",
  onSubmit,
}: FormModel) {
  return (
    <form
      className={`${styles.form} ${className}`}
      onSubmit={(e) => onSubmit?.(e)}
    >
      <fieldset>
        <legend className={styles.title}>{title}</legend>
        {children}
        <div className={styles.buttonContainer}>{buttons}</div>
      </fieldset>
    </form>
  );
}

export default Form;
