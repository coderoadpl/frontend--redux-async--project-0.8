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

import { checkIfUserIsLoggedIn, sendPasswordResetEmail } from './auth'

import { createActionSetInfo } from './state/loaders'

import { handleAsyncAction } from './handleAsyncAction'

export const App = () => {
  const dispatch = useDispatch()

  const {
    isUserLoggedIn,
    getUserData
  } = useAuthUser()

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
                element={<PageCourseContent />}
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
              element={<PageLogin />}
            />
            <Route
              path={'/create-account'}
              element={
                <PageCreateAccount />
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
