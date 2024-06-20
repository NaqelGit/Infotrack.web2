import * as ACTION_TYPES from "./consumer-action-types";
import { httpClient } from '../../../utils/constants'

// load coutry actions
export const loadCountryRequest = (data) => {
  return {
    type: ACTION_TYPES.LoadCountryRequest
  };
};

export const loadCountrySuccess = (data) => {
    return {
      type: ACTION_TYPES.LoadCountrySuccess,
      payload: data,
  
    };
  };
  
  export const loadCountryFailure = (error) => {
    return {
      type: ACTION_TYPES.LoadCountryFailure,
      payload: error,
  
    };
  };


  //load applicatoin types
export const loadApplicationTypeRequest = (data) => {
    return {
      type: ACTION_TYPES.LoadApplicationTypeRequest
    };
  };
  
  export const loadApplicationTypeSuccess = (data) => {
    return {
      type: ACTION_TYPES.LoadApplicationTypeSuccess,
      payload: data,
  
    };
  };
  export const loadApplicationTypeFailure = (error) => {
    return {
      type: ACTION_TYPES.LoadApplicationTypeFailure,
      payload: error,
  
    };
  };


  const urlSurffix = "api/";
//const urlSurffix="pointer/";

// Thunk Action Creator
  export const loadApplicationType = () => {
    return (dispatch) => {
      dispatch(loadApplicationTypeRequest());
      httpClient.get(urlSurffix + 'consumer/application-type-get')
        .then(response => {
          const data = response.data;
  
          console.log(data)
          dispatch(loadApplicationTypeSuccess(data));
        })
        .catch(error => {
          console.log(error.message);
          dispatch(loadApplicationTypeFailure(error.message
  
          ));
        });
    };
  };
  
  export const loadCountry = () => {
    return (dispatch) => {
      dispatch(loadCountryRequest());
      httpClient.get(urlSurffix + 'consumer/country-get')
        .then(response => {
          const data = response.data;
          console.log(data)
          dispatch(loadCountrySuccess(data));
        })
        .catch(error => {
          console.log(error.message);
          dispatch(loadCountryFailure(error.message
  
          ));
        });
    };
  };