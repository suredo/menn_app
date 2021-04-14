import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../../../../styles/Home.module.css";
import fetch from "node-fetch";
import { server } from "../../../../config/server";
import DownloadButton from "../../../components/DownloadButton";
import Header from "../../../components/Header";

interface Data {
  _id: string;
  username: string;
}

const download: NextPage<{ user: Data | null }> = ({ user }) => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Header username={user?.username} />
        {user ? (
          <DownloadButton device={"android"}>ANDROID APP</DownloadButton>
        ) : null}
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

export default download;
