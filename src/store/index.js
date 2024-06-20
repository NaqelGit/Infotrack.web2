import { combineReducers } from 'redux'

import { AuthReducer } from './auth/index'

const rootReducer=  {...AuthReducer};

export default combineReducers(rootReducer);