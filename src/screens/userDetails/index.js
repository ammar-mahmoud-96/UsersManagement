import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./userDetails.module.css";
import useGetUsersList from "../../hooks/useGetUsersList";

export default function UserDetails() {
  const { userID } = useParams();
  const [selecteditem, setSelecteditem] = useState();

  const { isLoading } = useGetUsersList({
    onSuccess: (data) => {
      const filteredItem = data?.filter(
        (item) => item.id.toString() === userID
      );
      setSelecteditem(filteredItem[0]);
    },
  });
  console.log("dddd", isLoading);
  return isLoading ? (
    <div>loading ...</div>
  ) : (
    selecteditem && (
      <div>
        <img src={selecteditem.avatar} />
        <p>
          name: {selecteditem.first_name} {selecteditem.last_name}
        </p>
        <p> email: {selecteditem?.email}</p>
        <button>
          <Link
            className={styles.editeButton}
            to={`/editUser/${selecteditem.id}`}
          >
            Edit
          </Link>
        </button>
      </div>
    )
  );
}
