import { combineReducers } from 'redux'

import { createAsyncDuck } from './utils/createAsyncDuck'

import {
  getAll as getAllLessonsAPICall,
  create as createLessonAPICall
} from '../api/lessons'

import {
  createActionSetLoading,
  createActionSetError,
  createActionRemoveLoading
} from './loaders'

const loadersCallbacks = (message) => ({
  callbackStart: ({ dispatch }) => dispatch(createActionSetLoading(message)),
  callbackRejected: ({ error, dispatch }) => dispatch(createActionSetError(error.message || error.data.error.message)),
  callbackFinally: ({ dispatch }) => dispatch(createActionRemoveLoading())
})

export const {
  actionTypes: actionTypesGetAll,
  actionCreators: { async: actionCreatorGetAll },
  selector: getAllSelector,
  reducer: getAllReducer
} = createAsyncDuck({
  duckName: 'lessons/getAll',
  asyncFunction: getAllLessonsAPICall,
  ...loadersCallbacks('Loading all lessons...')
})

export const {
  actionTypes: actionTypesCreate,
  actionCreators: { async: actionCreatorCreate },
  selector: createSelector,
  reducer: createReducer
} = createAsyncDuck({
  duckName: 'lessons/create',
  asyncFunction: createLessonAPICall,
  ...loadersCallbacks('Creating lesson...')
})

export const lessonsReducer = combineReducers({
  getAll: getAllReducer,
  create: createReducer
})

export default lessonsReducer
