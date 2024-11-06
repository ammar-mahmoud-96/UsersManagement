import React, { useState } from "react";
import styles from "./home.module.css";
import UserItemComponent from "../../components/userItemComponent";
import useGetUsersList from "../../hooks/useGetUsersList";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [filteredList, setFilteredList] = useState();

  const [usersList, isLoading] = useGetUsersList({
    onSuccess: (data) => {
      setFilteredList(data);
    },
  });

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchValue(search);
    const _filterdList = usersList.filter((item) => {
      return (
        item.first_name.toLowerCase().includes(search.toLowerCase()) ||
        item.last_name.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredList(_filterdList);
  };
  return isLoading ? (
    <div> loading ...</div>
  ) : (
    <div className={styles.container}>
      <input placeholder="search" value={searchValue} onChange={handleSearch} />
      {filteredList?.map((user) => {
        return <UserItemComponent key={user.id} user={user} />;
      })}
    </div>
  );
}
