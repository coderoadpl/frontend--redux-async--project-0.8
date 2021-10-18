import React from 'react'
import PropTypes from 'prop-types'

const initialContextState = {
  // 'CREATE-ACCOUNT' or 'RECOVER-PASSWORD'
  route: 'LOGIN',
  setRoute: () => {
    console.error('RouterContext.Provider not found!')
  }
}

export const RouterContext = React.createContext(initialContextState)

export const useRouteTo = () => {
  const { setRoute } = React.useContext(RouterContext)
  return setRoute
}

export const useRoute = () => {
  const { route } = React.useContext(RouterContext)
  return route
}

export const RouterContextProvider = (props) => {
  const { children } = props

  const [route, setRoute] = React.useState(initialContextState.route)

  return (
    <RouterContext.Provider
      value={{
        route,
        setRoute
      }}
    >
      {children}
    </RouterContext.Provider>
  )
}

RouterContextProvider.propTypes = {
  children: PropTypes.node
}

export default RouterContextProvider
