import { TaskModel } from "../../features/user-tasks/tasksSlice";
import Button from "../button/Button";
import styles from "../task-list/TaskList.module.scss";

interface TaskTableModel {
  paginatedTasks: TaskModel[];
  handleStatusChange: (id: number, completed: boolean) => void;
}

function TaskTable(props: TaskTableModel) {
  const { paginatedTasks, handleStatusChange } = props;
  return (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        <tr>
          <th className={styles.userId}>ID</th>
          <th className={styles.title}>Title</th>
          <th className={styles.status}>Status</th>
          <th className={styles.actions}>Actions</th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {paginatedTasks.length ? (
          paginatedTasks.map(({ id, title, completed }: TaskModel) => (
            <tr key={id}>
              <td className={styles.userId}>{id}</td>
              <td className={styles.title}>{title}</td>
              <td className={styles.status}>
                {completed ? "Completed" : "Not Completed"}
              </td>
              <td className={styles.actions}>
                <Button
                  className={styles.btnChangeTaskStatus}
                  onClick={() => handleStatusChange(id, completed)}
                >
                  {completed ? "Mark as Incomplete" : "Mark as Complete"}
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr className={styles.noFilterMatch}>
            <td>
              There is no match for this filter search. Change the filter
              options
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default TaskTable;
