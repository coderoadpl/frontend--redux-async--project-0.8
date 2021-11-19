import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import loadersReducer from './state/loaders'
import lessonsReducer from './state/lessons'
import coursesReducer from './state/courses'

const rootReducer = combineReducers({
  loaders: loadersReducer,
  lessons: lessonsReducer,
  courses: coursesReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)
