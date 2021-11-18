import React from 'react'

const initialContextState = {
  lessons: null
}

export const LessonsContext = React.createContext(initialContextState)

export const useLessons = () => {
  const lessonsContextValue = React.useContext(LessonsContext)
  return lessonsContextValue
}

export const LessonsContextProvider = LessonsContext.Provider

export default LessonsContextProvider
