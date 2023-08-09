import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './resetPass.css';

const ResetPassword = () => {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenValue = searchParams.get('token');
    setToken(tokenValue);
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Send the reset password request to the backend
    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, password, confirmPassword })
      });

      if (!response.ok) {
        throw new Error('Reset password request failed');
      }

      // Password reset successful
      alert('Password reset successful');
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('An error occurred while resetting the password');
    }
  };

  return (
    <div className="yellow_bg flex flex-col items-center justify-center min-h-screen">
      <div className="form max-w-md w-full p-6 bg-white-100 rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Reset Password</h2>
        <form className="reset-password-form" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-1 font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:border-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
