import { combineReducers } from 'redux'

import { createAsyncDuck } from './utils/createAsyncDuck'

import { getAll as getAllLessonsAPICall } from '../api/lessons'

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
  ...loadersCallbacks('Lading all lessons...')
})

export const lessonsReducer = combineReducers({
  getAll: getAllReducer
})

export default lessonsReducer
