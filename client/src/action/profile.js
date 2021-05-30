import axios from 'axios';
import { setAlert } from './alert';
import {
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	CLEAR_PROFILE,
	ACCOUNT_DELETED,
	GET_REPOS,
} from './types';

// get current user

export const getCurrentUser = () => async (dispatch) => {
	try {
		const res = await axios.get('https://git.heroku.com/devconnector-niishaaaant.git/api/profile/me');
		console.log(res.data);
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//get all users
export const getProfiles = () => async (dispatch) => {
	dispatch({ type: CLEAR_PROFILE });
	try {
		const res = await axios.get('https://git.heroku.com/devconnector-niishaaaant.git/api/profile');
		console.log(res.data);
		dispatch({
			type: GET_PROFILES,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//get user by id
export const getProfileById = (userId) => async (dispatch) => {
	try {
		const res = await axios.get(
			`https://git.heroku.com/devconnector-niishaaaant.git/api/profile/user/${userId}`
		);
		console.log(res.data);
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//get github repos
export const getGithubRepos = (username) => async (dispatch) => {
	try {
		const res = await axios.get(
			`https://git.heroku.com/devconnector-niishaaaant.git/api/profile/github/${username}`
		);
		console.log(res.data);
		dispatch({
			type: GET_REPOS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// create or edit a profile
export const createProfile = (formData, history, edit = false) => async (
	dispatch
) => {
	try {
		const res = await axios({
			method: 'post',
			url: 'https://git.heroku.com/devconnector-niishaaaant.git/api/profile',
			data: formData,
			headers: { 'Content-Type': 'application/json' },
		});

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});

		if (edit === false) {
			dispatch(setAlert('Profile Created', 'success'));
		} else {
			dispatch(setAlert('Profile Updated', 'success'));
		}

		if (!edit) {
			history.push('/dashboard');
		}
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// add experience
export const addExperience = (formData, history) => async (dispatch) => {
	try {
		const res = await axios({
			method: 'put',
			url: 'https://git.heroku.com/devconnector-niishaaaant.git/api/profile/experience',
			data: formData,
			headers: { 'Content-Type': 'application/json' },
		});

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('Experience Added', 'success'));

		history.push('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// add education
export const addEducation = (formData, history) => async (dispatch) => {
	try {
		const res = await axios({
			method: 'put',
			url: 'https://git.heroku.com/devconnector-niishaaaant.git/api/profile/education',
			data: formData,
			headers: { 'Content-Type': 'application/json' },
		});

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('Education Added', 'success'));

		history.push('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// delete experience
export const deleteExperience = (id) => async (dispatch) => {
	try {
		const res = await axios({
			method: 'delete',
			url: `https://git.heroku.com/devconnector-niishaaaant.git/api/profile/experience/${id}`,
		});
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert('Experience Removed', 'success'));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// delete education
export const deleteEducation = (id) => async (dispatch) => {
	try {
		const res = await axios({
			method: 'delete',
			url: `https://git.heroku.com/devconnector-niishaaaant.git/api/profile/education/${id}`,
		});
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert('Education Removed', 'success'));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// delete account
export const deleteAccount = () => async (dispatch) => {
	if (window.confirm('Are you sure?')) {
		try {
			await axios({
				method: 'delete',
				url: `https://git.heroku.com/devconnector-niishaaaant.git/api/profile`,
			});
			dispatch({
				type: CLEAR_PROFILE,
			});
			dispatch({ type: ACCOUNT_DELETED });
			dispatch(setAlert('Your Account Has Been Deleted'));
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status },
			});
		}
	}
};
