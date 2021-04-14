import Link from "next/link";

const User = ({ user }) => {
  return (
    <li key={user._id}>
      <Link href={`/${user.username}`}>{user.username}</Link>
    </li>
  );
};

export default User;
