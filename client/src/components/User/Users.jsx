import React, { useEffect, useState } from "react";

const Users = ({ person, onClick }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`process.env.REACT_URL/${person.id}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [person.id]);

  return (
    <div className="User" onClick={onClick}>
      <span className="UserName">{person.name}</span>
 
      <span className="UserEmail">{userData && userData.email}</span>

    </div>
  );
};

export default Users;
