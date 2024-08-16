import { useSelector } from "react-redux";
import { useCallback, useState } from "react";
import User from "../user/User";
import styles from "./UsersList.module.scss";
import { RootState } from "../../store";

function UsersList() {
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null);
  const usersData = useSelector((state: RootState) => state.userManagement);
  const handleToggleCollapse = useCallback((id: number) => {
    setExpandedUserId((prevId) => (prevId === id ? null : id));
  }, []);

  return (
    <ul className={styles.userList}>
      {usersData.map((userData) => (
        <User
          key={userData.id}
          {...userData}
          isCollapsable={true}
          isCollapsed={expandedUserId !== userData.id}
          handleToggleCollapse={handleToggleCollapse}
        />
      ))}
    </ul>
  );
}

export default UsersList;
