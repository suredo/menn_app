import styles from "./index.module.css";

const UserInput = ({ input, setInput }) => {
  return (
    <input
      type="text"
      className={styles.input}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Type a username"
      required
    />
  );
};

export default UserInput;
