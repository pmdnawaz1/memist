import axios from 'axios';

const API = axios.create({ baseURL: 'https://memist.onrender.com' });

API.interceptors.request.use((req) => {
	if (localStorage.getItem('profile')) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem('profile')).token
		}`;
	}

	return req;
});

export const getTimelinePosts = (id) => API.get(`/posts/${id}/timeline`);
export const likePost = (id, userId) =>
	API.put(`posts/${id}/like`, { userId: userId });

export const addCommentToPost = async (postId, userId, commentText) => {
	try {
		const response = await API.post(`/posts/comment`, {
			postId,
			userId,
			commentText,
		});

		return response.data; // Return the response data, not the entire response
	} catch (error) {
		console.error('Error adding comment:', error);
		throw error; // Re-throw the error for handling at the caller level
	}
};
