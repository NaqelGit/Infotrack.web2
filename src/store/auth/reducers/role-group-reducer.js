import * as ACTION_TYPES from "../actions/role-group-action-types";


export const initialState = {
  data: [],
  isLoading: false,
  error: ''
};

export const RoleGroupReducer = (state = initialState, action) => {
  switch (action.type) {
    //load RoleGroup
    case ACTION_TYPES.LoadRoleGroupRequest:
      console.log('reducer:LoadRoleGroupRequest')
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ACTION_TYPES.LoadRoleGroupSuccess:
      console.log('reducer:LoadRoleGroupSuccess')
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case ACTION_TYPES.LoadRoleGroupFailure:
      console.log('reducer:LoadRoleGroupFailure')
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    //Update RoleGroup  
    case ACTION_TYPES.UpdateRoleGroupRequest:
      console.log('reducer:UpdateRoleGroupRequest')
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case ACTION_TYPES.UpdateRoleGroupSuccess:
      console.log('reducer:UpdateRoleGroupSuccess')
      let updatedList = state.data.map((item) => {
        if (action.payload.id == item.id) {
          // return { ...item, ...action.payload }
          return action.payload
        }
        return item;
      })
      console.log(updatedList)
      return {
        ...state,
        isLoading: false,
        data: updatedList
      };
    case ACTION_TYPES.UpdateRoleGroupFailure:
      console.log('reducer:UpdateRoleGroupFailure')
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    //Add RoleGroup  
    case ACTION_TYPES.AddRoleGroupRequest:
      console.log('reducer:AddRoleGroupRequest')
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case ACTION_TYPES.AddRoleGroupSuccess:
      console.log('reducer:AddRoleGroupSuccess')
      return {
        ...state,
        isLoading: false,
        data: [...state.data, ...action.payload]
      };
    case ACTION_TYPES.AddRoleGroupFailure:
      console.log('reducer:AddRoleGroupFailure')
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    //delete RoleGroup  
    case ACTION_TYPES.DeleteRoleGroupRequest:
      console.log('reducer:DeleteRoleGroupRequest')
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ACTION_TYPES.DeleteRoleGroupSuccess:
      console.log('reducer:DeleteRoleGroupSuccess')
      let deletedList = state.data.filter((item) => {
        if (action.payload !== item.id) {
          return item;
        }

      })
      return {
        ...state,
        isLoading: false,
        data: deletedList
      };
    case ACTION_TYPES.DeleteRoleGroupFailure:
      console.log('reducer:DeleteRoleGroupFailure')
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
};



