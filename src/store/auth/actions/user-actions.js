import * as ACTION_TYPES from "./user-action-types";
import { httpClient } from '../../../utils/constants'

// load User actions
export const loadUserRequest = (data) => {
  return {
    type: ACTION_TYPES.LoadUserRequest
  };
};

export const loadUserSuccess = (data) => {
  return {
    type: ACTION_TYPES.LoadUserSuccess,
    payload: data,

  };
};

export const loadUserFailure = (error) => {
  return {
    type: ACTION_TYPES.LoadUserFailure,
    payload: error,

  };
};
// update User actions
export const updateUserRequest = (data) => {
  return {
    type: ACTION_TYPES.UpdateUserRequest,
    payload: data,
  };
};
export const updateUserSuccess = (result) => {
  return {
    type: ACTION_TYPES.UpdateUserSuccess,
    payload: result,

  };
};
export const updateUserFailure = (error) => {
  return {
    type: ACTION_TYPES.UpdateUserFailure,
    payload: error,

  };
};

// add User actions
export const addUserRequest = (data) => {
  return {
    type: ACTION_TYPES.AddUserRequest,
    payload: data,
  };
};
export const addUserSuccess = (result) => {
  return {
    type: ACTION_TYPES.AddUserSuccess,
    payload: result,

  };
};
export const addUserFailure = (error) => {
  return {
    type: ACTION_TYPES.AddUserFailure,
    payload: error,

  };
};


// delete User actions
export const deleteUserRequest = (data) => {
  return {
    type: ACTION_TYPES.DeleteUserRequest,
    payload: data,
  };
};
export const deleteUserSuccess = (result) => {
  return {
    type: ACTION_TYPES.DeleteUserSuccess,
    payload: result,

  };
};
export const deleteUserFailure = (error) => {
  return {
    type: ACTION_TYPES.DeleteUserFailure,
    payload: error,

  };
};

const urlSurffix = "api/";
//const urlSurffix="pointer/";

// Thunk Action Creator
export const loadUser = () => {
  return (dispatch) => {
    dispatch(updateUserRequest());
    httpClient.get(urlSurffix + 'User')
      .then(response => {
        const data = response.data;

        console.log(data)
        dispatch(loadUserSuccess(data));
      })
      .catch(error => {
        console.log(error.message);
        dispatch(loadUserFailure(error.message

        ));
      });
  };
};

export const updateUser = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch(updateUserRequest());
    httpClient.put(urlSurffix + 'User', data)
      .then(response => {
        const data = response.data;
        console.log(data)
        dispatch(updateUserSuccess(data));
      })
      .catch(error => {
        console.log(error.message);
        dispatch(updateUserFailure(error.message));
      });
  };
};

export const addUser = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch(addUserRequest());
    httpClient.post(urlSurffix + 'User', data)
      .then(response => {
        const data = response.data;
        console.log(data)
        dispatch(addUserSuccess(data));
      })
      .catch(error => {
        console.log(error.message);
        dispatch(addUserFailure(error.message));
      });
  };
};

export const deleteUser = (data) => {
  console.log(data);
  let id=data.id;
  return (dispatch) => {
    dispatch(deleteUserRequest());
    httpClient.delete(urlSurffix + `User/${id}`)
      .then(response => {
        const data = response.data;
        console.log(data)
        dispatch(deleteUserSuccess(id));
      })
      .catch(error => {
        console.log(error.message);
        dispatch(deleteUserFailure(error.message));
      });
  };
};

