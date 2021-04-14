import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import styles from "./index.module.css";

interface IProps {
  device: string;
  children: ReactNode;
}

const DownloadButton = ({ device, children }: IProps) => {
  const router = useRouter();
  const handleLink = async (device: string) => {
    const url =
      device === "android"
        ? `https://play.google.com/store/apps/details?id=com.instagram.android`
        : `https://apps.apple.com/us/app/instagram/id389801252`;
    router.push(url);
  };
  return (
    <button className={styles.button} onClick={() => handleLink(device)}>
      {children}
    </button>
  );
};

export default DownloadButton;
