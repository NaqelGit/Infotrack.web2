import * as ACTION_TYPES from "../actions/role-action-types";


export const initialState = {
  data: [],
  isLoading: false,
  error: '',
  applicationTypes: [],
  isLoadingApplicationType: false,
  errorApplicationType: ''
  //roles: []
};

export const RoleReducer = (state = initialState, action) => {
  switch (action.type) {
    //load role
    case ACTION_TYPES.LoadRoleRequest:
      console.log('reducer:LoadRoleRequest')
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ACTION_TYPES.LoadRoleSuccess:
      console.log('reducer:LoadRoleSuccess')
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case ACTION_TYPES.LoadRoleFailure:
      console.log('reducer:LoadRoleFailure')
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    //Update role  
    case ACTION_TYPES.UpdateRoleRequest:
      console.log('reducer:UpdateRoleRequest')
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case ACTION_TYPES.UpdateRoleSuccess:
      console.log('reducer:UpdateRoleSuccess')
      let updatedList = state.data.filter((item) => {
        if (action.payload.id == item.id) {
          return { ...item, ...action.payload }
        }
        return item;
      })
      console.log(updatedList)
      return {
        ...state,
        isLoading: false,
        data: updatedList
      };
    case ACTION_TYPES.UpdateRoleFailure:
      console.log('reducer:UpdateRoleFailure')
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    //Add role  
    case ACTION_TYPES.AddRoleRequest:
      console.log('reducer:AddRoleRequest')
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case ACTION_TYPES.AddRoleSuccess:
      console.log('reducer:AddRoleSuccess')
      return {
        ...state,
        isLoading: false,
        data: [...state.data, ...action.payload]
      };
    case ACTION_TYPES.AddRoleFailure:
      console.log('reducer:AddRoleFailure')
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    //delete role  
    case ACTION_TYPES.DeleteRoleRequest:
      console.log('reducer:DeleteRoleRequest')
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ACTION_TYPES.DeleteRoleSuccess:
      console.log('reducer:DeleteRoleSuccess')
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
    case ACTION_TYPES.DeleteRoleFailure:
      console.log('reducer:DeleteRoleFailure')
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    
    default:
      return state;
  }
};



