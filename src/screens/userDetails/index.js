import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./userDetails.module.css";

export default function UserDetails() {
  const { userID } = useParams();
  const [selecteditem, setSelecteditem] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        const filteredItem = res?.data?.filter(
          (item) => item.id.toString() === userID
        );
        console.log("filteredItem", filteredItem);
        setSelecteditem(filteredItem[0]);
      })
      .catch((e) => {
        // error handling
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  console.log("userID", userID, selecteditem);
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
