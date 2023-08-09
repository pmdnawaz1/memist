import React, { useState } from 'react';
import { changePassword } from '../../api/AuthRequests';
import { useNavigate } from 'react-router-dom';
// import Dialog from '../Dialog/Dialog';

const PasswordandSecurity = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = JSON.parse(localStorage.getItem('profile'))?.token;
    try {
      const response = await changePassword({
        currentPassword,
        newPassword,
        token
      });
      console.log(response);
      navigate('/');
      // setShowDialog(true);
    } catch (error) {
      console.error(error); 
    }
  };

  return (
    <div>
  <h1 className='font-bold text-2xl'>Change Password:</h1>
  Your password must be at least 6 digits and for more security use (@#!) symbols
  <div>
    <form className='m-' onSubmit={handleSubmit}>
      <div>
        <input
          type='password'
          placeholder='Current password'
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          className='rounded-md py-2 px-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500'
        />
      </div>
      <div>
        <input
          type='password'
          placeholder='New Password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className='rounded-md py-2 px-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500'
        />
      </div>
      <div>
        <input
          type='password'
          placeholder='Confirm password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className='rounded-md py-2 px-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500'
        />
      </div>
      <button
        type='submit'
        className='rounded-md bg-blue-500 text-white py-2 px-4 mt-3 hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
      >
        Change
      </button>
    </form>
  </div>
</div>
  );
};

export default PasswordandSecurity;
