import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import listings from 'shared/listings/reducer'
import auth from 'shared/auth/reducer'
import config from './config'

export default combineReducers({
    routing: routerReducer,
    listings,
    config,
    auth,
})
