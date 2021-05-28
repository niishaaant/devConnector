import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from './types';

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
