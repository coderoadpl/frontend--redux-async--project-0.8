import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import { BrowserRouter as Router } from 'react-router-dom'

import { ThemeProvider } from '@mui/material'

import App from './App'

import './firebaseConfig'

import UserContextProvider from './contexts/UserContext'

import './index.css'
import reportWebVitals from './reportWebVitals'

import { store } from './store'
import { theme } from './theme'

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
