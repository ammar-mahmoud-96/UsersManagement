import React from "react";
import styles from "./home.module.css";
import UserItemComponent from "../../components/userItemComponent";
import useGetUsersList from "../../hooks/useGetUsersList";

export default function Home() {
  const [usersList, isLoading] = useGetUsersList({});
  return isLoading ? (
    <div> loading ...</div>
  ) : (
    <div className={styles.container}>
      {usersList?.map((user) => {
        return <UserItemComponent key={user.id} user={user} />;
      })}
    </div>
  );
}
