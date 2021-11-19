import { combineReducers } from 'redux'

import { createAsyncDuck } from './utils/createAsyncDuck'

import {
  get as getCoursesAPICall,
  getAll as getAllCoursesAPICall,
  create as createCourseAPICall,
  update as updateCourseAPICall,
  remove as removeCourseAPICall
} from '../api/courses'

import {
  createActionSetLoading,
  createActionSetError,
  createActionRemoveLoading
} from './loaders'

const loadersCallbacks = (message) => ({
  callbackStart: ({ dispatch }) => dispatch(createActionSetLoading(message)),
  callbackRejected: ({ error, dispatch }) => dispatch(createActionSetError(error.message || error.data.error.message)),
  callbackFinally: ({ dispatch }) => dispatch(createActionRemoveLoading(message))
})

export const {
  actionTypes: actionTypesGet,
  actionCreators: { async: actionCreatorGet },
  selector: getSelector,
  reducer: getReducer
} = createAsyncDuck({
  duckName: 'courses/get',
  asyncFunction: getCoursesAPICall,
  ...loadersCallbacks('Loading course...')
})

export const {
  actionTypes: actionTypesGetAll,
  actionCreators: { async: actionCreatorGetAll },
  selector: getAllSelector,
  reducer: getAllReducer
} = createAsyncDuck({
  duckName: 'courses/getAll',
  asyncFunction: getAllCoursesAPICall,
  ...loadersCallbacks('Loading all courses...')
})

export const {
  actionTypes: actionTypesCreate,
  actionCreators: { async: actionCreatorCreate },
  selector: createSelector,
  reducer: createReducer
} = createAsyncDuck({
  duckName: 'courses/create',
  asyncFunction: createCourseAPICall,
  ...loadersCallbacks('Creating course...')
})

export const {
  actionTypes: actionTypesUpdate,
  actionCreators: { async: actionCreatorUpdate },
  selector: updateSelector,
  reducer: updateReducer
} = createAsyncDuck({
  duckName: 'courses/update',
  asyncFunction: updateCourseAPICall,
  ...loadersCallbacks('Updating course...')
})

export const {
  actionTypes: actionTypesRemove,
  actionCreators: { async: actionCreatorRemove },
  selector: removeSelector,
  reducer: removeReducer
} = createAsyncDuck({
  duckName: 'courses/remove',
  asyncFunction: removeCourseAPICall,
  ...loadersCallbacks('Removing course...')
})

export const coursesReducer = combineReducers({
  get: getReducer,
  getAll: getAllReducer,
  create: createReducer,
  update: updateReducer,
  remove: removeReducer
})

export default coursesReducer
