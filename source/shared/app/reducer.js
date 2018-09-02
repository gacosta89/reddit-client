import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import reddit from 'shared/reddit/reducer'

export default combineReducers({
    routing: routerReducer,
    reddit,
})
