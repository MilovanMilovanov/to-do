import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useApi from "../../hooks/useApi/useApi";
import {
  setTasks,
  TaskModel,
  updateTaskStatus,
} from "../../features/user-tasks/tasksSlice";
import { RootState } from "../../store";

import Button from "../button/Button";
import TaskListTable from "../task-table/TaskTable";
import TaskFilters from "../filter-tasks/TaskFilters";
import styles from "./TaskList.module.scss";

const PAGE_SIZE = 10;

const statusFilterOptions: string[] = ["completed", "uncompleted", "all"];

function TaskList() {
  const { request } = useApi();
  const dispatch = useDispatch();

  const tasks = useSelector((state: RootState) => state.userTasks);
  const usersData = useSelector((state: RootState) => state.userManagement);
  const userIds = usersData.map((user) => String(user.id));

  const [filteredTasks, setFilteredTasks] = useState<TaskModel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    async function fetchTasks() {
      const data = await request({
        endpoint: "todos",
      });
      dispatch(setTasks(data));
      setFilteredTasks(data);
    }
    if (tasks.length === 0) fetchTasks();
    if (tasks.length) setFilteredTasks(tasks);
  }, [request, dispatch, tasks]);

  const handleStatusChange = async (taskId: number, completed: boolean) => {
    request({
      method: "PATCH",
      endpoint: `todos/${taskId}`,
      body: JSON.stringify({ completed: !completed }),
    });

    dispatch(updateTaskStatus({ taskId, status: !completed }));
  };

  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const incrementPage = () => {
    setCurrentPage((prev) =>
      Math.max(
        1,
        Math.min(prev + 1, Math.ceil(filteredTasks.length / PAGE_SIZE))
      )
    );
  };

  const decrementPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <section className={styles.taskList}>
      <TaskFilters
        tasks={tasks}
        userIds={userIds}
        statusFilterOptions={statusFilterOptions}
        setFilteredTasks={setFilteredTasks}
      />
      
      <TaskListTable
        paginatedTasks={paginatedTasks}
        handleStatusChange={handleStatusChange}
      />
      <div className={styles.selectPage}>
        <Button
          className={styles.paginationBtn}
          onClick={decrementPage}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>Page {currentPage}</span>
        <Button
          className={styles.paginationBtn}
          onClick={incrementPage}
          isDisabled={
            currentPage === Math.ceil(filteredTasks.length / PAGE_SIZE)
          }
        >
          Next
        </Button>
      </div>
    </section>
  );
}

export default TaskList;
