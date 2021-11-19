import React from 'react'
import PropTypes from 'prop-types'

import { getUserData as getUserDataAPICall } from '../auth'
import { isAdmin as isAdminAPICall } from '../api/admins'

const errorProviderNotFound = () => {
  console.error('UserContext.Provider not found!')
}

const initialContextState = {
  isUserLoggedIn: false,
  userId: '',
  userDisplayName: '',
  userEmail: '',
  userAvatar: '',
  isAdmin: false,
  clearUser: errorProviderNotFound,
  setUser: errorProviderNotFound,
  getUserData: errorProviderNotFound
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
  const [userId, setUserId] = React.useState(initialContextState.userId)
  const [isAdmin, setIsAdmin] = React.useState(initialContextState.isAdmin)

  const clearUser = React.useCallback(() => {
    setIsUserLoggedIn(() => false)
    setUserDisplayName(() => '')
    setUserEmail(() => '')
    setUserAvatar(() => '')
    setUserId(() => '')
    setIsAdmin(() => false)
  }, [])

  const setUser = React.useCallback((user) => {
    if (user.displayName !== undefined) setUserDisplayName(() => user.displayName)
    if (user.email !== undefined) setUserEmail(() => user.email)
    if (user.avatar !== undefined) setUserAvatar(() => user.avatar)
    if (user.id !== undefined) setUserId(() => user.id)
    if (user.isAdmin !== undefined) setIsAdmin(() => user.isAdmin)
    setIsUserLoggedIn(() => true)
  }, [])

  const getUserData = React.useCallback(async () => {
    const user = await getUserDataAPICall()
    const isAdmin = await isAdminAPICall(user.localId)

    setUser({
      id: user.localId,
      displayName: user.displayName,
      email: user.email,
      avatar: user.photoUrl,
      isAdmin
    })
  }, [setUser])

  return (
    <UserContext.Provider
      value={{
        isUserLoggedIn,
        userId,
        userDisplayName,
        userEmail,
        userAvatar,
        isAdmin,
        clearUser,
        setUser,
        getUserData
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
