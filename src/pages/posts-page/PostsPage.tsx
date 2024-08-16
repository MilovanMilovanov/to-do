import { lazy, Suspense } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { UserModel } from "../../features/user-management/userSlice";
import Main from "../../components/main/Main";
import User from "../../components/user/User";
import PageNav from "../../components/page-nav/PageNav";
import styles from "./PostsPage.module.scss";
import userStyles from "../../components/user/User.module.scss";
import { RootState } from "../../store";

const PostList = lazy(() => import("../../components/post-list/PostList"));

function PostsPage() {
  const { id } = useParams();

  const user = useSelector((state: RootState) =>
    state.userManagement.find((user) => user.id === Number(id))
  ) as UserModel;

  return (
    <Main>
      <PageNav />
      <section className={styles.pageLayout}>
        <User
          key={id}
          {...user}
          isCollapsable={false}
          className={userStyles.verticalScrollBar}
        />
        <Suspense fallback={<span>Loading posts...</span>}>
          <PostList />
        </Suspense>
      </section>
    </Main>
  );
}

export default PostsPage;
