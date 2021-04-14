import styles from "./index.module.css";

interface IProps {
  username: string;
}
const Header = ({ username }: IProps) =>
  username ? (
    <p className={styles.paragraph}>
      This page is for <br />
      <span className={styles.title}>{username}</span>
    </p>
  ) : (
    <h3 className={styles.title}>This user doesn't exist!</h3>
  );

export default Header;
