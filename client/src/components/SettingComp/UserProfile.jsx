import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  // const { user } = useSelector((state) => state.authReducer.authData);
  // const id = user.id;
  const id = "64d2ab1f8314e91269dcfea9"; 

  useEffect(() => {
    fetch(`http://localhost:5000/user/${id}`)
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.log(error));
  }, [id]);

  return (
    <div>
      {userData ? (
        <div>
          <h2>User Profile</h2>
          <p>Username: {userData.username}</p>
          <p>First Name: {userData.firstname}</p>
          <p>Last Name: {userData.lastname}</p>
          <p>Email: {userData.email}</p>
          <p>Is Admin: {userData.isAdmin ? 'Yes' : 'No'}</p>
          {/* <p>Followers: {userData.followers.length}</p>
          <p>Following: {userData.following.length}</p> */}
          {/* <p>Created At: {new Date(userData.createdAt.$date.$numberLong)}</p>
          <p>Updated At: {new Date(userData.updatedAt.$date.$numberLong)}</p> */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
