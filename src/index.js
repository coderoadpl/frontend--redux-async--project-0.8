import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import RouterContextProvider from './contexts/RouterContext'
import UserContextProvider from './contexts/UserContext'

import './index.css'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <UserContextProvider>
    <RouterContextProvider>
      <App />
    </RouterContextProvider>
  </UserContextProvider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
