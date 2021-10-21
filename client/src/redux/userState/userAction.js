import React from 'react';
import mernDashApi from '../../helpers/apiUtils';
import * as types from './userActionTypes'



export  const UserReset = () =>async(dispatch,getstate)=> {
    dispatch({
      type: types.USER_RESET
    });
  };

export  const fetchUsers = () =>async(dispatch,getstate)=> {
    dispatch({
      type: types.USER_START
    });
    try {
      const res = await mernDashApi.get('/api/user/');
      dispatch({
        type: types.USER_SUCCESS,
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload: error.response.data.error_msg
      });
    }
  } 

export  const fetchLoggedInUser = () =>async(dispatch,getstate)=> {
    dispatch({
      type: types.USER_START
    });
    try {
      const res = await mernDashApi.get('/api/user/me');
      dispatch({
        type: types.GET_LOGGED_IN_USER,
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload: error.response.data.error_msg
      });
    }
  }

export  const addUser = (data)=>async(dispatch,getstate)=> {
    dispatch({
      type: types.USER_START
    });
    try {
      const res = await mernDashApi.post('/api/auth/register', data);
      dispatch({
        type: types.USER_ADD,
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload: error.response.data.error_msg
      });
    }
  }

export  const fetchUsersByMonth = () =>async(dispatch,getstate)=> {
    dispatch({
      type: types.USER_START
    });
    try {
      const res = await mernDashApi.get('/api/user/group/group-by-month');
      dispatch({
        type: types.GET_USERS_BY_MONTH,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload: error.response.data.error_msg
      });
    }
  }

export  const fetchSingleUser = (id) =>async(dispatch,getstate)=> {
    dispatch({
      type: types.USER_START
    });
    const tempState = getstate().user;
    console.log(tempState)
   // if (!tempState.users) {
      try {
        const res = await mernDashApi.get(`/api/user/single/${id}`);
        dispatch({
          type: types.GET_USER,
          payload: res.data.data
        });
      } catch (error) {
        dispatch({
          type: types.USER_FAILURE,
          payload: error.response.data.error_msg
        });
      }
    // } else {
    //   const user = tempState.users.fliter((user) => user._id == id);
    //   dispatch({
    //     type: types.GET_USER,
    //     payload: user
    //   });
    // }
  }

export  const editUserAction = (data) =>async(dispatch,getstate)=> {
    dispatch({
      type: types.USER_START
    });
    try {
      const res = await mernDashApi.patch('/api/user/edit-user', data);
      dispatch({
        type: types.USER_EDIT,
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload: error.response.data.error_msg
      });
    }
  }

export  const deleteUserAction = (id) =>async(dispatch,getstate)=> {
    dispatch({
      type: types.USER_START
    });
    try {
       await mernDashApi.delete(`/api/user/delete/${id}`);
      console.log(id);
      dispatch({
        type: types.USER_DELETE,
        payload: id
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload: error.response.data.error_msg
      });
    }
  }

export  const changeUserPasswordAction = (data) =>async(dispatch,getstate)=> {
    dispatch({
      type: types.USER_START
    });
    try {
      await mernDashApi.post('/api/auth/change-password', data);
      dispatch({
        type: types.USER_PASSWORD_CHANGE
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload: error.response.data.error_msg
      });
    }
    fetchSingleUser(data._id);
  }


