import axios from 'axios';

const API = axios.create({ baseURL: 'http://memist.onrender.com' });

export const logIn = (formData) => API.post('/auth/login', formData);

export const signUp = (formData) => API.post('/auth/register', formData);

export const changePassword = (payload) =>
	API.post('/auth/reset-password', payload);

export const forgotPassword = (payload) =>
	API.post('/auth/forgot-password', payload);

export const resetPasswordFromEmail = (payload) =>
	API.post('/auth/reset-pass-from-email', payload);
