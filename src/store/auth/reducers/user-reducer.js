import * as ACTION_TYPES from "../actions/user-action-types";


export const initialState = {
  data: [],
  isLoading: false,
  error: ''
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    //load User
    case ACTION_TYPES.LoadUserRequest:
      console.log('reducer:LoadUserRequest')
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ACTION_TYPES.LoadUserSuccess:
      console.log('reducer:LoadUserSuccess')
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case ACTION_TYPES.LoadUserFailure:
      console.log('reducer:LoadUserFailure')
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    //Update User  
    case ACTION_TYPES.UpdateUserRequest:
      console.log('reducer:UpdateUserRequest')
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case ACTION_TYPES.UpdateUserSuccess:
      console.log('reducer:UpdateUserSuccess')
      let updatedList = state.data.map((item) => {
        if (action.payload.id == item.id) {
          // return { ...item, ...action.payload,  }
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
    case ACTION_TYPES.UpdateUserFailure:
      console.log('reducer:UpdateUserFailure')
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    //Add User  
    case ACTION_TYPES.AddUserRequest:
      console.log('reducer:AddUserRequest')
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case ACTION_TYPES.AddUserSuccess:
      console.log('reducer:AddUserSuccess')
      return {
        ...state,
        isLoading: false,
        data: [...state.data, ...action.payload]
      };
    case ACTION_TYPES.AddUserFailure:
      console.log('reducer:AddUserFailure')
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    //delete User  
    case ACTION_TYPES.DeleteUserRequest:
      console.log('reducer:DeleteUserRequest')
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ACTION_TYPES.DeleteUserSuccess:
      console.log('reducer:DeleteUserSuccess')
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
    case ACTION_TYPES.DeleteUserFailure:
      console.log('reducer:DeleteUserFailure')
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
};



