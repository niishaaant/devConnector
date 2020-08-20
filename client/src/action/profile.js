import axios from 'axios';
// import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './types';

// get current user

export const getCurrentUser = () => async (dispatch) => {
  try {
    const res = await axios.get('http://127.0.0.1:5000/api/profile/me');
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
