import { useRef, useState } from "react";
import styles from "./index.module.css";

interface IProps {
  link: string;
}

const CopyForm = ({ link }: IProps) => {
  const [copied, setCopied] = useState<boolean>(false);
  const copyInput = useRef<HTMLInputElement>();
  const handleCopy = async () => {
    copyInput.current.select();
    const copy = await document.execCommand("copy");
    setCopied(copy);
  };
  return (
    <div className={styles.copy}>
      <input
        value={link}
        readOnly={true}
        className={styles.linkInput}
        ref={copyInput}
      />
      <button className={styles.copyButton} onClick={handleCopy}>
        {copied ? "COPIED" : "COPY"}
      </button>
    </div>
  );
};

export default CopyForm;
