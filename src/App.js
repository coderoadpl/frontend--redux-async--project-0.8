import React from 'react'

import { useDispatch } from 'react-redux'

import { Routes, Route } from 'react-router-dom'

import ViewLoadersOverlay from './views/ViewLoadersOverlay'

import PageCoursesList from './pages/PageCoursesList/PageCoursesList'
import PageLogin from './pages/PageLogin/PageLogin'
import PageCreateAccount from './pages/PageCreateAccount'
import PageRecoverPassword from './pages/PageRecoverPassword'
import PageProfile from './pages/PageProfile'
import PageCourse from './pages/PageCourse'
import PageCourseContentEmpty from './pages/PageCourseContentEmpty'
import PageCourseContent from './pages/PageCourseContent'

import { useAuthUser } from './contexts/UserContext'

import { signIn, signUp, checkIfUserIsLoggedIn, sendPasswordResetEmail } from './auth'

import { signInWithFirebaseSDK } from './firebaseConfig'

import { createActionSetInfo } from './state/loaders'

import { handleAsyncAction } from './handleAsyncAction'

export const App = () => {
  const dispatch = useDispatch()

  const {
    isUserLoggedIn,
    getUserData
  } = useAuthUser()

  const onClickLogin = React.useCallback(async (email, password) => {
    handleAsyncAction(async () => {
      await signIn(email, password)
      await Promise.all([
        signInWithFirebaseSDK(email, password),
        getUserData()
      ])
    }, 'Loging in...')
  }, [getUserData])

  const onClickCreateAccount = React.useCallback(async (email, password) => {
    handleAsyncAction(async () => {
      await signUp(email, password)
      dispatch(createActionSetInfo('User account created. User is logged in!'))
      await getUserData()
    }, 'Creating account...')
  }, [dispatch, getUserData])

  const onClickRecover = React.useCallback(async (email) => {
    handleAsyncAction(async () => {
      await sendPasswordResetEmail(email)
      dispatch(createActionSetInfo('Check your inbox!'))
    }, 'Recovering password...')
  }, [dispatch])

  React.useEffect(() => {
    handleAsyncAction(async () => {
      const userIsLoggedIn = await checkIfUserIsLoggedIn()
      if (userIsLoggedIn) {
        await getUserData()
      }
    }, 'Loading app...')
    // mount only
  }, [getUserData])

  return (
    <div>

      {
        isUserLoggedIn ?
          <Routes>
            <Route
              path={'/profile'}
              element={<PageProfile />}
            />
            <Route
              path={'courses/:courseId'}
              element={
                <PageCourse />
              }
            >
              <Route
                index={true}
                element={<PageCourseContentEmpty />}
              />
              <Route
                path={':lessonId'}
                element={
                  <PageCourseContent
                    lessons={[]}
                  />
              }
              />
            </Route>
            <Route
              path={'*'}
              element={
                <PageCoursesList />
              }
            />
          </Routes>
          :
          null
      }

      {
        !isUserLoggedIn ?
          <Routes>
            <Route
              path={'*'}
              element={
                <PageLogin
                  onClickLogin={onClickLogin}
                />
              }
            />
            <Route
              path={'/create-account'}
              element={
                <PageCreateAccount
                  onClickCreateAccount={onClickCreateAccount}
                />
              }
            />
            <Route
              path={'/recover-password'}
              element={
                <PageRecoverPassword
                  onClickRecover={onClickRecover}
                />
              }
            />
          </Routes>
          :
          null
      }

      <ViewLoadersOverlay />

    </div >
  )
}

export default App
