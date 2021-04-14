import { useRef, useState } from "react";

import CopyForm from "./CopyForm";
import styles from "./index.module.css";
import {
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";

import { FacebookIcon, TelegramIcon, WhatsappIcon } from "react-share";

interface IProps {
  link: string;
}

const ShareMedias = ({ link }: IProps) => {
  return (
    <div>
      <p className={styles.paragraph}>Share this link with your friends</p>
      <CopyForm link={link} />
      <FacebookShareButton
        className={styles.socialButton}
        url={link}
        quote={"Share this link with your friends"}
        hashtag={"#MernApp"}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TelegramShareButton
        className={styles.socialButton}
        url={link}
        title={"Share this link with your friends"}
      >
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      <WhatsappShareButton
        className={styles.socialButton}
        url={link}
        title={"Share this link with your friends"}
        separator=" "
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  );
};

export default ShareMedias;
