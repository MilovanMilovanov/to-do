import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import Form from "../form/Form";
import Input from "../input/Input";
import Select from "../select/Select";
import styles from "./TaskFilters.module.scss";
import { TaskModel } from "../../features/user-tasks/tasksSlice";

interface FiltersModel {
  userIds: string[];
  statusFilterOptions: string[];
  tasks: TaskModel[];
  setFilteredTasks: React.Dispatch<SetStateAction<TaskModel[]>>;
}

const intialFormData = {
  title: "",
  status: "",
  userId: 0,
};

function TaskFilters(props: FiltersModel) {
  const [formData, setFormData] = useState(intialFormData);

  const { tasks, userIds, statusFilterOptions, setFilteredTasks } = props;

  useEffect(() => {
    const { status, title, userId } = formData;
    const filteredData = tasks.filter((task: TaskModel) => {
      const statusMatches =
        !status ||
        status === "all" ||
        (status === "completed" && task.completed) ||
        (status === "uncompleted" && !task.completed);

      const titleMatches =
        !title || task.title.toLowerCase().includes(title.toLowerCase());

      const userIdMatches = !userId || task.userId === Number(userId);

      return statusMatches && titleMatches && userIdMatches;
    });

    setFilteredTasks(filteredData);
  }, [formData, tasks, setFilteredTasks]);

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className={styles.filters}>
      <Form className={styles.form} title="Task Filter">
        <Input
          className={styles.filterInput}
          name="title"
          type="text"
          placeholder="Filter by title"
          value={formData.title}
          onChange={handleFilterChange}
        />
        <Select
          className={styles.filterInput}
          name="userId"
          value={formData.status}
          options={userIds}
          filterDefaultText="Filter By Id"
          onChange={handleFilterChange}
        />
        <Select
          name="status"
          value={formData.status}
          className={styles.filterInput}
          options={statusFilterOptions}
          filterDefaultText="Filter By Status"
          onChange={handleFilterChange}
        />
      </Form>
    </section>
  );
}

export default TaskFilters;
