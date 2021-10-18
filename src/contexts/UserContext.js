import React from 'react'
import PropTypes from 'prop-types'

const errorProviderNotFound = () => {
  console.error('UserContext.Provider not found!')
}

const initialContextState = {
  isUserLoggedIn: false,
  userDisplayName: '',
  userEmail: '',
  userAvatar: '',
  setIsUserLoggedIn: errorProviderNotFound,
  setUserDisplayName: errorProviderNotFound,
  setUserEmail: errorProviderNotFound,
  setUserAvatar: errorProviderNotFound,
  clearUser: errorProviderNotFound
}

export const UserContext = React.createContext(initialContextState)

export const useAuthUser = () => {
  const authUserContextValue = React.useContext(UserContext)
  return authUserContextValue
}

export const UserContextProvider = (props) => {
  const { children } = props

  // user/auth state
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(initialContextState.isUserLoggedIn)
  const [userDisplayName, setUserDisplayName] = React.useState(initialContextState.userDisplayName)
  const [userEmail, setUserEmail] = React.useState(initialContextState.userEmail)
  const [userAvatar, setUserAvatar] = React.useState(initialContextState.userAvatar)

  const clearUser = React.useCallback(() => {
    setIsUserLoggedIn(() => false)
    setUserDisplayName(() => '')
    setUserEmail(() => '')
    setUserAvatar(() => '')
  }, [])

  const setUser = React.useCallback((user) => {
    setIsUserLoggedIn(() => true)
    if (user.displayName !== undefined) setUserDisplayName(() => user.displayName)
    if (user.email !== undefined) setUserEmail(() => user.email)
    if (user.avatar !== undefined) setUserAvatar(() => user.avatar)
  }, [])

  return (
    <UserContext.Provider
      value={{
        isUserLoggedIn,
        userDisplayName,
        userEmail,
        userAvatar,
        clearUser,
        setUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.node
}

export default UserContextProvider
