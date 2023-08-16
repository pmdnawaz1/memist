import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import FollowersModal from "../FollowersModal/FollowersModal";
import { getAllUser, } from "../../api/UserRequests";


import Users from "../User/Users";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const FollowersCard = ({ location }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);
  const handleProfileClick = (userId) => {
    console.log(userId,"clicked");
    navigate(`/profile/${userId}`);

  };
  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>

      {persons.map((person, id) => {
        if (person._id !== user._id) {
          return (
            <Users
              person={person}
              key={id}
              onClick={() => handleProfileClick(person._id)}
            />
          );
        }
})}
      {!location ? (
        <span onClick={() => setModalOpened(true)}>Show more</span>
      ) : (
        ""
      )}

      <FollowersModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      />
    </div>
  );
};

export default FollowersCard;
