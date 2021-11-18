import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { Routes, Route } from 'react-router-dom'

import FullPageLayout from './components/FullPageLayout'
import FullPageMessage from './components/FullPageMessage'
import FullPageLoader from './components/FullPageLoader'
import Message from './components/Message'

import PageCoursesList from './pages/PageCoursesList/PageCoursesList'
import PageLogin from './pages/PageLogin/PageLogin'
import PageCreateAccount from './pages/PageCreateAccount'
import PageRecoverPassword from './pages/PageRecoverPassword'
import PageProfile from './pages/PageProfile'
import PageCourse from './pages/PageCourse'
import PageCourseContentEmpty from './pages/PageCourseContentEmpty'
import PageCourseContent from './pages/PageCourseContent'

import { useAuthUser } from './contexts/UserContext'

import { signIn, signUp, checkIfUserIsLoggedIn, sendPasswordResetEmail, logOut, updateUser, getUserData as getUserDataAPICall } from './auth'

import { getMultiple as getMultipleLessons } from './api/lessons'
import { getAll as getAllCourses } from './api/courses'
import { upload as uploadAvatar } from './api/avatar'

import { signInWithFirebaseSDK, signOutWithFirebaseSDK } from './firebaseConfig'

import {
  createActionSetLoading,
  createActionSetError,
  createActionSetInfo,
  createActionRemoveLoading,
  createActionRemoveError,
  createActionRemoveInfo
} from './state/loaders'

export const App = () => {
  const {
    isLoading,
    // loadingMessage,
    hasError,
    errorMessage,
    isInfoDisplayed,
    infoMessage
  } = useSelector((state) => state.loaders)
  const dispatch = useDispatch()

  // courses
  const [courses, setCourses] = React.useState(null)

  // lessons
  const [lessons, setLessons] = React.useState(null)

  const {
    isUserLoggedIn,
    userId,
    setUser,
    clearUser
  } = useAuthUser()

  const handleAsyncAction = React.useCallback(async (asyncAction, message) => {
    dispatch(createActionSetLoading(message))
    try {
      await asyncAction()
    } catch (error) {
      dispatch(createActionSetError(error.message || error.data.error.message))
    } finally {
      dispatch(createActionRemoveLoading())
    }
  }, [dispatch])

  const fetchCourses = React.useCallback(async () => {
    const courses = await getAllCourses()
    setCourses(() => courses)
  }, [])

  const fetchLessonsByIds = React.useCallback(async (lessonsIds) => {
    const lessons = await getMultipleLessons(lessonsIds)
    setLessons(() => lessons)
  }, [])

  const fetchLessonsByIdsWithLoaders = React.useCallback((lessonsIds) => {
    handleAsyncAction(async () => {
      await fetchLessonsByIds(lessonsIds)
    })
  }, [fetchLessonsByIds, handleAsyncAction])

  const getUserData = React.useCallback(async () => {
    const user = await getUserDataAPICall()

    setUser({
      id: user.localId,
      displayName: user.displayName,
      email: user.email,
      avatar: user.photoUrl
    })
  }, [setUser])

  const onClickLogin = React.useCallback(async (email, password) => {
    handleAsyncAction(async () => {
      await signIn(email, password)
      await Promise.all([
        signInWithFirebaseSDK(email, password),
        getUserData(),
        fetchCourses()
      ])
    })
  }, [fetchCourses, getUserData, handleAsyncAction])

  const onClickCreateAccount = React.useCallback(async (email, password) => {
    handleAsyncAction(async () => {
      await signUp(email, password)
      dispatch(createActionSetInfo('User account created. User is logged in!'))
      await Promise.all([
        getUserData(),
        fetchCourses()
      ])
    })
  }, [dispatch, fetchCourses, getUserData, handleAsyncAction])

  const onClickRecover = React.useCallback(async (email) => {
    handleAsyncAction(async () => {
      await sendPasswordResetEmail(email)
      dispatch(createActionSetInfo('Check your inbox!'))
      await Promise.all([
        getUserData(),
        fetchCourses()
      ])
    })
  }, [dispatch, fetchCourses, getUserData, handleAsyncAction])

  const onClickSaveChangesProfile = React.useCallback(async (displayName, photoUrl) => {
    handleAsyncAction(async () => {
      await updateUser(displayName, photoUrl)
      await getUserData()
    })
  }, [getUserData, handleAsyncAction])

  const onAvatarChangeProfile = React.useCallback(async (file) => {
    handleAsyncAction(async () => {
      const downloadURL = await uploadAvatar(userId, file, (progressPercent) => console.log(`Upload progress is ${progressPercent}%`))
      await updateUser(undefined, downloadURL)
      await getUserData()
    })
  }, [getUserData, handleAsyncAction, userId])

  const onClickLogOut = React.useCallback(async () => {
    await Promise.all([
      logOut(),
      signOutWithFirebaseSDK()
    ])
    clearUser()
  }, [clearUser])

  const dismissError = React.useCallback(() => {
    dispatch(createActionRemoveError())
  }, [dispatch])

  const dismissMessage = React.useCallback(() => {
    dispatch(createActionRemoveInfo())
  }, [dispatch])

  React.useEffect(() => {
    handleAsyncAction(async () => {
      const userIsLoggedIn = await checkIfUserIsLoggedIn()
      if (userIsLoggedIn) {
        await Promise.all([
          getUserData(),
          fetchCourses()
        ])
      }
    })
    // mount only
  }, [fetchCourses, getUserData, handleAsyncAction])

  return (
    <div>

      {
        isUserLoggedIn ?
          <Routes>
            <Route
              path={'/profile'}
              element={
                <PageProfile
                  onAvatarChange={onAvatarChangeProfile}
                  onSaveChanges={onClickSaveChangesProfile}
                />
              }
            />
            <Route
              path={'courses/:courseId'}
              element={
                <PageCourse
                  lessons={lessons}
                  courses={courses}
                  fetchLessonsByIds={fetchLessonsByIdsWithLoaders}
                />
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
                    lessons={lessons}
                  />
              }
              />
            </Route>
            <Route
              path={'*'}
              element={
                <PageCoursesList
                  courses={courses}
                  onClickLogOut={onClickLogOut}
                />
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

    </div >
  )
}

export default App
