import get from 'lodash/get'

export const createAsyncDuck = ({ duckName, selectorPath, asyncFunction, callbackStart, callbackResolved, callbackRejected, callbackFinally }) => {
  const SET = `${duckName}/SET`
  const START = `${duckName}/START`
  const STOP = `${duckName}/STOP`
  const ERROR = `${duckName}/ERROR`

  const createAsyncAction = (...params) => async (dispatch, getState) => {
    dispatch(createActionStart())
    if (callbackStart) callbackStart({ dispatch, getState })
    try {
      const data = await asyncFunction(...params)
      dispatch(createActionSet(data))
      if (callbackResolved) callbackResolved({ data, dispatch, getState })
    } catch (error) {
      dispatch(createActionError(error))
      if (callbackRejected) callbackRejected({ error, dispatch, getState })
    }
    dispatch(createActionStop())
    if (callbackFinally) callbackFinally({ dispatch, getState })
  }

  const createActionSet = (data) => ({
    type: SET,
    payload: { data }
  })
  const createActionStart = () => ({
    type: START
  })
  const createActionStop = () => ({
    type: STOP
  })
  const createActionError = (error) => ({
    type: ERROR,
    payload: { error }
  })

  const selector = (state) => get(state, selectorPath || duckName.replace('/', '.'))

  const initialState = {
    value: undefined,
    error: undefined,
    loading: false
  }

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case SET:
        return {
          ...state,
          value: action.payload.data
        }
      case START:
        return {
          ...state,
          loading: true,
          value: initialState.value,
          error: initialState.error
        }
      case STOP:
        return {
          ...state,
          loading: initialState.loading
        }
      case ERROR:
        return {
          ...state,
          error: action.payload.error
        }
      default:
        return state
    }
  }

  return {
    actionTypes: {
      SET,
      START,
      STOP,
      ERROR
    },
    actionCreators: {
      set: createActionSet,
      start: createActionStart,
      stop: createActionStop,
      error: createActionError,
      async: createAsyncAction,
      [duckName]: createAsyncAction
    },
    selector,
    reducer
  }
}
