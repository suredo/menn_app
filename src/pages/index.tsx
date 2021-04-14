import Head from "next/head";
import React, { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import fetch from "node-fetch";
import { server } from "../../config/server";
import AddUserForm from "../components/AddUserForm";
import UserList from "../components/UserList";

interface Data {
  _id: string;
  username: string;
}

const Home: NextPage<{ users: Array<Data> }> = ({ users }) => {
  const [input, setInput] = useState("");
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`${server}/api/adduser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: input }),
    })
      .then((data) => data.json())
      .then((data) => console.log(data));
    router.reload();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>

      <main className={styles.main}>
        <AddUserForm />
        <UserList users={users} />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const result = await fetch(`${server}/api/getusers`).then((response) => {
      return response.json();
    });
    return {
      props: {
        users: result,
      },
    };
  } catch {
    return {
      props: { users: "no user" },
    };
  }
};

export default Home;
