import React, { useEffect, useState } from "react";

export default function useGetUsersList({ onSuccess }) {
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch("https://reqres.in/api/users")
      .then((response) => response.json())
      .then((res) => {
        setUsersList(res.data);
        onSuccess?.(res.data);
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { usersList, isLoading };
}
