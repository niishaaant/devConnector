import axios from 'axios';
import { setAlert } from './alert';
import {
	DELETE_POST,
	GET_POSTS,
	GET_POST,
	POST_ERROR,
	UPDATE_LIKES,
	ADD_POST,
	ADD_COMMENT,
	REMOVE_COMMENT,
} from './types';

export const getPosts = () => async (dispatch) => {
	try {
		const res = await axios.get('http://127.0.0.1:5000/api/post');

		dispatch({
			type: GET_POSTS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//get single post
export const getPost = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`http://127.0.0.1:5000/api/post/${id}`);

		dispatch({
			type: GET_POST,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//add like
export const addLike = (id) => async (dispatch) => {
	try {
		const res = await axios.put(`http://127.0.0.1:5000/api/post/like/${id}`);

		dispatch({
			type: UPDATE_LIKES,
			payload: { id, likes: res.data },
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//remove like
export const removeLike = (id) => async (dispatch) => {
	try {
		const res = await axios.put(`http://127.0.0.1:5000/api/post/unlike/${id}`);

		dispatch({
			type: UPDATE_LIKES,
			payload: { id, likes: res.data },
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//delete post
export const deletePost = (id) => async (dispatch) => {
	try {
		await axios.delete(`http://127.0.0.1:5000/api/post/${id}`);

		dispatch({
			type: DELETE_POST,
			payload: id,
		});

		dispatch(setAlert('Post Removed', 'success'));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//add post
export const addPost = (formData) => async (dispatch) => {
	try {
		const res = await axios.post(`http://127.0.0.1:5000/api/post`, formData);

		dispatch({
			type: ADD_POST,
			payload: res.data,
		});

		dispatch(setAlert('Post Cerated', 'success'));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//add comment
export const addComment = (postId, formData) => async (dispatch) => {
	try {
		const res = await axios.post(
			`http://127.0.0.1:5000/api/post/comment/${postId}`,
			formData
		);

		dispatch({
			type: ADD_COMMENT,
			payload: res.data,
		});

		dispatch(setAlert('Comment Added', 'success'));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
	try {
		await axios.delete(
			`http://127.0.0.1:5000/api/post/comment/${postId}/${commentId}`
		);

		dispatch({
			type: REMOVE_COMMENT,
			payload: commentId,
		});

		dispatch(setAlert('Comment Removed', 'success'));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
