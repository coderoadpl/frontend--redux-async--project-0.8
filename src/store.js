import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import loadersReducer from './state/loaders'
import lessonsReducer from './state//lessons'

const rootReducer = combineReducers({
  loaders: loadersReducer,
  lessons: lessonsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)
