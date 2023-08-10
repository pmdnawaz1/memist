import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const PersonalDetails = () => {
  const authData = useSelector(state => state.authReducer.authData);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (authData && authData.user._id) {
      fetch(`https://memist.onrender.com/user/${authData.user._id}`)
        .then(response => response.json())
        .then(data => setUserData(data))
        .catch(error => console.log(error));
    }
  }, [authData]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-semibold mb-3">Personal Details</h1>
      <p className="text-gray-600 mb-4">
        Memist uses this information to verify your identity.
      </p>
      <div className="border-t border-gray-300 pt-4">
        {userData ? (
          <>
            <div className="mb-4">
              <h2 className="text-lg font-medium mb-2">Name:</h2>
              <p className="text-gray-800">{userData.firstname} {userData.lastname}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-medium mb-2">Username:</h2>
              <p className="text-gray-800">{userData.username}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-medium mb-2">Email:</h2>
              <p className="text-gray-800">{userData.email}</p>
            </div>
            {/* Add more personal information fields here */}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default PersonalDetails;
