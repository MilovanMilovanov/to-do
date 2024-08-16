import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import {
  updateUser,
  UserModel,
} from "../../features/user-management/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Form from "../form/Form";
import Input from "../input/Input";
import Button from "../button/Button";
import Label from "../label/Label";
import styles from "./User.module.scss";

interface UserComponentModel extends UserModel {
  isCollapsable: boolean;
  className?: string;
  isCollapsed?: boolean;
  handleToggleCollapse?: (id: number) => void;
}

function User(props: UserComponentModel) {
  const {
    username,
    email,
    city,
    street,
    suite,
    id,
    isCollapsed,
    isCollapsable,
    className,
    handleToggleCollapse,
  } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username,
    email,
    city,
    street,
    suite,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancelChanges = useCallback(() => {
    setFormData({
      username,
      email,
      city,
      street,
      suite,
    });
  }, [username, email, city, street, suite]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updateUser({ id, ...formData }));
  };

  const redirectBasedOnCollapsibility = () => {
    if (isCollapsable) {
      navigate(`/posts/${id}`);
    } else {
      navigate("/");
    }
  };

  const isFormDataChanged =
    formData.username !== username ||
    formData.email !== email ||
    formData.city !== city ||
    formData.street !== street ||
    formData.suite !== suite;

  return (
    <li className={`${styles.user} ${className}`}>
      <div
        onClick={() => isCollapsable && handleToggleCollapse?.(id)}
        className={styles.btnExpand}
        aria-expanded={!isCollapsed}
        aria-controls={`user-form-${id}`}
        role="button"
        tabIndex={0}
      >
        <span
          className={`${styles.userName} ${
            !isCollapsable ? styles["userName--fullWidth"] : ""
          }`}
        >
          {username}
        </span>

        {isCollapsable ? (
          <span className={isCollapsed ? styles.arrowDown : styles.arrowUp}>
            {isCollapsed ? "▼" : "▲"}
          </span>
        ) : (
          ""
        )}
      </div>

      <Button
        className={styles.btnPosts}
        onClick={redirectBasedOnCollapsibility}
      >
        {isCollapsable ? `Go to ${username}'s posts` : "Go back"}
      </Button>

      {!isCollapsed && (
        <Form
          title="User Form"
          onSubmit={handleSubmit}
          buttons={
            <>
              <Button
                type="reset"
                className={styles.revertChanges}
                isDisabled={!isFormDataChanged}
                onClick={handleCancelChanges}
              >
                revert changes
              </Button>
              <Button
                type="submit"
                className={styles.submitChanges}
                isDisabled={!isFormDataChanged}
              >
                submit changes
              </Button>
            </>
          }
        >
          <Label className={styles.labelText} htmlFor={`username-${id}`}>
            Name:
          </Label>
          <Input
            id={`username-${id}`}
            value={formData.username}
            name="username"
            placeholder="Enter Name"
            required={true}
            onChange={handleInputChange}
          />

          <Label className={styles.labelText} htmlFor={`email-${id}`}>
            Email:
          </Label>
          <Input
            id={`email-${id}`}
            value={formData.email}
            name="email"
            placeholder="Enter Email"
            required={true}
            onChange={handleInputChange}
          />

          <Label className={styles.labelText} htmlFor={`city-${id}`}>
            City:
          </Label>
          <Input
            id={`city-${id}`}
            value={formData.city}
            name="city"
            placeholder="Enter City"
            required={true}
            onChange={handleInputChange}
          />

          <Label className={styles.labelText} htmlFor={`street-${id}`}>
            Street:
          </Label>
          <Input
            id={`street-${id}`}
            value={formData.street}
            name="street"
            placeholder="Enter Street"
            required={true}
            onChange={handleInputChange}
          />

          <Label className={styles.labelText} htmlFor={`suite-${id}`}>
            Suite:
          </Label>
          <Input
            id={`suite-${id}`}
            value={formData.suite}
            name="suite"
            placeholder="Enter suite"
            required={true}
            onChange={handleInputChange}
          />
        </Form>
      )}
    </li>
  );
}

export default User;
