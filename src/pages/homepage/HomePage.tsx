import Main from "../../components/main/Main";
import PageNav from "../../components/page-nav/PageNav";
import UsersList from "../../components/users-list/UserList";

function Homepage() {
  return (
    <Main>
      <PageNav />
      <UsersList />
    </Main>
  );
}

export default Homepage;
