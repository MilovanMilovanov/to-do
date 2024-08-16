import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  addPost,
  deletePost,
  PostModel,
  setPosts,
} from "../../features/user-posts/postsSlice";
import { RootState } from "../../store";
import useApi from "../../hooks/useApi/useApi";
import Post from "../post/Post";
import Button from "../button/Button";

import Form from "../form/Form";
import Input from "../input/Input";
import Label from "../label/Label";
import Textarea from "../textarea/Textarea";

import styles from "./PostList.module.scss";

const initialFormData = {
  title: "",
  body: "",
};

function PostList() {
  const { id } = useParams();
  const { request } = useApi();
  const dispatch = useDispatch();
  const [formData, setFormData] =
    useState<Pick<PostModel, "title" | "body">>(initialFormData);

  const userPosts = useSelector(
    (state: RootState) => state.userPosts[Number(id)]
  );

  const [isPostExpanded, setIsPostExpanded] = useState<number | null>(null);
  const [isAddPostExpanded, setIsAddPostExpanded] = useState<boolean>(false);

  useEffect(() => {
    async function fetchUserPosts() {
      const posts = await request({
        endpoint: "posts",
        params: {
          userId: id,
        },
      });

      dispatch(setPosts(posts));
    }
    if (!userPosts) fetchUserPosts();
  }, [id, userPosts, request, dispatch]);

  const handleToggleCollapse = useCallback((id: number) => {
    setIsPostExpanded((prevId) => (prevId === id ? null : id));
    setIsAddPostExpanded(false);
  }, []);

  const toggleAddPostCollapse = () => setIsAddPostExpanded((prev) => !prev);

  const handleDeletePost = (postId: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (isConfirmed) {
      request({
        method: "DELETE",
        endpoint: `posts/${postId}`,
      });

      dispatch(deletePost({ postId, userId: Number(id) }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    request({
      method: "POST",
      endpoint: "posts",
      body: JSON.stringify(formData),
    });

    dispatch(addPost({ ...formData, userId: Number(id), id: 0 }));
    setFormData(initialFormData);
    setIsAddPostExpanded(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className={`${styles.postList}`}>
      <div
        onClick={toggleAddPostCollapse}
        className={`${styles.btnExpand} ${styles["btnExpand--addPost"]}`}
        aria-expanded={!isAddPostExpanded}
        aria-controls="Add-post-form"
        role="button"
        tabIndex={0}
      >
        <span>Add New Post</span>

        <span className={isAddPostExpanded ? styles.arrowDown : styles.arrowUp}>
          {isAddPostExpanded ? "▼" : "▲"}
        </span>
      </div>
      {isAddPostExpanded && (
        <Form
          className={styles.form}
          title="Add Post"
          onSubmit={handleSubmit}
          buttons={
            <Button type="submit" className={styles.btnAddPost}>
              + Add Post
            </Button>
          }
        >
          <Label htmlFor="add-post-title">Title:</Label>
          <Input
            id="add-post-title"
            value={formData.title}
            name="title"
            placeholder="Enter your title"
            required={true}
            onChange={handleInputChange}
          />
          <Label htmlFor="add-post-body">Content:</Label>
          <Textarea
            id="add-post-body"
            name="body"
            placeholder="Enter your post"
            value={formData.body}
            rowSize={3}
            onChange={handleInputChange}
          />
        </Form>
      )}
      {userPosts?.map((post) => (
        <div
          className={`${styles.postSection} ${
            isPostExpanded ? styles["postSection--expanded"] : ""
          }`}
          key={post.id}
        >
          <Post
            {...post}
            isCollapsed={isPostExpanded !== post.id}
            handleToggleCollapse={handleToggleCollapse}
          />
          <Button
            className={styles.btnDelete}
            onClick={() => handleDeletePost(post.id)}
          >
            Delete Post
          </Button>
        </div>
      ))}
    </section>
  );
}

export default PostList;
