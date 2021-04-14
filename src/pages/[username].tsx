import { GetServerSideProps, NextPage } from "next";
import styles from "../../styles/Home.module.css";
import fetch from "node-fetch";
import { server } from "../../config/server";
import { useRef, useState } from "react";

import Header from "../components/Header";
import ShareButton from "../components/ShareButton";
import ShareMedias from "../components/ShareMedias";

interface Data {
  _id: string;
  username: string;
}

const user: NextPage<{ user: Data }> = ({ user }) => {
  const [link, setLink] = useState<string>();

  const handleDeepLink = async () => {
    fetch(`${server}/api/deeplink/${user.username}`)
      .then((data) => data.json())
      .then((data) => {
        if (navigator.share) {
          window.navigator
            .share({
              title: user.username,
              url: data.link,
              text: "Share this link with your friends!!",
            })
            .then(() => console.log("Successful share"))
            .catch((error) => console.log("Error sharing", error));
        } else {
          setLink(data.link);
        }
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Header username={user?.username} />

        {user ? (
          <ShareButton link={link} handleDeepLink={handleDeepLink} />
        ) : null}
        {link ? <ShareMedias link={link} /> : null}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const result = await fetch(`${server}/api/getuser/${params.username}`).then(
      (response) => {
        return response.json();
      }
    );
    return {
      props: {
        user: result,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: { user: "" },
    };
  }
};

export default user;
