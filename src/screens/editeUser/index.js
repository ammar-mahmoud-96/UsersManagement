import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Editeuser() {
  const { userID } = useParams();
  const [selecteditem, setSelecteditem] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [firstNameInput, setFirstNameInput] = useState();
  const [lastNameInput, setlastNameInput] = useState();
  const [email, setEmail] = useState();

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
        setFirstNameInput(filteredItem[0].first_name);
        setlastNameInput(filteredItem[0].last_name);
        setEmail(filteredItem[0].email);
      })
      .catch((e) => {
        // error handling
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
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
