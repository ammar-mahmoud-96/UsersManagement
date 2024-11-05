import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import UserItemComponent from "../../components/userItemComponent";

export default function Home() {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((response) => response.json())
      .then((res) => {
        setUsersList(res.data);
        // console.log("dddd", res.data);
      });
  }, []);

  console.log("in hbome", usersList);
  return (
    <div className={styles.container}>
      {usersList.map((user) => {
        return (
          <UserItemComponent key={user.id} user={user} />
          // <div>
          //   <p>{`${user.first_name} ${user.last_name}`}</p>
          //   <button>edit</button>
          // </div>
        );
      })}
    </div>
  );
}
