import { combineReducers } from 'redux'

import { createAsyncDuck } from './utils/createAsyncDuck'

import {
  get as getLessonsAPICall,
  getAll as getAllLessonsAPICall,
  create as createLessonAPICall,
  update as updateLessonAPICall,
  remove as removeLessonAPICall
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
  actionTypes: actionTypesGet,
  actionCreators: { async: actionCreatorGet },
  selector: getSelector,
  reducer: getReducer
} = createAsyncDuck({
  duckName: 'lessons/get',
  asyncFunction: getLessonsAPICall,
  ...loadersCallbacks('Loading lesson...')
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

export const {
  actionTypes: actionTypesUpdate,
  actionCreators: { async: actionCreatorUpdate },
  selector: updateSelector,
  reducer: updateReducer
} = createAsyncDuck({
  duckName: 'lessons/update',
  asyncFunction: updateLessonAPICall,
  ...loadersCallbacks('Updating lesson...')
})

export const {
  actionTypes: actionTypesRemove,
  actionCreators: { async: actionCreatorRemove },
  selector: removeSelector,
  reducer: removeReducer
} = createAsyncDuck({
  duckName: 'lessons/remove',
  asyncFunction: removeLessonAPICall,
  ...loadersCallbacks('Removing lesson...')
})

export const lessonsReducer = combineReducers({
  get: getReducer,
  getAll: getAllReducer,
  create: createReducer,
  update: updateReducer,
  remove: removeReducer
})

export default lessonsReducer
