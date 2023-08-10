import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const authData = useSelector(state => state.authReducer.authData);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (authData && authData.user._id) {
      fetch(`https://memist.onrender.com/user/${authData.user._id}`)
        .then(response => response.json())
        .then(data => setUserData(data))
        .catch(error => console.log(error));
    }
  }, [authData]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      console.log('Updating user data:', userData);
      const response = await fetch(`https://memist.onrender.com/user/${authData.user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      console.log('Update response:', response);

      if (response.ok) {
        setIsEditing(false);
        // Optionally, you can fetch the updated user data after the update
      } else {
        console.log('Update failed . Response status:', response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" max-w-lg ">
      {userData ? (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
          {isEditing ? (
            <div className='border-4 overflow-auto'>
              <input
                className="input mb-2 border-b"
                type="text"
                value={userData.username}
                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
              />
              <input
                className="input mb-2 border-b"
                type="text"
                value={userData.firstname}
                onChange={(e) => setUserData({ ...userData, firstname: e.target.value })}
              />
              <input
                className="input mb-4 border-b"
                type="text"
                value={userData.lastname}
                onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
              />
              {/* Add input fields for other editable data */}
              <button className="btn btn-primary  bg-orange-400 text-white p-2 border-2 rounded-lg" onClick={handleUpdate}>Save</button>
            </div>
          ) : (
            <div>
              <p className="mb-2">Username: {userData.username}</p>
              <p className="mb-2">First Name: {userData.firstname}</p>
              <p className="mb-2">Last Name: {userData.lastname}</p>
              {/* Display other user data */}
              <button className="btn btn-secondary bg-orange-400 text-white p-2 border-2 rounded-lg" onClick={handleEdit}>Edit</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
