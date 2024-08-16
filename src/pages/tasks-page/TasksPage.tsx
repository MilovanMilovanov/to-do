import { Suspense } from "react";
import Main from "../../components/main/Main";
import TaskList from "../../components/task-list/TaskList";
import PageNav from "../../components/page-nav/PageNav";

function TasksPage() {
  return (
    <Main>
      <PageNav />
      <Suspense fallback="User task list is loading...">
        <TaskList />
      </Suspense>
    </Main>
  );
}

export default TasksPage;
