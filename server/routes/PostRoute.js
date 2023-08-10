import express from 'express';
import {
	createPost,
	deletePost,
	getPost,
	getTimelinePosts,
	likePost,
	updatePost,
	addCommentToPost, // Import the new controller function
} from '../controllers/PostController.js';
import authMiddleWare from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/', createPost);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.put('/:id/like', likePost);
router.post('/comment', addCommentToPost);
router.get('/:id/timeline', getTimelinePosts);

export default router;
