import styles from "./index.module.css";

interface IProps {
  link: string;
  handleDeepLink: () => Promise<void>;
}

const ShareButton = ({ link, handleDeepLink }: IProps) =>
  !link ? (
    <button className={styles.button} onClick={() => handleDeepLink()}>
      SHARE
    </button>
  ) : null;

export default ShareButton;
