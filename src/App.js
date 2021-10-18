import React from 'react'

import FullPageLayout from './components/FullPageLayout'
import FullPageMessage from './components/FullPageMessage'
import FullPageLoader from './components/FullPageLoader'
import Message from './components/Message'

import PageCoursesList from './pages/PageCoursesList/PageCoursesList'
import PageLogin from './pages/PageLogin/PageLogin'
import PageCreateAccount from './pages/PageCreateAccount'
import PageRecoverPassword from './pages/PageRecoverPassword'

import { useRoute } from './contexts/RouterContext'
import { useAuthUser } from './contexts/UserContext'

import { signIn, signUp, getIdToken, decodeToken, checkIfUserIsLoggedIn, sendPasswordResetEmail, logOut } from './auth'

import { getAll as getAllCourses } from './api/courses'

export const App = () => {
  // global state
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [isInfoDisplayed, setIsInfoDisplayed] = React.useState(false)
  const [infoMessage, setInfoMessage] = React.useState('')

  // router state
  const notLoginUserRoute = useRoute()

  // courses
  const [courses, setCourses] = React.useState(null)

  const {
    isUserLoggedIn,
    setUser,
    clearUser
  } = useAuthUser()

  const handleAsyncAction = React.useCallback(async (asyncAction) => {
    setIsLoading(() => true)
    try {
      await asyncAction()
    } catch (error) {
      setHasError(() => true)
      setErrorMessage(() => error.data.error.message)
    } finally {
      setIsLoading(() => false)
    }
  }, [])

  const fetchCourses = React.useCallback(async () => {
    handleAsyncAction(async () => {
      const courses = await getAllCourses()
      setCourses(() => courses)
    })
  }, [handleAsyncAction])

  const onUserLogin = React.useCallback(() => {
    const token = getIdToken()
    if (!token) return
    const user = decodeToken(token)

    // @TODO replace this token decoding with request for user dat
    setUser({
      displayName: '',
      email: user.email,
      avatar: ''
    })

    fetchCourses()
  }, [fetchCourses, setUser])

  const onClickLogin = React.useCallback(async (email, password) => {
    handleAsyncAction(async () => {
      await signIn(email, password)
      onUserLogin()
    })
  }, [handleAsyncAction, onUserLogin])

  const onClickCreateAccount = React.useCallback(async (email, password) => {
    handleAsyncAction(async () => {
      await signUp(email, password)
      setIsInfoDisplayed(() => true)
      setInfoMessage(() => 'User account created. User is logged in!')
      onUserLogin()
    })
  }, [handleAsyncAction, onUserLogin])

  const onClickRecover = React.useCallback(async (email) => {
    handleAsyncAction(async () => {
      await sendPasswordResetEmail(email)
      setIsInfoDisplayed(() => true)
      setInfoMessage(() => 'Check your inbox!')
      onUserLogin()
    })
  }, [handleAsyncAction, onUserLogin])

  const onClickLogOut = React.useCallback(async () => {
    await logOut()
    clearUser()
  }, [clearUser])

  const dismissError = React.useCallback(() => {
    setHasError(() => false)
    setErrorMessage(() => '')
  }, [])

  const dismissMessage = React.useCallback(() => {
    setIsInfoDisplayed(() => false)
    setInfoMessage(() => '')
  }, [])

  React.useEffect(() => {
    (async () => {
      setIsLoading(() => true)
      const userIsLoggedIn = await checkIfUserIsLoggedIn()
      setIsLoading(() => false)
      if (userIsLoggedIn) onUserLogin()
    })()
    // mount only
  }, [onUserLogin])

  return (
    <div>

      {
        isUserLoggedIn ?
          <PageCoursesList
            courses={courses}
            onClickLogOut={onClickLogOut}
          />
          :
          notLoginUserRoute === 'LOGIN' ?
            <PageLogin
              onClickLogin={onClickLogin}
            />
            :
            notLoginUserRoute === 'CREATE-ACCOUNT' ?
              <PageCreateAccount
                onClickCreateAccount={onClickCreateAccount}
              />
              :
              notLoginUserRoute === 'RECOVER-PASSWORD' ?
                <PageRecoverPassword
                  onClickRecover={onClickRecover}
                />
                :
                null
      }

      {
        isLoading ?
          <FullPageLoader />
          :
          null
      }

      {
        isInfoDisplayed ?
          <FullPageMessage
            message={infoMessage}
            iconVariant={'info'}
            buttonLabel={'OK'}
            onButtonClick={dismissMessage}
          />
          :
          null
      }

      {
        hasError ?
          <FullPageLayout
            className={'wrapper-class'}
          >
            <Message
              className={'regular-class'}
              message={errorMessage}
              iconVariant={'error'}
              onButtonClick={dismissError}
            />
          </FullPageLayout>
          :
          null
      }

    </div>
  )
}

export default App
