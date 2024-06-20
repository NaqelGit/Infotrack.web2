import * as ACTION_TYPES from "./role-group-action-types";
import { httpClient } from '../../../utils/constants'

// load RoleGroup actions
export const loadRoleGroupRequest = (data) => {
  return {
    type: ACTION_TYPES.LoadRoleGroupRequest
  };
};

export const loadRoleGroupSuccess = (data) => {
  return {
    type: ACTION_TYPES.LoadRoleGroupSuccess,
    payload: data,

  };
};

export const loadRoleGroupFailure = (error) => {
  return {
    type: ACTION_TYPES.LoadRoleGroupFailure,
    payload: error,

  };
};
// update RoleGroup actions
export const updateRoleGroupRequest = (data) => {
  return {
    type: ACTION_TYPES.UpdateRoleGroupRequest,
    payload: data,
  };
};
export const updateRoleGroupSuccess = (result) => {
  return {
    type: ACTION_TYPES.UpdateRoleGroupSuccess,
    payload: result,

  };
};
export const updateRoleGroupFailure = (error) => {
  return {
    type: ACTION_TYPES.UpdateRoleGroupFailure,
    payload: error,

  };
};

// add RoleGroup actions
export const addRoleGroupRequest = (data) => {
  return {
    type: ACTION_TYPES.AddRoleGroupRequest,
    payload: data,
  };
};
export const addRoleGroupSuccess = (result) => {
  return {
    type: ACTION_TYPES.AddRoleGroupSuccess,
    payload: result,

  };
};
export const addRoleGroupFailure = (error) => {
  return {
    type: ACTION_TYPES.AddRoleGroupFailure,
    payload: error,

  };
};


// delete RoleGroup actions
export const deleteRoleGroupRequest = (data) => {
  return {
    type: ACTION_TYPES.DeleteRoleGroupRequest,
    payload: data,
  };
};
export const deleteRoleGroupSuccess = (result) => {
  return {
    type: ACTION_TYPES.DeleteRoleGroupSuccess,
    payload: result,

  };
};
export const deleteRoleGroupFailure = (error) => {
  return {
    type: ACTION_TYPES.DeleteRoleGroupFailure,
    payload: error,

  };
};

const urlSurffix = "api/";
//const urlSurffix="pointer/";

// Thunk Action Creator
export const loadRoleGroup = () => {
  return (dispatch) => {
    dispatch(updateRoleGroupRequest());
    httpClient.get(urlSurffix + 'RoleGroup')
      .then(response => {
        const data = response.data;

        console.log(data)
        dispatch(loadRoleGroupSuccess(data));
      })
      .catch(error => {
        console.log(error.message);
        dispatch(loadRoleGroupFailure(error.message

        ));
      });
  };
};

export const updateRoleGroup = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch(updateRoleGroupRequest());
    httpClient.put(urlSurffix + 'RoleGroup', data)
      .then(response => {
        const data = response.data;
        console.log(data)
        dispatch(updateRoleGroupSuccess(data));
      })
      .catch(error => {
        console.log(error.message);
        dispatch(updateRoleGroupFailure(error.message));
      });
  };
};

export const addRoleGroup = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch(addRoleGroupRequest());
    httpClient.post(urlSurffix + 'RoleGroup', data)
      .then(response => {
        const data = response.data;
        console.log(data)
        dispatch(addRoleGroupSuccess(data));
      })
      .catch(error => {
        console.log(error.message);
        dispatch(addRoleGroupFailure(error.message));
      });
  };
};

export const deleteRoleGroup = (data) => {
  console.log(data);
  let id=data.id;
  return (dispatch) => {
    dispatch(deleteRoleGroupRequest());
    httpClient.delete(urlSurffix + `RoleGroup/${id}`)
      .then(response => {
        const data = response.data;
        console.log(data)
        dispatch(deleteRoleGroupSuccess(id));
      })
      .catch(error => {
        console.log(error.message);
        dispatch(deleteRoleGroupFailure(error.message));
      });
  };
};
// export const loadApplicationType = () => {
//   return (dispatch) => {
//     dispatch(loadApplicationTypeRequest());
//     httpClient.get(urlSurffix + 'RoleGroup/application-type-get')
//       .then(response => {
//         const data = response.data;

//         console.log(data)
//         dispatch(loadApplicationTypeSuccess(data));
//       })
//       .catch(error => {
//         console.log(error.message);
//         dispatch(loadApplicationTypeFailure(error.message

//         ));
//       });
//   };
// };

