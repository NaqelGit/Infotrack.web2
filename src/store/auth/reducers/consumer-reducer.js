import * as ACTION_TYPES from "../actions/consumer-action-types";


export const initialState = {
    applicationTypes: [],
    isLoadingApplicationType: false,
    errorApplicationType: '',
    countries: [],
    isLoadingCountry: false,
    errorCountry: ''
};

export const ConsumerReducer = (state = initialState, action) => {
    switch (action.type) {

        //load application type
        case ACTION_TYPES.LoadApplicationTypeRequest:
            console.log('reducer:LoadApplicationTypeRequest')
            return {
                ...state,
                isLoadingApplicationTypeding: true,
                errorApplicationTypeor: '',
            };
        case ACTION_TYPES.LoadApplicationTypeSuccess:
            console.log('reducer:LoadApplicationTypeSuccess')
            return {
                ...state,
                isLoadingApplicationType: false,
                applicationTypes: action.payload
            };
        case ACTION_TYPES.LoadApplicationTypeFailure:
            console.log('reducer:LoadApplicationType')
            return {
                ...state,
                isLoadingApplicationType: false,
                errorApplicationType: action.payload
            };
        //load country
        case ACTION_TYPES.LoadCountryRequest:
            console.log('reducer:LoadCountryRequest')
            return {
                ...state,
                isLoadingCountry: true,
                errorCountry: '',
            };
        case ACTION_TYPES.LoadCountrySuccess:
            console.log('reducer:LoadApplicationTypeSuccess')
            return {
                ...state,
                isLoadingCountry: false,
                countries: action.payload
            };
        case ACTION_TYPES.LoadApplicationTypeFailure:
            console.log('reducer:LoadApplicationType')
            return {
                ...state,
                isLoadingCountry: false,
                errorCountry: action.payload
            };
        default:
            return state;
    }
};



