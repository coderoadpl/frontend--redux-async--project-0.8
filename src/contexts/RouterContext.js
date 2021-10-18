import React from 'react'

export const RouterContext = React.createContext({
  // 'CREATE-ACCOUNT' or 'RECOVER-PASSWORD'
  route: 'LOGIN',
  setRoute: () => {
    console.error('RouterContext.Provider not found!')
  }
})
