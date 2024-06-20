import * as ACTION_TYPES from "./role-action-types";
import { httpClient } from '../../../utils/constants'

// load role actions
export const loadRoleRequest = (data) => {
  return {
    type: ACTION_TYPES.LoadRoleRequest
  };
};

export const loadRoleSuccess = (data) => {
  return {
    type: ACTION_TYPES.LoadRoleSuccess,
    payload: data,

  };
};

export const loadRoleFailure = (error) => {
  return {
    type: ACTION_TYPES.LoadRoleFailure,
    payload: error,

  };
};
// update role actions
export const updateRoleRequest = (data) => {
  return {
    type: ACTION_TYPES.UpdateRoleRequest,
    payload: data,
  };
};
export const updateRoleSuccess = (result) => {
  return {
    type: ACTION_TYPES.UpdateRoleSuccess,
    payload: result,

  };
};
export const updateRoleFailure = (error) => {
  return {
    type: ACTION_TYPES.UpdateRoleFailure,
    payload: error,

  };
};

// add role actions
export const addRoleRequest = (data) => {
  return {
    type: ACTION_TYPES.AddRoleRequest,
    payload: data,
  };
};
export const addRoleSuccess = (result) => {
  return {
    type: ACTION_TYPES.AddRoleSuccess,
    payload: result,

  };
};
export const addRoleFailure = (error) => {
  return {
    type: ACTION_TYPES.AddRoleFailure,
    payload: error,

  };
};


// delete role actions
export const deleteRoleRequest = (data) => {
  return {
    type: ACTION_TYPES.DeleteRoleRequest,
    payload: data,
  };
};
export const deleteRoleSuccess = (result) => {
  return {
    type: ACTION_TYPES.DeleteRoleSuccess,
    payload: result,

  };
};
export const deleteRoleFailure = (error) => {
  return {
    type: ACTION_TYPES.DeleteRoleFailure,
    payload: error,

  };
};


const urlSurffix = "api/";
//const urlSurffix="pointer/";

// Thunk Action Creator
export const loadRole = () => {
  return (dispatch) => {
    dispatch(updateRoleRequest());
    httpClient.get(urlSurffix + 'role')
      .then(response => {
        const data = response.data;

        console.log(data)
        dispatch(loadRoleSuccess(data));
      })
      .catch(error => {
        console.log(error.message);
        dispatch(loadRoleFailure(error.message

        ));
      });
  };
};

export const updateRole = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch(updateRoleRequest());
    httpClient.put(urlSurffix + 'role', data)
      .then(response => {
        const data = response.data;
        console.log(data)
        dispatch(updateRoleSuccess(data));
      })
      .catch(error => {
        console.log(error.message);
        dispatch(updateRoleFailure(error.message));
      });
  };
};

export const addRole = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch(addRoleRequest());
    httpClient.post(urlSurffix + 'role', data)
      .then(response => {
        const data = response.data;
        console.log(data)
        dispatch(addRoleSuccess(data));
      })
      .catch(error => {
        console.log(error.message);
        dispatch(addRoleFailure(error.message));
      });
  };
};

export const deleteRole = (data) => {
  console.log(data);
  let id=data.id;
  return (dispatch) => {
    dispatch(deleteRoleRequest());
    httpClient.delete(urlSurffix + `role/${id}`)
      .then(response => {
        const data = response.data;
        console.log(data)
        dispatch(deleteRoleSuccess(id));
      })
      .catch(error => {
        console.log(error.message);
        dispatch(deleteRoleFailure(error.message));
      });
  };
};


