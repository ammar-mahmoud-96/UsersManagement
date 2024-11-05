import React from "react";
import styles from "./userItem.module.css";
import { Link } from "react-router-dom";

export default function UserItemComponent({ user }) {
  return (
    <div className={styles.container}>
      <p>{`${user.first_name} ${user.last_name}`}</p>
      <button>
        <Link className={styles.viewBtn} to={`/userDetails/${user.id}`}>
          view
        </Link>
      </button>
    </div>
  );
}
