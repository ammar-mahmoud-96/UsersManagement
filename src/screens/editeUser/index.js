import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useGetUsersList from "../../hooks/useGetUsersList";

export default function Editeuser() {
  const { userID } = useParams();
  const [selecteditem, setSelecteditem] = useState();

  const [firstNameInput, setFirstNameInput] = useState();
  const [lastNameInput, setlastNameInput] = useState();
  const [email, setEmail] = useState();

  const [isLoading] = useGetUsersList({
    onSuccess: (data) => {
      const filteredItem = data?.filter(
        (item) => item.id.toString() === userID
      );
      setSelecteditem(filteredItem[0]);
      setFirstNameInput(filteredItem[0].first_name);
      setlastNameInput(filteredItem[0].last_name);
      setEmail(filteredItem[0].email);
    },
  });

  console.log("firstNameInput", firstNameInput);
  const onClickSubmit = () => {
    const requestOptions = {
      method: "PATCH",
      body: JSON.stringify({
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: email,
      }),
    };
    fetch(`https://reqres.in/api/users/${selecteditem.id}`, requestOptions);
  };
  return isLoading ? (
    <div>loading ...</div>
  ) : (
    selecteditem && (
      <div>
        <img src={selecteditem.avatar} />
        <p>first name:</p>
        <input
          type="text"
          value={firstNameInput}
          onChange={(e) => setFirstNameInput(e.target.value)}
        />
        <p>last name:</p>

        <input
          type="text"
          value={lastNameInput}
          onChange={(e) => setlastNameInput(e.target.value)}
        />
        <p> mail:</p>

        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={onClickSubmit}>submit</button>
      </div>
    )
  );
}
