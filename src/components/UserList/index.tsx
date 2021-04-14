import styles from "./UserList.module.css";
import User from "./User";

const UserList = ({ users }) => {
  return (
    <ul className={styles.list}>
      {users ? (
        users.map((user) => <User key={user._id} user={user} />)
      ) : (
        <p>No user added yet</p>
      )}
    </ul>
  );
};

export default UserList;
