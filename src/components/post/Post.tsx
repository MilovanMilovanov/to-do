import { ChangeEvent, FormEvent, useState } from "react";
import { PostModel, updatePost } from "../../features/user-posts/postsSlice";
import { useDispatch } from "react-redux";
import Form from "../form/Form";
import Input from "../input/Input";
import Label from "../label/Label";
import useApi from "../../hooks/useApi/useApi";
import Button from "../button/Button";
import Textarea from "../textarea/Textarea";

import styles from "../user/User.module.scss";
// shares the same styles with User component

interface PostPropsModel extends PostModel {
  isCollapsed: boolean;
  handleToggleCollapse: (id: number) => void;
}
function Post(props: PostPropsModel) {
  const { title, body, userId, id, isCollapsed, handleToggleCollapse } = props;
  const { request } = useApi();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<PostModel>({
    title,
    body,
    userId,
    id,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancelChanges = () => {
    setFormData({
      title,
      body,
      userId,
      id,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    async function updateUserPost() {
      request({
        method: "PUT",
        endpoint: `posts/${id}`,
        body: JSON.stringify(formData),
      });

      dispatch(updatePost(formData));
    }

    updateUserPost();
  };

  const isFormDataChanged = formData.title !== title || formData.body !== body;

  return (
    <li className={styles.user}>
      <div
        onClick={() => handleToggleCollapse(id)}
        className={styles.btnExpand}
        aria-expanded={!isCollapsed}
        aria-controls={`post-form-${id}`}
        role="button"
        tabIndex={0}
      >
        <span>Post id: {id}</span>

        <span className={isCollapsed ? styles.arrowDown : styles.arrowUp}>
          {isCollapsed ? "▼" : "▲"}
        </span>
      </div>

      {!isCollapsed && (
        <Form
          title="Post Form"
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
          <Label htmlFor={`title-${formData.title}`}>Title:</Label>
          <Input
            id={`${`title-${formData.title}`}`}
            value={formData.title}
            name="title"
            placeholder="Enter your title"
            onChange={handleInputChange}
          />

          <Label htmlFor={`body-${formData.body}`}>Content:</Label>
          <Textarea
            id={`body-${formData.body}`}
            value={formData.body}
            name="body"
            placeholder="Enter your post"
            rowSize={3}
            onChange={handleInputChange}
          />
        </Form>
      )}
    </li>
  );
}

export default Post;
