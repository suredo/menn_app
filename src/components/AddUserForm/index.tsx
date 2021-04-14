import { useRouter } from "next/router";
import { useState } from "react";
import { server } from "../../../config/server";
import styles from "./index.module.css";
import UserInput from "./UserInput";
import CreateButton from "./CreateButton";

const AddUserForm = () => {
  const [input, setInput] = useState<string>("");
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
    <form className={styles.form} onSubmit={handleSubmit}>
      <UserInput input={input} setInput={setInput} />
      <br />
      <CreateButton />
    </form>
  );
};

export default AddUserForm;
