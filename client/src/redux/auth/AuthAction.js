import axios from 'axios';
import * as types from './authActionTypes';




 export const AuthReset = () => {
  //  dispatch({
    return { type: types.AUTH_RESET}
   // });
  };

export  const LoginAction = (data) =>async (dispatch,getstate)=>{
    dispatch({
      type: types.AUTH_START
    });
    try {
      const res = await axios.post('/api/auth/login', data);
      localStorage.setItem('mern_admin_dashboard', res.data.access_token);
      dispatch({
        type: types.AUTH_SUCCESS,
        payload: res.data.access_token
      });
      dispatch({type: 'GET_LOGGED_IN_USER',payload:res.data.userdata})
      localStorage.setItem('user',res.data.userdata._id)
    } catch (error) {
      dispatch({
        type: types.AUTH_FAILURE,
        payload: error.response.data.error_msg
      });
    }
  }
